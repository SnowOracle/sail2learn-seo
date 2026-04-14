# The Squarespace SEO Workflow: How to Work with AI

This guide explains how Squarespace handles "code," how you can feed me your backend settings for review, and exactly where to click in the Squarespace interface to implement our SEO strategy.

---

## 1. Can You Export "The Code" from Squarespace?

**Short Answer:** No, not in the way traditional websites work. 

**Why?** Squarespace is a "closed ecosystem" (SaaS). You do not have access to the underlying server code, databases, or core HTML/CSS files. You cannot export the site as code, edit it in an IDE (like Cursor/VS Code), and upload it back. 

**However, we don't need the backend code for SEO!** 
1. **The Public Code (Front-End):** I have already used my browser tools to scan the live public HTML of `sail2learn.com`. I have read your text, your current heading structure, and your images. 
2. **The Hidden Settings (Backend):** What I *cannot* see are your internal Squarespace settings (your SEO descriptions, URL slugs, and injected scripts). 

---

## 2. How to "Feed Me" Your Squarespace Data for Review

Since you can't export the code, here is how you can feed me your hidden settings so I can review them:

### A. The Site-Wide SEO Settings
1. In your Squarespace Home Menu, go to **Settings** > **SEO Appearance**.
2. Copy whatever text is currently inside the **"SEO Site Description"** box.
3. Paste it into our chat here. I will rewrite it to be perfectly optimized for AI and Google, and you can paste it back.

### B. The Page-Level SEO Settings
1. In the Home Menu, go to **Pages**.
2. Hover over your main pages (Home, Classes, Gallery, About) and click the **Gear Icon (⚙️)**.
3. Click the **SEO** tab in the pop-up window.
4. Copy the **"SEO Title"** and **"SEO Description"** and paste them to me in the chat. 

### C. Your Current "Injections"
1. Go to **Website** > **Pages** > scroll down to **Website Tools** > **Code Injection** (or **Settings > Advanced > Code Injection** depending on your Squarespace version).
2. If there is any code in the `Header` or `Footer` boxes, copy and paste it to me. I will check if any of it is slowing down your site or causing performance issues.

---

## 3. Step-by-Step: Fixing the SEO Errors in the Squarespace UI

Based on the SEO review tool you provided, here is exactly where to click in Squarespace to fix the 3 critical errors:

### Fix 1: The Missing H1 (Heading 1) Tag
Google needs to know the primary topic of your homepage.
1. Go to **Pages** and click on your **Homepage**.
2. Click **Edit** in the top left corner of the page preview.
3. Click into the text block at the very top of your site (where it currently says "sail to learn").
4. Highlight the text, and in the formatting toolbar that pops up, change the format dropdown from `Paragraph` (or whatever it is) to `Heading 1`.
5. Change the text to: **"Sarasota Sailing Lessons on Sarasota Bay"** (or your preferred keyword-rich title).
6. Click **Save** in the top left.

### Fix 2: The Missing Image "Alt Text"
Search engines and AI bots cannot see images; they read the hidden "Alt text".
1. In the page **Edit** mode, click on any image on your site (especially in your Gallery).
2. Click the **Pencil Icon (Edit)** on the image.
3. In the pop-up menu, look for the field called **Alt Text** (sometimes located under the *Content* or *Design* tab depending on the image block type).
4. Type a descriptive sentence: *"Student steering a 19' Flying Scot sailboat during a beginner lesson on Sarasota Bay."*
5. Do this for every image on the site.

### Fix 3: The Missing Meta Description
1. Go to **Settings** > **SEO Appearance**.
2. Scroll down to the **SEO Site Description** box.
3. Paste in this exact text: 
   *Learn to sail in Sarasota Bay with Sail2Learn. Beginner to intermediate hands-on sailing lessons in Sarasota and Bradenton, FL led by an ASA-certified instructor. Book your small-group lesson today!*
4. Click **Save**.

---

## 4. Advanced AI Optimization (Injecting Schema Code)

To make AI engines (ChatGPT, Google AI Overviews) view Steve as a highly trusted entity, we need to inject "Schema Markup" (JSON-LD code). This is the only actual "coding" you will do.

**Your Task:**
Reply to me in our chat with:
1. The public phone number for the business (if you want one listed).
2. The public email address (e.g., sbonham@georgiasouthern.edu).
3. The price range for lessons (e.g., $150 - $400).

**My Task:**
I will generate a block of `<script>` code containing perfectly formatted LocalBusiness and Course Schema.

**How You Implement It:**
1. Copy the code block I give you.
2. In Squarespace, go to **Website > Pages > Website Tools > Code Injection**.
3. Paste my code into the **HEADER** box.
4. Click **Save**. 

This code is invisible to humans but acts as a direct, high-priority cheat sheet for Googlebot and AI crawlers!