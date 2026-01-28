# CipherPulse - Deployment Fixes

## ✅ Issue: Deployment Failed / Build Errors

This document covers common deployment issues and how to fix them.

## Problem 1: Build Fails on Vercel

### Symptoms:
- Vercel deployment shows build error
- App shows old landing page instead of auth page
- TypeScript compilation errors

### Solutions:

#### Option A: Verify Environment Variables (Most Common)

1. Go to your Vercel Project Settings
2. Navigate to "Environment Variables"
3. Add these variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (set to your Vercel domain)

4. Redeploy:
   - Click "Deployments" tab
   - Click the three dots on the latest deployment
   - Select "Redeploy"

#### Option B: Clear Cache and Redeploy

1. In Vercel Dashboard, go to "Settings" → "Git"
2. Under "Deploy Hooks", create a new hook (optional)
3. Go to "Deployments"
4. Click the latest failed deployment
5. Click "Redeploy"

#### Option C: Rebuild from GitHub

1. Make a small commit to trigger rebuild:
   ```bash
   git add .
   git commit -m "chore: Trigger rebuild"
   git push origin main
   ```

## Problem 2: Supabase Connection Issues

### Symptoms:
- App loads but buttons don't work
- Auth page shows but can't log in
- Dashboard is blank

### Solutions:

1. **Verify Supabase Project Exists**
   - Go to [supabase.com](https://supabase.com)
   - Check your project is active
   - Check API Keys are correct

2. **Verify Database Tables Exist**
   ```sql
   -- Run in Supabase SQL Editor
   SELECT * FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

3. **Check RLS Policies**
   - Go to Authentication → Policies
   - Verify policies are enabled for `users` and `messages` tables

4. **Enable Realtime**
   - Go to Replication
   - Toggle ON for `messages` table

## Problem 3: localhost works but Vercel doesn't

### Symptoms:
- App works on `http://localhost:3000`
- Fails on Vercel deployment
- Console shows CORS or auth errors

### Solutions:

1. **Update NEXT_PUBLIC_APP_URL**
   - Set to your actual Vercel domain
   - Example: `https://cipher-pulse-iota.vercel.app`

2. **Check Supabase CORS Settings**
   - In Supabase: Settings → API → CORS
   - Add your Vercel domain to allowed origins

3. **Verify .env variables are set in Vercel**
   - Don't rely on .env.local
   - Must be in Vercel Environment Variables

## Problem 4: TypeScript Errors

### Symptoms:
- Build fails with TypeScript errors
- Next.js won't compile

### Solutions:

1. **Check lib/supabase.ts**
   - Ensure import statement is correct:
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   ```

2. **Verify all files have 'use client' directive**
   - Pages that use hooks should start with:
   ```typescript
   'use client';
   ```

3. **Local build test**
   ```bash
   npm run build
   ```
   - If it fails locally, fix it before pushing

## Problem 5: Pages Not Loading

### Symptoms:
- Dashboard shows but it's blank
- Chat page has errors
- Profile page 404s

### Solutions:

1. **Check Route Structure**
   ```
   app/
   ├── auth/login/page.tsx ✓
   ├── dashboard/page.tsx ✓
   ├── chat/[id]/page.tsx ✓
   └── profile/page.tsx ✓
   ```

2. **Rebuild and Redeploy**
   ```bash
   # Local
   rm -rf .next
   npm run build
   npm run dev

   # Then push to trigger Vercel rebuild
   git add .
   git commit -m "fix: Clear Next.js cache"
   git push origin main
   ```

## Deployment Checklist

Before deploying, verify:

- [ ] All environment variables set in Vercel
- [ ] Supabase project is active
- [ ] Database tables created with SQL
- [ ] RLS policies enabled
- [ ] Realtime enabled for messages table
- [ ] Local build works: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Routes exist in app/ folder
- [ ] lib/supabase.ts has correct imports
- [ ] All client components have 'use client'

## Quick Fix: Force Rebuild

1. In Vercel Dashboard
2. Go to Deployments
3. Click three dots on latest deployment
4. Click "Redeploy"
5. Wait for build to complete

## Check Build Logs

1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Go to "Logs" tab
4. Look for error messages
5. Search for "error" or "failed"

## Still Not Working?

1. Check Vercel Logs for specific errors
2. Run `npm run build` locally and fix errors
3. Verify all env variables are correct
4. Clear Vercel cache and redeploy
5. Check Supabase status at [supabase.com/status](https://supabase.com/status)

## Support

- GitHub Issues: Create an issue with build logs
- Vercel Logs: Share specific error messages
- Supabase Docs: https://supabase.com/docs
