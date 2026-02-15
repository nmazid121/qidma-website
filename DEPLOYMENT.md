# Deployment Guide for QIDMA Website

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Best for:** Quick deployment, automatic deployments from GitHub

#### Steps:

1. **Push to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/qidma-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings

3. **Set Environment Variable:**
   - In Vercel project settings → Environment Variables
   - Add: `ADMIN_PASSWORD` = `your-secure-password`

4. **Deploy!**
   - Click "Deploy"
   - Your site will be live at `your-project.vercel.app`

#### ⚠️ Important: File Storage Issue

**The current JSON file storage won't persist on Vercel** because serverless functions have read-only filesystems. You have two options:

**Option A: Quick Demo (Data resets on redeploy)**
- Deploy as-is for showing the site
- Data will be lost when you redeploy
- Good for demos/presentations

**Option B: Use a Database (Recommended for production)**
- Set up Vercel Postgres (free tier) or Supabase
- Update the data functions to use the database
- Data will persist properly

---

### Option 2: Netlify

Similar to Vercel:

1. Push to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import from GitHub
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Add environment variable: `ADMIN_PASSWORD`

**Same file storage limitation applies.**

---

### Option 3: Railway / Render (Supports File Writes)

These platforms support persistent file storage:

#### Railway:
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add environment variable: `ADMIN_PASSWORD`
4. Your JSON files will persist!

#### Render:
1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variable: `ADMIN_PASSWORD`

---

## 📋 Pre-Deployment Checklist

- [ ] Test locally: `npm run build && npm start`
- [ ] Set `ADMIN_PASSWORD` environment variable
- [ ] Make sure `.env.local` is in `.gitignore` (don't commit passwords!)
- [ ] Test admin login works
- [ ] Add some sample events/newsletter content

---

## 🔧 Quick Fix for Vercel (Temporary Demo)

If you just need to show someone the site quickly on Vercel:

1. Deploy to Vercel (follow steps above)
2. The site will work, but:
   - Events/newsletter data will reset on each deployment
   - You can still add content through admin panel during the session
   - Good enough for demos!

---

## 💾 Database Migration (For Production)

For a production site, you'll want to migrate from JSON files to a database:

### Quick Setup with Vercel Postgres:

1. In Vercel dashboard → Storage → Create Database → Postgres
2. Get connection string
3. Install: `npm install @vercel/postgres`
4. Update `lib/data/events.ts` and `lib/data/newsletter.ts` to use SQL queries
5. Create tables for events and newsletters

### Or use Supabase (Easier):

1. Sign up at [supabase.com](https://supabase.com) (free tier)
2. Create a project
3. Get connection details
4. Install: `npm install @supabase/supabase-js`
5. Update data functions to use Supabase

---

## 🌐 Custom Domain (Optional)

After deployment:
1. In Vercel/Netlify dashboard → Settings → Domains
2. Add your custom domain
3. Follow DNS setup instructions

---

## 📝 Quick Start Commands

```bash
# Test build locally first
npm run build
npm start

# If everything works, push to GitHub
git add .
git commit -m "Ready for deployment"
git push

# Then deploy via Vercel/Netlify dashboard
```

---

## 🆘 Troubleshooting

**Build fails?**
- Check for TypeScript errors: `npm run lint`
- Make sure all dependencies are in `package.json`

**Admin login doesn't work?**
- Verify `ADMIN_PASSWORD` environment variable is set
- Check it matches what you're typing

**Data not saving?**
- On Vercel/Netlify: This is expected with file storage
- Use Railway/Render or migrate to a database

---

## 🎯 Recommended Path

1. **For quick demo:** Deploy to Vercel (data resets on redeploy)
2. **For production:** Deploy to Railway/Render OR migrate to database on Vercel
