# 📖 QuickForma Publishing Guide & Editorial Standards
**Version 1.1** — *Last Updated: August 2026*

Welcome to **QuickForma Editorial 2.0**! This guide explains **how to use every feature in Sanity Studio** (`https://www.quickforma.com/studio`), our internal editorial standards, what each field does, and how to publish high-ranking articles, playbooks, toolkits, and glossary terms using our **Growth OS v2.0**.

---

# 📍 SECTION 1: LOGGING IN & NAVIGATING THE COMMAND CENTER

1. Open your browser and go to: **`https://www.quickforma.com/studio`**
2. Log in with your Sanity credentials.
3. On the left sidebar, you will see the **QuickForma CMS Command Center** & **Growth OS**:

```text
🚀 Content Hub (Command Center)
   ├── ➕ Create New Content (Choose Type)
   ├── 📝 All Published & Draft Content (Unified List)
   ├── 🟡 Drafts & Pending Review
   ├── 🟢 Published Live Content
   ├── ⭐ Featured & Editor's Picks
   └── 📊 Content Health & Audit Dashboard
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

### What Each Sidebar Section Does:
* **`📝 Content Briefs`**: The pre-writing starting point! Create a structured brief detailing the Search Intent, target audience, competitor URLs, and H2/H3 outline before writing.
* **`👑 Topic Authority & Content Gap Dashboard`**: View all Topic Clusters sorted by coverage completion status to identify what articles, glossary terms, or calculator tools to build next.
* **`🧠 Search Intent Vault`**: Manages 1:1 Search Intent Ownership to prevent intent-level cannibalization.
* **`💎 Keyword Vault`**: SEMrush keyword repository sorted by calculated **Opportunity Score (0-100)**.
* **`❓ AEO Question Library`**: Real user questions paired with **40-60 word Direct Answer Blocks** for AI Overviews, Perplexity, and ChatGPT Search.

---

# ⚡ SECTION 2: STANDARD PUBLISHING WORKFLOW

When creating an Article or Playbook, **95% of your work happens in just 5 core fields**.

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
* **What to do**: Drag & drop or upload your cover banner image. Use landscape images with a consistent aspect ratio across all QuickForma articles for a professional appearance and consistent social sharing previews.
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

# ⚙️ SECTION 3: AUTOMATED INFRASTRUCTURE (What Happens Automatically)

You never have to manually enter or update the following technical items:

* ⏱️ **Estimated Reading Time**: QuickForma automatically calculates body word count on page render (`Math.ceil(words / 200)` min read).
* 📅 **Last Updated Timestamp**: Automatically synced with Sanity's system `_updatedAt` timestamp whenever you edit a post.
* 🕒 **Published Date**: Automatically set to the current date/time upon creation (`publishedAt`).
* 🗺️ **XML Sitemap**: Automatically updated with every publish event.
* 🔍 **Google Meta Tags**: Automatically generated from `Article Title` and `Excerpt`.
* 🌐 **Social Cards (OpenGraph & Twitter)**: Automatically generated from `Article Title`, `Excerpt`, and `Featured Image`.
* 📜 **Structured Data (Schema.org)**: Automatically generates valid JSON-LD tags for Google (`Article`, `BreadcrumbList`, `Organization`).

---

# 🎛️ SECTION 4: HOW TO USE ADVANCED OVERRIDES (The 5% Exception)

At the bottom of the editor, there are **3 collapsed accordions**. These stay closed and hidden unless you explicitly open them for custom tweaks.

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

### ⚙️ Accordion 3: `Advanced Editorial & Governance Controls`

Holds power features for internal linking, audit badges, and editorial workflow:

* **`Related QuickForma Tool IDs`**: Type tool catalog IDs matching the QuickForma catalog (e.g. `freelance-hourly-rate-calculator`, `invoice-generator`, `paypal-fee-calculator`). This automatically renders interactive calculator widgets at the bottom of the article!
* **`Related Articles`**: Link only articles that genuinely help the reader continue learning. Prefer quality over quantity.
* **`Evergreen Content`** *(Defaults to Checked `true`)*: Tells the system this is foundational content that remains valid long-term. *Evergreen content should be reviewed periodically even if no changes are required.*
* **`Last Reviewed Date` & `Reviewed By (Author)`**: Used for Google E-E-A-T trust signals. When you audit an old article for accuracy, select your author name and update the review date. A green verified badge will display on the live page (*"Reviewed on Aug 7, 2026 by Arslan Rehmani"*).
* **`Editorial Draft Status`**: Select workflow state (*Draft, In Review, Approved, Published*).

---

# 📊 SECTION 5: HOW TO USE THE CONTENT HEALTH & AUDIT DASHBOARD

In the left sidebar under **`📊 Content Health & Audit Dashboard`**, click any of the 3 audit streams:

1. **`⚠️ Evergreen Posts Needing Audit`**: Lists long-term articles that haven't been fact-checked or updated recently. Click any item in this list to perform an audit and update `Last Reviewed Date`.
2. **`🖼️ Content Missing Alt Text or Featured Image`**: Lists articles missing cover images or accessibility alt text. Click to upload an image or fill out alt text to maintain 100% SEO compliance.
3. **`👤 Posts Missing Author Profile`**: Lists articles created without a linked author. Click to select an author reference for E-E-A-T authority.

---

# ✍️ SECTION 6: EDITORIAL STANDARDS

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
| **Add a missing Category** | Click `+ Create New` directly inside the Category dropdown |
| **Override Google Search snippet** | Expand `🔍 SEO Metadata` accordion $\rightarrow$ Check `✏️ Override SEO Meta Tags` |
| **Audit missing Alt text** | Check `📊 Content Health` $\rightarrow$ `🖼️ Content Missing Alt Text` |
