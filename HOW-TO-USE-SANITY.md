# 📖 QuickForma Publishing Guide & Growth OS Master Manual
**Version 2.0** — *Final Frozen Production Release — August 2026*

Welcome to **QuickForma Editorial 2.0 & Growth OS v2.0**! This guide is the single source of truth for **how to use Sanity Studio** (`https://www.quickforma.com/studio`), our internal editorial standards, Search Intent Ownership rules, AEO question blocks, and our automated publishing workflows.

---

# 📍 SECTION 1: STUDIO NAVIGATION & COMMAND CENTER

Log in to **`https://www.quickforma.com/studio`**. On the left sidebar, you will see two primary operating centers:

```text
🚀 Content Hub (Command Center)
   ├── ➕ Create New Content (Choose Type)
   ├── 📝 All Published & Draft Content (Unified List)
   ├── 🟡 Drafts & Pending Review
   ├── 🟢 Published Live Content
   ├── ⭐ Featured & Editor's Picks
   └── 📊 Content Health & Audit Dashboard
       ├── ⚠️ Evergreen Posts Needing Audit
       ├── 🖼️ Content Missing Alt Text or Featured Image
       └── 👤 Posts Missing Author Profile

🚀 QuickForma Growth OS (SEO & Intent Intelligence)
   ├── ➕ Start Research Sprint
   ├── 📝 Content Briefs (Pre-Writing Roadmap)
   ├── 👑 Topic Authority & Content Gap Dashboard
   ├── 🎯 Topic Clusters (Content Roadmap & Progress)
   ├── 🧠 Search Intent Vault (Primary Intent Owners)
   ├── 💎 Keyword Vault & Opportunity Scores (0-100)
   ├── ❓ AEO Question Library (AI Search Targets)
   ├── ⚔️ Strategic Competitor Intelligence
   └── ⚠️ Intent Cannibalization Monitor
```

### Studio Navigation Breakdown:
* **`➕ Create New Content`**: One-click menu to write an **Article**, create a **Business Playbook**, assemble a **Toolkit Collection**, or define a **Glossary Term**.
* **`📝 Content Briefs`**: Pre-writing briefs detailing Search Intent, target audience, competitor URLs, and H2/H3 outlines.
* **`👑 Topic Authority Dashboard`**: View all Topic Clusters sorted by coverage completion status to identify what to build next.
* **`🧠 Search Intent Vault`**: Manages 1:1 Search Intent Ownership to prevent intent cannibalization.
* **`💎 Keyword Vault`**: SEMrush keyword repository sorted by calculated **Opportunity Score (0-100)**.
* **`❓ AEO Question Library`**: Real user questions paired with **40-60 word Direct Answer Blocks** for Google AI Overviews, Perplexity, and ChatGPT Search.
* **`📊 Content Health & Audit Dashboard`**: Automated QA filters catching missing images, unverified facts, or missing author profiles before search engines crawl your site.

---

# 🔄 SECTION 2: THE END-TO-END PUBLISHING LIFECYCLE

Every piece of content moves through a 10-stage operating pipeline:

```text
💡 Idea ➔ 📌 Planned ➔ 🔬 Research ➔ 📝 Brief ➔ ✍️ Writing ➔ 🔍 Editing ➔ ⚙️ SEO ➔ 🟢 Published ➔ 📈 Ranking ➔ 🔄 Refreshing
```

### The Recommended Workflow:
1. **Log a SEMrush Sprint**: Under `🚀 Growth OS` $\rightarrow$ `➕ Start Research Sprint`, log your SEMrush session and discovered keywords.
2. **Create a Content Brief**: Under `📝 Content Briefs`, outline the Search Intent, target audience, competitor URLs, and H2/H3 structure.
3. **Write the Content**: Under `🚀 Content Hub` $\rightarrow$ `➕ Create New Content`, write your Article or Playbook.
4. **Assign Search Intent**: Select your `Primary Search Intent` reference in the editor.
5. **Run QA Check**: Verify missing alt text or missing media under `📊 Content Health Dashboard`.
6. **Publish**: Click the green **`Publish`** button!

---

# ⚡ SECTION 3: STANDARD PUBLISHING WORKFLOW (The 5 Core Fields)

When writing an Article or Playbook, **95% of your work happens in just 5 core fields**.

### Step 1: Article Title
* **Field**: `Article Title`
* **What to do**: Type your main post title (e.g. *How to Calculate Freelance Hourly Rates in 2026*).
* **What it does**: Renders as the main `<h1>` heading on your website and automatically becomes your default Google SEO Title and Social Share Title.

### Step 2: URL Slug
* **Field**: `Slug`
* **Behavior**: The slug is automatically generated from the title. If you edit the slug manually, automatic synchronization stops.

