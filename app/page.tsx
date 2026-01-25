'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <div className="animate-fade-in">
          {/* Logo/Title */}
          <div className="mb-8">
            <div className="text-7xl mb-4">🔐</div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              CipherPulse
            </h1>
            <p className="text-xl text-cyan-300/80 mb-8">Modern Messaging with End-to-End Encryption</p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="glass rounded-lg p-6 backdrop-blur-xl smooth-transition hover:border-cyan-400">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Real-Time</h3>
              <p className="text-sm text-gray-300">Instant message delivery with live updates</p>
            </div>
            <div className="glass rounded-lg p-6 backdrop-blur-xl smooth-transition hover:border-purple-400">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-lg font-semibold mb-2">Secure</h3>
              <p className="text-sm text-gray-300">End-to-end encryption for privacy</p>
            </div>
            <div className="glass rounded-lg p-6 backdrop-blur-xl smooth-transition hover:border-blue-400">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-lg font-semibold mb-2">Beautiful</h3>
              <p className="text-sm text-gray-300">Modern UI with smooth animations</p>
            </div>
          </div>

          {/* Coming soon section */}
          <div className="glass rounded-lg p-8 backdrop-blur-xl mb-12 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              CipherPulse is launching soon with advanced messaging features including real-time communication, 
              secure encryption, and an intuitive user interface.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>✓ Real-Time Messaging</div>
              <div>✓ Encryption</div>
              <div>✓ Typing Indicators</div>
              <div>✓ Message Status</div>
              <div>✓ Message Reactions</div>
              <div>✓ Dark/Light Mode</div>
              <div>✓ User Presence</div>
              <div>✓ Search History</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="glass px-12 py-4 rounded-lg text-lg font-semibold bg-gradient-to-r from-cyan-500/30 to-purple-500/30 hover:from-cyan-500/50 hover:to-purple-500/50 smooth-transition border border-cyan-400/50 hover:border-cyan-300">
            Get Notified
          </button>

          {/* Footer */}
          <p className="mt-12 text-sm text-gray-400">
            Built with Next.js, Tailwind CSS & Supabase • Deployed on Vercel
          </p>
        </div>
      </div>
    </div>
  );
}
