# CipherPulse - Setup Guide

## 🚀 Quick Start

Follow these steps to set up CipherPulse locally and deploy to Vercel.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git
- Supabase account
- Vercel account

## 1. Supabase Setup

### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to initialize

### Create Database Tables

Go to SQL Editor and run:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  username VARCHAR NOT NULL,
  avatar_url VARCHAR,
  encryption_key VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  status VARCHAR DEFAULT 'sent',
  created_at TIMESTAMP DEFAULT NOW(),
  read_at TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can read messages they're part of" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can insert messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);
```

### Enable Realtime

1. Go to Replication in Supabase console
2. Enable Realtime for `messages` table

### Get API Keys

1. Go to Settings → API
2. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Service Role Key → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Local Setup

### Clone & Install

```bash
git clone https://github.com/realarpan/CipherPulse.git
cd CipherPulse
npm install
```

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 3. Vercel Deployment

### Deploy

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "Import Project"
4. Select GitHub repo
5. Add environment variables from .env.local
6. Deploy!

### Production Environment Variables

Add to Vercel Project Settings → Environment Variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app`

## Features Implemented

✅ Real-time authentication with Supabase Auth
✅ User profiles with editable usernames
✅ Real-time messaging with Supabase Realtime
✅ Dashboard with user list
✅ Chat interface with message history
✅ Beautiful glassmorphism UI
✅ Responsive design

## App Routes

- `/` - Home/Landing
- `/auth/login` - Login/Signup
- `/dashboard` - User list & conversations
- `/chat/[id]` - Direct messaging
- `/profile` - User settings

## Database Schema

### Users
- id (UUID)
- email (VARCHAR)
- username (VARCHAR)
- avatar_url (VARCHAR)
- encryption_key (VARCHAR)
- created_at (TIMESTAMP)

### Messages
- id (UUID)
- sender_id (UUID)
- receiver_id (UUID)
- content (TEXT)
- status (VARCHAR)
- created_at (TIMESTAMP)
- read_at (TIMESTAMP)

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL), Next.js API Routes
- **Realtime**: Supabase Realtime
- **Auth**: Supabase Auth
- **Deployment**: Vercel

## Troubleshooting

### Messages not loading
- Check Realtime is enabled in Supabase
- Verify RLS policies are set correctly
- Check browser console for errors

### Auth not working
- Verify email confirmation is enabled
- Check Supabase Auth settings
- Ensure .env variables are set

### Deployment issues
- Check Vercel logs
- Verify all env vars are set in Vercel
- Make sure Supabase is accessible from Vercel IPs

## Support

For issues or questions:
- Create an issue on GitHub
- Check existing issues for solutions

## License

MIT
