# 📖 QuickForma Publishing Guide & Growth OS Master Manual
**Version 3.0** — *Final Production Release — August 2026*

Welcome to **QuickForma Publishing OS 3.0 & Growth OS**! This guide is the single source of truth for **how to use Sanity Studio** (`https://www.quickforma.com/studio`), our Shopify-style publishing cockpit, Search Intent Ownership rules, AEO question blocks, and our automated publishing workflows.

---

# 📍 SECTION 1: STUDIO NAVIGATION & COMMAND CENTER

Log in to **`https://www.quickforma.com/studio`**. On the left sidebar, you will see two primary operating centers:

```text
📝 Publish (Everyday Publishing Cockpit)
   ├── ➕ Write New Article
   ├── 📘 Create Business Playbook
   ├── 📦 Assemble Toolkit Collection
   ├── 📖 Define Glossary Term
   ├── 🟡 Drafts & Writing
   ├── 🟢 Published Live Content
   ├── ⭐ Featured & Editor's Picks
   ├── 📊 Publishing Readiness & Audit Dashboard
   │   ├── ⚠️ Evergreen Posts Needing Audit
   │   ├── 🖼️ Content Missing Alt Text or Featured Image
   │   └── 👤 Posts Missing Author Reference
   └── 📝 All Published & Draft Content (Unified List)

🚀 QuickForma Growth OS (SEO & Intent Intelligence - Strategist Workspace)
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
* **`📝 Publish`**: Everyday publishing workspace designed for Shopify-level simplicity. One-click entry to write an **Article**, create a **Business Playbook**, assemble a **Collection**, or define a **Glossary Term**.
* **`🚀 QuickForma Growth OS`**: Strategic intelligence layer for deeper keyword research, intent mapping, competitor auditing, and topic cluster coverage tracking.

---

# 🔄 SECTION 2: THE STREAMLINED PUBLISHING LIFECYCLE

In **Publishing OS 3.0**, creating and publishing content requires zero manual setup of underlying database records. The Growth OS operates automatically behind the scenes.

```text
📝 Click Publish ➔ 🎯 Enter Primary Keyword ➔ ✍️ Write Content ➔ 🟢 Publish
```

### The Recommended Workflow:
1. **Open Publish**: Go to `📝 Publish` $\rightarrow$ `➕ Write New Article`.
2. **Set Primary Keyword & Intent**: In the **SEO Strategy** panel, enter your primary search term (e.g. *profit margin calculator*). The system automatically checks for intent conflicts and links matching Keyword Vault or Search Intent items.
3. **Write the Content**: Write your title, excerpt, upload a cover image with Alt text, and paste your body text. (Author defaults automatically to *QuickForma Editorial*).
4. **Run QA Audit**: Verify readiness in `📊 Publishing Readiness Dashboard`.
5. **Publish**: Click the green **`Publish`** button!

---

# ⚡ SECTION 3: STANDARD PUBLISHING WORKFLOW (The Essentials)

When writing an Article or Playbook, **95% of your work happens in the primary publishing fields**.

### Step 1: Article Title & Slug
* **Fields**: `Article Title`, `Slug`
* **What to do**: Type your main title (e.g. *How to Calculate Profit Margin in 2026*). The slug auto-syncs from the title.

### Step 2: Primary Keyword (SEO Strategy)
* **Field**: `Primary Target Keyword`
* **What to do**: Enter your primary target search term. The system validates keyword/intent ownership in real time.
* **Cannibalization Guard**: If the intent is already owned by another published article, a blocking banner displays:
  > ⛔ **PRIMARY KEYWORD ALREADY USED**: Intent is already targeted by *"Profit Margin Calculator Guide"* at `/blog/profit-margin-guide`!

### Step 3: Excerpt / Summary
* **Field**: `Excerpt / Summary`
* **What to do**: Type a concise 1 to 2 sentence summary (20–300 characters).

### Step 4: Featured Cover Image & Required Alt Text
* **Field**: `Featured Image`
* **What to do**: Upload your cover banner image and fill out **`Alt Text`** for accessibility and image SEO.

### Step 5: Rich Text Body
* **Field**: `Rich Text Body (Portable Text)`
* **What to do**: Type or paste your article content using a logical heading hierarchy (H2 → H3), short paragraphs, and clear worked examples.

### Step 6: Category & Author
* **Fields**: `Category`, `Author`
* **Behavior**: Author automatically defaults to **QuickForma Editorial**. Select your Category (*Finance & Billing*).

### Step 7: Click Publish!
Click the green **`Publish`** button at the bottom right corner!

---

# 🧠 SECTION 4: SEARCH INTENT OWNERSHIP & ANTI-CANNIBALIZATION

Google ranks **Search Intent**, not raw text strings.

### The 1:1 Intent Ownership Rule:
* **One Primary Intent = One Owner Article**: Primary keyword and intent ownership are strictly enforced.
* **Secondary Keywords**: Secondary supporting keywords can be referenced across multiple posts without false blocking errors.
* **Publish-Time Validation**:
  > ⛔ **CANNIBALIZATION BLOCKED**: Search Intent is already owned by *"Profit Margin Calculator Guide"*! Transfer ownership in Intent Vault or select another intent.

---

# ⚙️ SECTION 5: AUTOMATED INFRASTRUCTURE (What Happens Automatically)

* ⏱️ **Estimated Reading Time**: Calculated automatically on page render (`Math.ceil(words / 200)` min read).
* 👤 **Author Defaulting**: Auto-assigns *QuickForma Editorial* reference.
* 🎯 **Topic Cluster Inheritance**: Automatically inherits the topic cluster from the assigned Search Intent.
* 📅 **Updated Timestamp**: Auto-synced with Sanity `_updatedAt`.
* 🗺️ **XML Sitemap**: Auto-updated with every publish event.
* 🔍 **Meta Tags & OpenGraph Cards**: Auto-generated from Title, Excerpt, and Cover Image.
* 📜 **Structured Data (Schema.org)**: Auto-generates valid JSON-LD tags (`Article`, `BreadcrumbList`, `Organization`).

---

# 🎛️ SECTION 6: HOW TO USE ADVANCED OVERRIDES (The 5% Exception)

Advanced settings stay collapsed in hidden accordions unless explicitly opened:
* 🔍 **SEO Metadata**: Custom Meta Title, Meta Description, or Canonical URL overrides.
* 🌐 **Social Sharing Previews**: Custom OpenGraph / Twitter cards.
* 📈 **GSC Performance Metrics**: Auto-synced Search Console clicks, impressions, CTR, and average position.
* ⚙️ **Advanced Editorial Controls**: Tool Catalog IDs (`relatedToolIds`), Internal Links (`relatedArticles`), Evergreen toggle, and E-E-A-T Reviewer Badges.

---

### 🎯 Summary Cheat-Sheet:

| Task | Where to go / What to click |
| :--- | :--- |
| **Write a new post** | `📝 Publish` $\rightarrow$ `➕ Write New Article` |
| **Check Primary Keyword** | Enter term in `🎯 Primary Target Keyword` $\rightarrow$ System checks intent ownership |
| **Publish Content** | Fill **Title**, **Primary Keyword**, **Excerpt**, **Featured Image + Alt**, **Body**, click **Publish**! |
| **Strategic Keyword Audit** | `🚀 QuickForma Growth OS` $\rightarrow$ `💎 Keyword Vault` |
| **Check Topic Roadmap** | `🚀 QuickForma Growth OS` $\rightarrow$ `👑 Topic Authority Dashboard` |
| **Audit missing Alt text** | `📝 Publish` $\rightarrow$ `📊 Publishing Readiness` $\rightarrow$ `🖼️ Missing Media` |