### Step 3: Excerpt / Summary
* **Field**: `Excerpt / Summary`
* **What to do**: Type a concise 1 to 2 sentence summary (20–300 characters).
* **What it does**: Used throughout QuickForma as the default summary for article cards, Google search snippets (unless overridden), social previews (unless overridden), RSS feeds, and related content recommendations.

### Step 4: Featured Cover Image & Required Alt Text
* **Field**: `Featured Image`
* **What to do**: Upload your cover banner image. Use landscape images with a consistent aspect ratio across all QuickForma articles for a professional appearance and consistent social sharing previews.
* **Important**: Click on the image to expand it, and fill out **`Alt Text`** (e.g. *Calculator interface displaying hourly rate formulas*).
* **What it does**: Displays as the top hero image on your article and serves as your social share card image on LinkedIn, X, and Facebook.

### Step 5: Rich Text Article Body
* **Field**: `Rich Text Body (Portable Text)`
* **What to do**: Type or paste your article content. Prefer a logical heading hierarchy (H2 → H3), short paragraphs, lists, comparison tables, worked examples, and practical takeaways. Avoid walls of text.
* **What it does**: Renders your main reading content.

### Step 6: Select Taxonomy (Category, Tags, Author)
* **Fields**: `Category`, `Tags`, `Author`
* **What to do**: Select your profile (*Arslan Rehmani*), Category (*Freelance & Billing*), and relevant Tags.
* **Golden Rule**: Create a new Category only if the content clearly doesn't fit an existing Category. Create Tags freely, but avoid creating near-duplicate Tags (e.g., "Invoice" vs "Invoices").
* **Pro-Tip (Inline Creation)**: If a Category or Tag doesn't exist yet, click **`+ Create New`** directly inside the dropdown. A modal window opens, lets you create the item, and automatically attaches it without navigating away!

### Step 7: Click Publish!
Click the green **`Publish`** button at the bottom right corner. Your article is instantly live on `https://www.quickforma.com/blog/your-slug`!

---

# 🧠 SECTION 4: SEARCH INTENT OWNERSHIP & ANTI-CANNIBALIZATION

Google ranks **Search Intent**, not raw text strings. Keyword variations like `invoice generator`, `free invoice generator`, and `online invoice maker` share identical intent.

### The 1:1 Intent Ownership Rule:
* **One Primary Intent = One Owner Article**: An article selects a `Primary Search Intent` reference from the Search Intent Vault.
* **Draft Alert**: While editing, if the selected intent is owned by another post, a warning banner appears (`⚠️ Intent owned by "Invoice Generator Guide"`).
* **Publish-Time Blocking**: When clicking **Publish**, Sanity validation **BLOCKS** the publish action if the intent is owned by another document:
  > ⛔ **CANNIBALIZATION BLOCKED**: Search Intent is already owned by *"Invoice Generator Guide"*! Transfer ownership in the Intent Vault or select another Search Intent.

---

# 🤖 SECTION 5: AEO & GEO DIRECT ANSWER QUESTION LIBRARY

AI Search Engines (Google AI Overviews, Perplexity, ChatGPT Search) pull concise, structured factual answers.

* **Direct Answer Block Standard**: For every target question in `❓ AEO Question Library`, write a **40–60 word concise direct answer** block right below the corresponding `H2` heading in your article.
* **Entity Mesh**: Always link the Article to its corresponding **Interactive Tool ID** (e.g. `invoice-generator`), **Glossary Term** (e.g. `EBITDA`), and **Verified Author profile**. AI models use this mesh to establish authority.

---

# ⚙️ SECTION 6: AUTOMATED INFRASTRUCTURE (What Happens Automatically)

You never have to manually enter or update the following technical items:

* ⏱️ **Estimated Reading Time**: QuickForma automatically calculates body word count on page render (`Math.ceil(words / 200)` min read).
* 📅 **Last Updated Timestamp**: Automatically synced with Sanity's system `_updatedAt` timestamp whenever you edit a post.
* 🕒 **Published Date**: Automatically set to the current date/time upon creation (`publishedAt`).
* 🗺️ **XML Sitemap**: Automatically updated with every publish event.
* 🔍 **Google Meta Tags**: Automatically generated from `Article Title` and `Excerpt`.
* 🌐 **Social Cards (OpenGraph & Twitter)**: Automatically generated from `Article Title`, `Excerpt`, and `Featured Image`.
* 📜 **Structured Data (Schema.org)**: Automatically generates valid JSON-LD tags for Google (`Article`, `BreadcrumbList`, `Organization`).

---

# 🎛️ SECTION 7: HOW TO USE ADVANCED OVERRIDES (The 5% Exception)

At the bottom of the editor, there are **4 collapsed accordions**. These stay closed and hidden unless you explicitly open them for custom tweaks.

