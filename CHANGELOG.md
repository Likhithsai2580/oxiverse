# Changelog

All notable changes to the Oxiverse project will be documented in this file.

## [Unreleased]
### Fixed
- Resolved build failure in `Footer.tsx` caused by dangling syntax from a previous partial refactor.
- Resolved build failure in admin research edit page caused by redundant closing div tags.
- Fixed "Alternative page with proper canonical tag" SEO issue by removing global canonical override in root layout.
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
