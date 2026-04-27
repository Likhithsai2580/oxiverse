# Changelog

All notable changes to the Oxiverse project will be documented in this file.

## [Unreleased]
### Added
- Integrated Roadmap Manager into the Admin Portal, allowing real-time customization of project milestones.
- Implemented file-based persistent storage for the Roadmap system to ensure data integrity and bypass Supabase dependency for this critical metadata.
- Created `/api/roadmap` endpoint for managing roadmap state via the admin dashboard.
- Migrated project license from IECL v1.0 to **Oxiverse Community License (OCL) v1.0**, introducing strict Privacy-by-Design requirements and updated commercial terms.

### Optimized
- Enhanced Admin Portal performance by enabling Next.js prefetching for all sidebar navigation links, ensuring instantaneous page transitions.
- Optimized the Roadmap Manager with memoized sub-components and `useCallback` hooks, preventing redundant re-renders in the interactive editor.
- Implemented Skeleton loaders across Roadmap, Ecosystem, and Settings pages to improve perceived performance and eliminate layout shifts during data fetching.
- Improved Largest Contentful Paint (LCP) for the admin dashboard by setting priority loading on core brand assets.
- Refactored state management in Settings and Roadmap managers for snappier UI interactions and more efficient reconciliation.


### Changed
- Redefined Phase 1 Roadmap objectives to focus on: Meta Search Engines, Intent Extraction, Brand Persistence, Caching, Local Indexing, and Affiliates.
- Migrated hardcoded Roadmap data to a dynamic, API-driven architecture.

### Fixed
- Resolved build failure in `Footer.tsx` caused by dangling syntax from a previous partial refactor.
- Fixed syntax error in admin ecosystem edit page due to mismatched div tags.
- Fixed invalid default import for Prisma Client in `sitemap.ts`.
- Resolved build failure in admin research edit page caused by redundant closing div tags.
- Resolved "Page with redirect" SEO indexing issue by unifying primary domain to `https://www.oxiverse.com` across all metadata, sitemaps, and canonical tags, aligning the codebase with hosting-level redirects.
- Corrected hero button labels and links to dynamically pull from central site configuration.

### Changed
- Updated official Search Engine links to `search.oxiverse.com` across the ecosystem.
- Migrated primary developer links from individual handles to the Oxiverse Codeberg organization.
- Enhanced dynamic sitemap generation to include all published blog posts and research papers.
- Refined Footer behavior: Products still in development now trigger a "Coming Soon" notification instead of navigating away.
- Rebranded Newsletter as a Project Status & Release Update portal.

### Added
- Implemented `robots.ts` and automated `sitemap.ts` for improved search engine crawling and indexability.
- Added comprehensive SEO optimization including `sitemap.ts`, `robots.ts`, and structured data (JSON-LD) in the root layout.
- Implemented `<noscript>` fallback content semantic markup to ensure high visibility for search engine crawlers regardless of 3D scene load states.
- Enhanced Next.js `metadata` object dynamically supporting OpenGraph and Twitter cards properties across the application.
- Added immersive 3D `OxiverseCore` component using Three.js and React Three Fiber to the Hero section.
- Added animated Framer Motion path connectors to the Roadmap section.

### Added
- Added `[slug]/page.tsx` dynamics route inside the `docs/` folder to fetch `README.md` and `docs/README.md` files from external GitHub repositories using GitHub's raw API, rendering them with `react-markdown` and `remark-gfm`.

### Changed
- Replaced `force-dynamic` with `revalidate = 60` in Blog and Research pages to drastically improve read latency (from full SSR to ISR) while keeping data fresh.
- Updated `sitemap.ts` to dynamically record Blog and Research papers from the database to improve SEO indexability.
- Updated Layout `metadata` to include `verification` tokens, `alternates.canonical`, and `category` properties for advanced SEO optimization.
- Modified Ecosystem project links to route to our internal dynamically generated documentation pages rather than redirecting to GitHub directly.
- Rebranded and redesigned the Hero section copy and CTAs to reflect "Privacy-first infrastructure for the open internet" with full reduced-motion and mobile fallbacks.
- Upgraded the Roadmap phase indicators to feature dynamic glowing node styling.
- Added `Newsletter` model to Prisma schema for storing subscriber emails.
- Created API endpoint `/api/newsletter` for processing subscriptions.
- Implemented `Contact` section with social links for Instagram, GitHub, X, Reddit, and Telegram.
- Added `image` field to `User` model for dynamic author avatars.

### Changed
- Refactored `Newsletter` component to use real API instead of simulation.
- Cleaned up boilerplate in `Blog` and `Research` components, ensuring they only show database-driven content.
- Updated `Blog` and `Research` detail pages to use dynamic author metadata and images from the database.
- Removed hardcoded "Tutorial" and "Paper" badges in favor of dynamic categories.
- Added `Contact` link to the main navigation.

### Added
- Created `directUrl` in `prisma/schema.prisma` mapping to the `DIRECT_URL` environment variable for handling migrations separately from the pooled connection environment.

### Changed
- Updated `.env` and `DEPLOYMENT.md` documentation to use connection pooling for Prisma Client in serverless environments on Vercel (`DATABASE_URL` port `6543` and `?pgbouncer=true`).
- Corrected Vercel database connectivity configuration for Supabase PostgreSQL.

### Fixed
- Fixed issue where the homepage retained deleted database records due to aggressive Next.js static rendering cache by adding `export const dynamic = 'force-dynamic'` to `src/app/page.tsx`.
- Fixed Vercel deployment error `PrismaClientInitializationError: Can't reach database server at db.dpgomyqzonhimempmnmh.supabase.co:5432` by routing the database connection string over the Supabase built-in PgBouncer pooler (port 6543).

## [1.0.0] - Initial Release
- Configured landing page and admin panel dashboards.
- Enabled Supabase database models for Blog and Research papers.
- Setup Markdown editing capabilities.
- Added NextAuth and secure authentication.