> ⚠️ **Warning**: Override SEO or Social fields only when the automatically generated values are objectively worse than a custom version. Otherwise, leave them alone.

---

### 🔍 Accordion 1: `SEO Metadata`

By default, all fields inside this accordion are **100% hidden**.

* **`✏️ Override SEO Meta Tags` (Toggle)**:
  * Check this box **ONLY** if you want a custom Google title or description different from your main title/excerpt.
  * Once checked, input boxes appear:
    * **`SEO Title`**: Custom headline for Google search results (Keep under 60 characters).
    * **`Meta Description`**: Custom snippet description for Google results (Keep under 155 characters).
    * **`Canonical URL Override`**: Enter a URL if this article was originally published on Medium or another site to prevent duplicate content penalties.

---

### 🌐 Accordion 2: `Social Sharing Previews`

By default, all fields inside this accordion are **100% hidden**.

* **`🎨 Override Social Share Previews` (Toggle)**:
  * Check this box **ONLY** if you want a custom headline or image specifically for LinkedIn/X/Facebook shares.
  * Once checked, input boxes appear:
    * **`Social Title`**: Custom headline for social cards (Max 60 characters).
    * **`Social Description`**: Custom snippet for social cards (Max 160 characters).
    * **`Social Share Image`**: Custom graphic for social shares.

---

### 📈 Accordion 3: `Google Search Console (GSC) Performance Metrics`

Placeholder metrics for automated Search Console API sync:

* **`gscClicks`**: Total search clicks in the last 28 days.
* **`gscImpressions`**: Total search impressions in the last 28 days.
* **`gscCtr`**: Click-through rate percentage.
* **`gscAvgPosition`**: Average Google ranking position.
* **`gscPerformanceState`**: Performance classification (*Unindexed, Striking Distance (Page 2), Page 1 Ranking, Top 3 Rank, Content Needs Refresh*).

---

### ⚙️ Accordion 4: `Advanced Editorial & Governance Controls`

Holds power features for internal linking, audit badges, and editorial workflow:

* **`Related QuickForma Tool Catalog IDs`**: Type tool catalog IDs matching the QuickForma catalog (e.g. `freelance-hourly-rate-calculator`, `invoice-generator`, `paypal-fee-calculator`). This automatically renders interactive calculator widgets at the bottom of the article!
* **`Related Articles & Playbooks`**: Link only articles that genuinely help the reader continue learning. Prefer quality over quantity.
* **`Evergreen Content`** *(Defaults to Checked `true`)*: Tells the system this is foundational content that remains valid long-term. *Evergreen content should be reviewed periodically even if no changes are required.*
* **`Last Reviewed Date` & `Reviewed By (Author)`**: Used for Google E-E-A-T trust signals. When you audit an old article for accuracy, select your author name and update the review date. A green verified badge will display on the live page (*"Reviewed on Aug 8, 2026 by Arslan Rehmani"*).
* **`Editorial Draft Status`**: Select workflow state (*Draft, In Review, Approved, Published*).

---

# ✍️ SECTION 8: EDITORIAL STANDARDS & QUALITY ASSURANCE

Every QuickForma article should aim to:
* **Solve one clear user problem.**
* **Demonstrate the calculator or tool with realistic examples.**
* **Include practical takeaways.**
* **Link to relevant QuickForma tools.**
* **Link to related articles where helpful.**
* **Use descriptive headings (H2 → H3).**
* **Include at least one image when it improves understanding.**
* **Answer common user questions naturally.**
* **Avoid filler.**
* **Prioritize clarity over keyword stuffing.**

---

### 🎯 Summary Cheat-Sheet:

| Task | Where to go / What to click |
| :--- | :--- |
| **Write a new post** | `🚀 Content Hub` $\rightarrow$ `➕ Create New Content` $\rightarrow$ `📰 Write New Article` |
| **Standard Publishing** | Fill **Title** *(slug auto-syncs)*, fill **Excerpt**, upload **Featured Image + Alt**, write **Body**, select **Author/Category**, click **Publish**! |
| **Start a Research Sprint** | `🚀 Growth OS` $\rightarrow$ `➕ Start Research Sprint` |
| **Create a Content Brief** | `🚀 Growth OS` $\rightarrow$ `📝 Content Briefs` |
| **Check Topic Roadmap** | `🚀 Growth OS` $\rightarrow$ `👑 Topic Authority Dashboard` |
| **Add a missing Category** | Click `+ Create New` directly inside the Category dropdown |
| **Override Google Search snippet** | Expand `🔍 SEO Metadata` accordion $\rightarrow$ Check `✏️ Override SEO Meta Tags` |
| **Audit missing Alt text** | Check `📊 Content Health` $\rightarrow$ `🖼️ Content Missing Alt Text` |
