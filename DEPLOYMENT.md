# Week 4: Deployment & Storage Setup

## Part 1: Storage Setup (Supabase Storage or Cloudflare R2)

### Option A: Supabase Storage (Recommended - Easier)

**Why Supabase Storage?**
- Free tier: 1GB file storage, 5GB bandwidth/month
- Already integrated with your Supabase project
- No additional setup required

#### Setup Steps:

1. **Create a Storage Bucket**
   - Go to Supabase Dashboard → Storage
   - Click "New Bucket"
   - Name: `oxiverse-pdfs`
   - Public: **Yes** (for easy access)
   - File size limit: `52428800` (50MB)
   - Click "Save"

2. **Update Bucket Policy** (for admin uploads)
   - In Storage, click on your bucket
   - Go to "Policies" tab
   - Click "New Policy" → "For full customization"
   - Add this policy:
   
   ```sql
   -- Allow authenticated users to upload files
   CREATE POLICY "Admins can upload files"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'oxiverse-pdfs');
   
   -- Allow public to read files
   CREATE POLICY "Public can view files"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id = 'oxiverse-pdfs');
   ```

3. **Get Storage URL**
   - Your files will be accessible at:
   - `https://[PROJECT-REF].supabase.co/storage/v1/object/public/oxiverse-pdfs/[filename].pdf`

4. **Update Admin Interface**
   - Currently, the admin panel accepts PDF URLs directly
   - You can upload PDFs manually via Supabase Dashboard → Storage
   - Copy the public URL and paste it in the admin panel

### Option B: Cloudflare R2 (Cheaper at Scale)

**Why Cloudflare R2?**
- Free tier: 10GB storage, 10M operations/month
- No egress fees
- S3-compatible API

#### Setup Steps:

1. **Create R2 Bucket**
   - Go to Cloudflare Dashboard → R2
   - Create bucket: `oxiverse-pdfs`
   - Note your Account ID

2. **Create API Token**
   - Go to R2 → API Tokens
   - Create token with "Object Read & Write" permissions
   - Save Access Key ID and Secret Access Key

3. **Update .env**
   ```env
   R2_ACCOUNT_ID="your-account-id"
   R2_ACCESS_KEY_ID="your-access-key"
   R2_SECRET_ACCESS_KEY="your-secret-key"
   R2_BUCKET_NAME="oxiverse-pdfs"
   ```

4. **Install AWS SDK** (for S3-compatible uploads)
   ```bash
   npm install @aws-sdk/client-s3 @aws-sdk/lib-storage
   ```

5. **Create Upload API Route**
   - See `/api/upload/route.ts` (to be implemented)

---

## Part 2: SEO & Polish

### 1. Add Sitemap

Install sitemap generator:

```bash
npm install next-sitemap
```

Create `next-sitemap.config.js`:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://your-domain.com',
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
  },
}
```

Add to `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

### 2. Add OpenGraph Images

Create `src/app/opengraph-image.tsx`:

```typescript
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
  width: 1200,
  height: 630,
}

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 72, color: 'white', marginBottom: 20 }}>
            Oxiverse
          </h1>
          <p style={{ fontSize: 32, color: '#94a3b8' }}>
            Explore • Connect • Create
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
```

### 3. Add robots.txt

Create `public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://your-domain.com/sitemap.xml
```

---

## Part 3: Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://codeberg.org/itxLikhith/oxiverse.git
git push -u origin main
```

### 2. Deploy on Vercel

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

2. **Configure Build**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```
   DATABASE_URL="postgresql://[user]:[password]@db.[ref].supabase.co:6543/postgres?pgbouncer=true" (Use port 6543 and ?pgbouncer=true for Vercel)
   DIRECT_URL="postgresql://[user]:[password]@db.[ref].supabase.co:5432/postgres" (Use port 5432 for migrations)
   SUPABASE_URL=https://...
   SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your site is live! 🎉

### 3. Post-Deployment

1. **Update NEXTAUTH_URL**
   - In Vercel Dashboard → Settings → Environment Variables
   - Update `NEXTAUTH_URL` to your production URL
   - Redeploy

2. **Add Custom Domain** (optional)
   - Go to Vercel → Settings → Domains
   - Add your domain
   - Update DNS records as instructed

3. **Test Admin Login**
   - Visit `https://your-app.vercel.app/admin/login`
   - Login with admin credentials
   - Test creating a blog post

---

## Part 4: Production Checklist

### Before Going Live

- [ ] Change admin password from default
- [ ] Add all environment variables to Vercel
- [ ] Test all CRUD operations
- [ ] Test blog posts display correctly
- [ ] Test research papers with PDFs
- [ ] Verify mobile responsiveness
- [ ] Check all links work
- [ ] Add Google Analytics (optional)
- [ ] Add sitemap to search consoles

### Performance Optimization

1. **Enable Vercel Analytics**
   - Install: `npm install @vercel/analytics`
   - Add to layout: `<Analytics />`

2. **Image Optimization**
   - Use Next.js Image component
   - Convert images to WebP format

3. **Caching Headers**
   - Add to `next.config.js`:
   
   ```javascript
   module.exports = {
     headers: async () => [
       {
         source: '/:path*',
         headers: [
           {
             key: 'Cache-Control',
             value: 'public, max-age=3600, stale-while-revalidate=59',
           },
         ],
       },
     ],
   }
   ```

---

## Part 5: Monitoring & Maintenance

### 1. Set Up Monitoring

- **Vercel Analytics** - Track page views, performance
- **Supabase Logs** - Monitor database queries
- **Error Tracking** - Consider Sentry or LogRocket

### 2. Regular Backups

- Supabase automatically backs up daily (Pro plan)
- Export data regularly via Prisma Studio
- Keep GitHub repo up to date

### 3. Content Updates

- Login to admin panel regularly
- Publish new blog posts
- Upload research papers
- Monitor comments/feedback

---

## 🎉 You're Done!

Your Oxiverse home page is now:
- ✅ Live on Vercel
- ✅ Connected to Supabase PostgreSQL
- ✅ Has secure admin authentication
- ✅ Blog and Research CRUD working
- ✅ SEO optimized
- ✅ Ready for users!

**Estimated Monthly Cost:**
- Vercel: ₹0 (Free tier)
- Supabase: ₹0 (Free tier)
- Total: **₹0/month** 🚀

Upgrade only when you need more resources!
