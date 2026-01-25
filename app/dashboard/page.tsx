'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            CipherPulse Dashboard
          </h1>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors border border-red-500/30"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-cyan-500/50 transition-all group">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-cyan-400">
              <span className="p-2 bg-cyan-500/10 rounded-lg">💬</span>
              Recent Chats
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 rounded-xl hover:bg-slate-700/50 cursor-pointer transition-colors border border-slate-600/50">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-slate-200">System Bot</span>
                  <span className="text-xs text-slate-400">Just now</span>
                </div>
                <p className="text-sm text-slate-400 mt-1 truncate">Welcome to CipherPulse! This is your unique encrypted space.</p>
              </div>
              <p className="text-center text-slate-500 text-sm py-4">No other active chats found.</p>
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-all">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
              <span className="p-2 bg-purple-500/10 rounded-lg">⚡</span>
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-cyan-500/20">
                Start New Chat
              </button>
              <button className="w-full p-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-colors">
                View Profile
              </button>
              <button className="w-full p-4 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl font-medium transition-colors">
                Security Settings
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-8 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl border border-slate-700 text-center">
          <h3 className="text-xl font-bold mb-2">Unique Feature: Cipher-Sync</h3>
          <p className="text-slate-400 max-w-lg mx-auto mb-6">
            Your messages are never stored in plain text. Every pulse is encrypted with a rotating key sync unique to your session.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-full text-xs text-cyan-300 border border-cyan-500/20">
            <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
            Session Key Active
          </div>
        </div>
      </div>
    </div>
  );
}
