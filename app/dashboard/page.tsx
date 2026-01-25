feat: Add dashboard page with login verification
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-500/20 p-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text">🔐 Dashboard</h1>
        <button 
          onClick={() => {localStorage.removeItem('user'); router.push('/auth/login');}}
          className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="glass rounded-lg p-12 text-center max-w-2xl">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to CipherPulse!</h2>
          <p className="text-gray-300 mb-8">Your secure messaging app is ready. Start chatting with friends now!</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass p-4 rounded-lg">
              <div className="text-3xl mb-2">🔐</div>
              <h3 className="font-semibold text-white">Secure</h3>
              <p className="text-sm text-gray-400">End-to-end encrypted</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold text-white">Fast</h3>
              <p className="text-sm text-gray-400">Real-time messaging</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="font-semibold text-white">Beautiful</h3>
              <p className="text-sm text-gray-400">Modern UI design</p>
            </div>
          </div>
          <Link href="/auth/login">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
