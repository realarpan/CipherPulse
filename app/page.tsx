'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-cyan-400 text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold">CipherPulse</h1>
        <p className="text-gray-400 mt-2">Loading...</p>
      </div>
    </div>
  );
}
