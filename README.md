# Oxiverse Home Page - Setup Guide

A modern, privacy-first ecosystem built with Next.js 14, PostgreSQL, Prisma, and NextAuth.js.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier)
- A Vercel account (for deployment)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Choose a region close to you
   - Save your database password

2. **Get Your Credentials**
   - Go to **Settings** → **API**
   - Copy:
     - Project URL → `SUPABASE_URL`
     - anon/public key → `SUPABASE_ANON_KEY`
     - service_role key → `SUPABASE_SERVICE_ROLE_KEY`

3. **Get Database Connection String**
   - Go to **Settings** → **Database**
   - Under **Connection string**, select **URI** mode
   - Copy the connection string and replace `[YOUR-PASSWORD]` with your actual password
   - This is your `DATABASE_URL`

4. **Update `.env` File**
   
   Open `.env` and add your credentials:
   
   ```env
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
   SUPABASE_URL="https://[PROJECT-REF].supabase.co"
   SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
   SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"
   
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Generate NextAuth Secret**
   
   Run this command to generate a secure secret:
   
   ```bash
   # On Linux/Mac
   openssl rand -base64 32
   
   # On Windows (PowerShell)
   [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
   ```

### 3. Set Up Database Schema

```bash
# Push Prisma schema to Supabase
npm run db:push

# (Optional) Seed database with admin user
npm run db:seed
```

**Default Admin Credentials:**
- Email: `admin@oxiverse.com`
- Password: `admin123`

⚠️ **Change the password after first login!**

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Access admin panel at [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (sections)/       # Landing page sections
│   ├── admin/            # Admin dashboard (protected)
│   │   ├── login/        # Admin login page
│   │   ├── dashboard/    # Dashboard overview
│   │   ├── blog/         # Blog CRUD
│   │   └── research/     # Research CRUD
│   ├── api/
│   │   ├── auth/         # NextAuth.js routes
│   │   ├── blog/         # Blog API endpoints
│   │   └── research/     # Research API endpoints
│   ├── blog/             # Public blog pages
│   └── research/         # Public research pages
├── components/
│   └── ui/               # Reusable UI components
├── lib/
│   ├── hooks/            # Custom React hooks
│   ├── providers/        # Context providers
│   ├── auth.ts           # Auth helpers
│   ├── prisma.ts         # Prisma client singleton
│   ├── supabase.ts       # Supabase client
│   └── utils.ts          # Utility functions
└── types/                # TypeScript type definitions

prisma/
├── schema.prisma         # Database schema
└── seed.ts               # Database seeding script
```

---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Database:** PostgreSQL via Supabase
- **ORM:** Prisma
- **Auth:** NextAuth.js (Credentials Provider)
- **Markdown:** ReactMarkdown + remark-gfm
- **Deployment:** Vercel (frontend) + Supabase (database)

---

## 📝 Features

### Public Pages
- ✅ Landing page with Hero, Features, Use Cases, Roadmap sections
- ✅ Blog listing and detail pages with SEO
- ✅ Research papers listing and detail pages
- ✅ Co-founder page for onboarding potential partners
- ✅ Responsive design with dark theme

### Admin Dashboard
- ✅ Secure login with NextAuth.js
- ✅ Dashboard with stats overview
- ✅ Blog CRUD with Markdown editor
- ✅ Research paper CRUD with PDF support
- ✅ Toast notifications
- ✅ Real-time preview

---

## 🔐 Admin Login

Access the admin panel at `/admin/login`

**Default credentials (change after first login!):**
- Email: `admin@oxiverse.com`
- Password: `admin123`

---

## 🗄️ Database Commands

```bash
# Push schema to database
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Seed database with admin user
npm run db:seed
```

---

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code quality
npm run lint         # Run ESLint

# Database
npm run db:push      # Push Prisma schema to DB
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

---

## 🚢 Deployment (Week 4)

### 1. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables from `.env`
5. Deploy!

### 2. Update Environment Variables

In Vercel project settings, add all variables from `.env`:
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL` (set to your production URL)

### 3. Update NEXTAUTH_URL

After deployment, update `NEXTAUTH_URL` in Vercel to your production URL:
```env
NEXTAUTH_URL="https://your-domain.vercel.app"
```

---

## 📄 API Endpoints

### Blog
- `GET /api/blog` - List all blogs
- `POST /api/blog` - Create blog
- `GET /api/blog/:id` - Get single blog
- `PUT /api/blog/:id` - Update blog
- `DELETE /api/blog/:id` - Delete blog

### Research
- `GET /api/research` - List all papers
- `POST /api/research` - Create paper
- `GET /api/research/:id` - Get single paper
- `PUT /api/research/:id` - Update paper
- `DELETE /api/research/:id` - Delete paper

### Auth
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get session

---

## 🎨 Design System

### Colors
- **Primary:** Blue (`#3b82f6` to `#1e3a8a`)
- **Accent:** Sky (`#0ea5e9` to `#0c4a6e`)
- **Dark:** Slate (`#0f172a` to `#020617`)

### Components
All UI components are in `src/components/ui/`:
- `Button` - Multiple variants (primary, secondary, outline, ghost)
- `Card` - With optional hover effects
- `Input` - With validation states
- `Textarea` - With validation states
- `Modal` - With keyboard support
- `Toast` - Notification system
- `Spinner` - Loading indicator
- `Badge` - Status indicators

---

## 📈 Next Steps (Week 4)

1. **Storage Setup** - Configure Supabase Storage or Cloudflare R2 for PDF uploads
2. **SEO Polish** - ✅ Added sitemap, robots.txt, OpenGraph tags, structured data, and `<noscript>` semantic fallbacks for crawlers.
3. **Analytics** - Add Vercel Analytics or Google Analytics
4. **Performance** - Optimize images, add caching headers
5. **Testing** - Add E2E tests with Playwright

---

## 🤝 Contributing

This is a personal project, but feel free to open issues or submit PRs!

---

## 📄 License

Oxiverse Community License (OCL) v1.0 - see [LICENSE](LICENSE) for details

---

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://prisma.io/)
- [Supabase](https://supabase.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ReactMarkdown](https://reactmarkdown.com/)
