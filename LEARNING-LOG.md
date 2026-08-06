# LEARNING-LOG.md — Technical Mastery Archive

## 2026-08-06 — QuickForma — Implemented Technical SEO Foundations (Sitemap Generator & Robots.txt)
**Tags:** #NodeJS #BuildHooks #TechnicalSEO #Sitemap #RobotsTxt #Regex #FileSystem
**Importance:** ★★★★★
**Frequency:** Daily
**Syntax Introduced:** `fs.readFileSync`, `fs.writeFileSync`, `import.meta.url`, `RegExp.exec()`, `package.json` scripts
**Concept Introduced:** Web Crawler Directives (`robots.txt`), XML Sitemap Protocol, Build-Step Automation
**Prerequisites:** Node.js File System (`fs`), Regular Expressions, Web Crawling Basics
**Decision:** Built a zero-dependency Node.js script (`scripts/generate-sitemap.js`) hooked into `npm run build`.
**Reason:** Automatically extracts all 50+ tool IDs from `toolsCatalog.ts` and updates `sitemap.xml` on every build without manual maintenance.
**Alternative:** Hand-crafted static `sitemap.xml` or third-party sitemap NPM plugins.
**Tradeoff:** Relies on consistent `id: '...'` string patterns in `toolsCatalog.ts`.
**General principle:** Automate metadata generation at build time to prevent manual omission and human error.
**CS50/roadmap.sh link:** CS50 Web Development — Web Crawlers, Indexing, & Build Automation Scripts.
**Remember This:** Automate crawler metadata at build time so search engines index 100% of your routes without manual upkeep.
**Full explanation:** Created `scripts/generate-sitemap.js` using Node's native `fs` and `path` modules to scan `toolsCatalog.ts`, extract all 50 unique tool IDs, and construct W3C-compliant XML (`public/sitemap.xml`) alongside `public/robots.txt`. Tied execution to `package.json` via `"build:sitemap"` so `npm run build` regenerates fresh sitemap metadata before compiling production assets.

## 2026-08-06 — QuickForma — Implemented Dynamic Canonical Tag Injection in React
**Tags:** #React #UseEffect #DOMMutation #CanonicalTags #DuplicateContent #SEO
**Importance:** ★★★★★
**Frequency:** Daily
**Syntax Introduced:** `document.querySelector<HTMLLinkElement>()`, `document.createElement('link')`, `document.head.appendChild()`
**Concept Introduced:** Dynamic Document Head Mutation, Canonicalization Protocol
**Prerequisites:** React `useEffect` Hook, DOM Manipulation, HTTP/SEO Canonical Headers
**Decision:** Used a client-side React `useEffect` hook in `ToolSeoWrapper.tsx` to dynamically manage `<link rel="canonical">` in `document.head`.
**Reason:** Prevents duplicate indexing penalties if crawlers access tool components via query parameters (e.g. `/?tool=invoice-generator`) instead of clean routes (`/tools/invoice-generator`).
**Alternative:** Hardcoded static HTML `<head>` link or React Helmet library.
**Tradeoff:** Dynamic DOM mutation runs post-mount on the client.
**General principle:** Explicitly designate a single canonical URL for every resource to resolve duplicate path ambiguity.
**CS50/roadmap.sh link:** CS50 Web Development — HTML Head Metadata & DOM Manipulation.
**Remember This:** Canonical tags tell search engines which URL is the single official authority when duplicate paths exist.
**Full explanation:** Implemented a `useEffect` hook inside `ToolSeoWrapper.tsx` that inspects `document.head` for an existing `link[rel="canonical"]` tag or creates one dynamically if missing. On every tool render, the hook updates the `href` attribute to point strictly to `https://quickforma.com/tools/${toolId}`, protecting Search Console indexing against query parameter duplicates.

