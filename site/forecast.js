(function () {
  var SARASOTA = { lat: 27.3364, lon: -82.5307 };
  var MARINE_PT = { lat: 27.32, lon: -82.52 };

  function weatherLabel(code) {
    var c = code | 0;
    if (c === 0) return "Clear";
    if (c <= 3) return "Mainly clear / cloudy";
    if (c <= 48) return "Fog / depositing rime fog";
    if (c <= 57) return "Drizzle";
    if (c <= 67) return "Rain";
    if (c <= 77) return "Snow / ice grains";
    if (c <= 82) return "Rain showers";
    if (c <= 86) return "Snow showers";
    if (c <= 99) return "Thunderstorm / hail";
    return "—";
  }

  function cardinal(deg) {
    var dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    var d = ((deg % 360) + 360) % 360;
    var i = Math.round(d / 22.5) % 16;
    return dirs[i];
  }

  function marineIndexForTime(marineTimes, targetIso) {
    if (!marineTimes || !marineTimes.length) return -1;
    for (var i = 0; i < marineTimes.length; i++) {
      if (marineTimes[i] === targetIso) return i;
    }
    var t0 = new Date(targetIso).getTime();
    var best = -1;
    var bestDiff = Infinity;
    for (var j = 0; j < marineTimes.length; j++) {
      var diff = Math.abs(new Date(marineTimes[j]).getTime() - t0);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = j;
      }
    }
    return bestDiff < 45 * 60 * 1000 ? best : -1;
  }

  function fmtTime(iso, tz) {
    var d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  }

  function fmtDay(iso, tz) {
    var d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(d);
  }

  function buildForecastUrl() {
    var u = new URL("https://api.open-meteo.com/v1/forecast");
    u.searchParams.set("latitude", String(SARASOTA.lat));
    u.searchParams.set("longitude", String(SARASOTA.lon));
    u.searchParams.set(
      "current",
      "temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
    );
    u.searchParams.set(
      "hourly",
      "temperature_2m,precipitation_probability,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m"
    );
    u.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,windgusts_10m_max"
    );
    u.searchParams.set("wind_speed_unit", "mph");
    u.searchParams.set("precipitation_unit", "inch");
    u.searchParams.set("timezone", "America/New_York");
    u.searchParams.set("forecast_days", "7");
    return u;
  }

  function buildMarineUrl() {
    var u = new URL("https://marine-api.open-meteo.com/v1/marine");
    u.searchParams.set("latitude", String(MARINE_PT.lat));
    u.searchParams.set("longitude", String(MARINE_PT.lon));
    u.searchParams.set("hourly", "wave_height,wave_direction,wave_period");
    u.searchParams.set("length_unit", "imperial");
    u.searchParams.set("timezone", "America/New_York");
    u.searchParams.set("forecast_days", "3");
    return u;
  }

  function renderCurrent(root, data, tz) {
    var cur = data.current;
    var grid = document.createElement("div");
    grid.className = "forecast-grid forecast-grid--current";
    grid.setAttribute("role", "group");
    grid.setAttribute("aria-label", "Current conditions");

    function card(title, valueHtml, sub) {
      var el = document.createElement("div");
      el.className = "forecast-card";
      el.innerHTML =
        "<h3>" +
        title +
        '</h3><p class="value">' +
        valueHtml +
        "</p>" +
        (sub ? '<p class="sub">' + sub + "</p>" : "");
      return el;
    }

    grid.appendChild(
      card(
        "Air temperature",
        Math.round(cur.temperature_2m) + "°F",
        "Feels like " + Math.round(cur.apparent_temperature) + "°F"
      )
    );
    grid.appendChild(card("Humidity", cur.relative_humidity_2m + "%", null));
    grid.appendChild(
      card(
        "Wind",
        Math.round(cur.wind_speed_10m) + " mph " + cardinal(cur.wind_direction_10m),
        "Gusts to " + Math.round(cur.wind_gusts_10m) + " mph"
      )
    );
    grid.appendChild(
      card("Sky", weatherLabel(cur.weather_code), cur.precipitation > 0 ? "Precipitation nearby" : null)
    );

    var meta = document.getElementById("forecast-updated");
    if (meta) {
      meta.textContent =
        "Observation time (local): " +
        fmtTime(cur.time, tz) +
        " · Sarasota area (" +
        SARASOTA.lat +
        "°N, " +
        Math.abs(SARASOTA.lon) +
        "°W)";
    }

    root.appendChild(grid);
  }

  function renderHourly(root, data, marine, tz) {
    var h = data.hourly;
    var m = marine && marine.hourly;
    var title = document.createElement("h2");
    title.className = "forecast-section-title";
    title.textContent = "Next 24 hours — wind & conditions";
    root.appendChild(title);

    var wrap = document.createElement("div");
    wrap.className = "forecast-table-wrap";
    var table = document.createElement("table");
    table.className = "forecast-table";
    var thead = "<thead><tr><th>Time</th><th>Temp</th><th>Rain %</th><th>Wind</th><th>Gust</th>";
    if (m && m.time && m.wave_height) {
      thead += "<th>Waves (ft)</th><th>Sea dir</th>";
    }
    thead += "</tr></thead>";
    table.innerHTML = thead;
    var tb = document.createElement("tbody");

    var now = Date.now();
    var count = 0;
    for (var i = 0; i < h.time.length && count < 24; i++) {
      var t = new Date(h.time[i]).getTime();
      if (t < now - 30 * 60 * 1000) continue;
      var tr = document.createElement("tr");
      var wind =
        Math.round(h.wind_speed_10m[i]) +
        " mph " +
        cardinal(h.wind_direction_10m[i]);
      var gustVal = h.wind_gusts_10m ? h.wind_gusts_10m[i] : null;
      var gust = gustVal != null ? Math.round(gustVal) + " mph" : "—";
      var cells =
        "<td>" +
        fmtTime(h.time[i], tz) +
        "</td><td>" +
        Math.round(h.temperature_2m[i]) +
        "°F</td><td>" +
        (h.precipitation_probability[i] != null ? h.precipitation_probability[i] + "%" : "—") +
        "</td><td>" +
        wind +
        "</td><td>" +
        gust +
        "</td>";
      if (m && m.time && m.wave_height) {
        var mi = marineIndexForTime(m.time, h.time[i]);
        if (mi >= 0) {
          var wh = m.wave_height[mi];
          var wd = m.wave_direction[mi];
          cells +=
            "<td>" + (wh != null ? wh.toFixed(1) : "—") + "</td><td>" + (wd != null ? cardinal(wd) : "—") + "</td>";
        } else {
          cells += "<td>—</td><td>—</td>";
        }
      }
      tr.innerHTML = cells;
      tb.appendChild(tr);
      count++;
    }
    table.appendChild(tb);
    wrap.appendChild(table);
    root.appendChild(wrap);
  }

  function renderDaily(root, data, tz) {
    var d = data.daily;
    var title = document.createElement("h2");
    title.className = "forecast-section-title";
    title.textContent = "7-day overview";
    root.appendChild(title);

    var wrap = document.createElement("div");
    wrap.className = "forecast-table-wrap";
    var table = document.createElement("table");
    table.className = "forecast-table";
    table.innerHTML =
      "<thead><tr><th>Day</th><th>High / low</th><th>Rain sum</th><th>Max wind</th><th>Sky</th></tr></thead>";
    var tb = document.createElement("tbody");
    for (var i = 0; i < d.time.length; i++) {
      var tr = document.createElement("tr");
      tr.className = "daily-row";
      var rain = d.precipitation_sum[i];
      tr.innerHTML =
        "<td>" +
        fmtDay(d.time[i], tz) +
        "</td><td>" +
        Math.round(d.temperature_2m_max[i]) +
        "° / " +
        Math.round(d.temperature_2m_min[i]) +
        "°F</td><td>" +
        (rain != null && rain > 0 ? rain.toFixed(2) + " in" : "—") +
        "</td><td>" +
        Math.round(d.wind_speed_10m_max[i]) +
        " mph (gust " +
        Math.round(d.windgusts_10m_max[i]) +
        ")</td><td>" +
        weatherLabel(d.weather_code[i]) +
        "</td>";
      tb.appendChild(tr);
    }
    table.appendChild(tb);
    wrap.appendChild(table);
    root.appendChild(wrap);
  }

  function run() {
    var status = document.getElementById("forecast-status");
    var content = document.getElementById("forecast-content");
    var errBox = document.getElementById("forecast-error");

    if (!status || !content) return;

    status.setAttribute("aria-busy", "true");
    status.textContent = "Loading forecast…";

    var tz = "America/New_York";
    Promise.all([
      fetch(buildForecastUrl().toString()).then(function (r) {
        if (!r.ok) throw new Error("Weather request failed");
        return r.json();
      }),
      fetch(buildMarineUrl().toString())
        .then(function (r) {
          return r.ok ? r.json() : null;
        })
        .catch(function () {
          return null;
        }),
    ])
      .then(function (pair) {
        var wx = pair[0];
        var marine = pair[1];
        status.setAttribute("aria-busy", "false");
        status.hidden = true;
        content.hidden = false;
        if (errBox) errBox.hidden = true;

        content.innerHTML = "";
        renderCurrent(content, wx, tz);
        renderHourly(content, wx, marine, tz);
        renderDaily(content, wx, tz);

        var attr = document.createElement("p");
        attr.className = "forecast-attribution";
        attr.innerHTML =
          'Forecast data: <a href="https://open-meteo.com/" rel="noopener noreferrer">Open-Meteo</a> (weather + marine models). ' +
          "Not a substitute for official marine forecasts or your own judgment on the water.";
        content.appendChild(attr);
      })
      .catch(function () {
        status.setAttribute("aria-busy", "false");
        status.hidden = true;
        content.hidden = true;
        if (errBox) {
          errBox.hidden = false;
          errBox.textContent =
            "We couldn’t load the forecast. Check your connection and refresh, or use the National Weather Service / NOAA marine forecast for official guidance.";
        }
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
