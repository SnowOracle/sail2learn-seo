# SEO Stories & Task Backlog

This document organizes our SEO strategy into actionable Agile "User Stories" and a prioritized Task Backlog. It serves as a central hub for tracking what needs to be done, what is in progress, and long-term growth initiatives.

---

## 🏃‍♂️ SPRINT 1: The Critical Path (To-Do immediately)

**Story 1: As a tourist searching for sailing lessons, I want to see Sail2Learn on Google Maps so I can easily book a local class.**
- [ ] Create Google Business Profile at google.com/business
- [ ] Set business as a "Service Area Business" covering Sarasota and Bradenton
- [ ] Add `https://sail2learn.com` as the primary website link
- [ ] Verify the business with Google (postcard or video)
- [ ] Upload optimized photos (Steve, 19' Flying Scot, students)
- [ ] Generate "Review Link" and email past students to copy their website testimonials to Google

**Story 2: As Googlebot, I need to understand what the homepage is about so I can rank it for the correct local keywords.**
- [ ] Log into Squarespace and edit the Homepage
- [ ] Change the top hero text block from `Paragraph` to `Heading 1` (H1)
- [ ] Update H1 text to: "Sarasota Sailing Lessons on Sarasota Bay"
- [ ] Go to Settings > SEO Appearance in Squarespace
- [ ] Paste new Meta Description: *"Learn to sail in Sarasota Bay with Sail2Learn. Beginner to intermediate hands-on sailing lessons in Sarasota and Bradenton, FL led by an ASA-certified instructor."*

**Story 3: As a mobile user on a 3G connection, I need the site to load in under 3 seconds so I don't leave out of frustration.**
- [ ] Download all current gallery/site images to a local computer
- [ ] Run all images through TinyPNG.com (target < 500KB per image)
- [ ] Rename image files to include keywords (e.g., `sarasota-sailing-lesson.jpg`)
- [ ] Delete old images from Squarespace and upload the compressed versions
- [ ] Add descriptive Alt Text to every image in the Squarespace editor

---

## 🚶‍♂️ SPRINT 2: Building E-E-A-T & AI Optimization (Backlog)

**Story 4: As an AI Engine (ChatGPT/Gemini), I need structured data to mathematically verify the business details and course offerings.**
- [ ] Gather public phone number from owner
- [ ] Gather public email from owner
- [ ] Gather lesson price range from owner
- [ ] Update the JSON-LD Schema code block in `sail2learn-seo-strategy.md` with the new data
- [ ] Inject the Schema code into Squarespace via Website Tools > Code Injection > Header

**Story 5: As an AI Engine, I need proof that the instructor is a verified expert so I can confidently recommend him.**
- [ ] Edit the Steve Bonham bio section on the website
- [ ] Add outbound hyperlink from "ASA (American Sailing Association)" to `https://asa.com/`
- [ ] Add outbound hyperlink from "US Sailing" to their official site
- [ ] Ensure his credentials (former NCAA coach, 50+ years experience) are explicitly stated near his name

**Story 6: As a user asking conversational questions to AI, I want direct answers about the sailing lessons.**
- [ ] Draft 5-7 common questions (e.g., "Do I need experience?", "What boat do we use?", "Where do we launch?")
- [ ] Add a dedicated FAQ section to the Class Info page with clear, factual answers

---

## 🚀 LONG-TERM GROWTH (6+ Month Horizon)

**Story 7: As the business owner, I want to eliminate Squarespace platform limitations so I can achieve a 100/100 performance score and deploy new pages instantly with AI.**
- [ ] Review the `squarespace-to-code-migration.md` document
- [ ] Decide on migrating to a headless/static architecture (e.g., Astro + GitHub + Vercel)
- [ ] Rebuild the current UI using modern HTML/CSS
- [ ] Port all existing copy and optimized images to the new repository
- [ ] Configure automatic deployments

**Story 8: As a local business, I want to establish Topical Authority so I rank for all sailing-related searches in Southwest Florida.**
- [ ] Create a "Hub" page specifically dedicated to "Sailing in Sarasota Bay" (weather, wind conditions, launch points)
- [ ] Write "Spoke" articles linking back to the Hub:
    - [ ] *Understanding Wind Patterns on Sarasota Bay for Beginners*
    - [ ] *What to Expect in ASA 101 Keelboat Certification*
    - [ ] *The Physics of Sailing: How a 19' Flying Scot Moves*
- [ ] Create hyper-local landing pages for specific areas (e.g., `/bradenton-sailing-lessons`)