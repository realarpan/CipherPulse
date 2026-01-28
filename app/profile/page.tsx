'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !authUser) {
          router.push('/auth/login');
          return;
        }

        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (!profileError && profile) {
          setUser(profile);
          setUsername(profile.username);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleUpdateUsername = async () => {
    if (!user || !username.trim()) return;

    try {
      const { error } = await supabase
        .from('users')
        .update({ username: username.trim() })
        .eq('id', user.id);

      if (error) throw error;
      
      setUser({ ...user, username: username.trim() });
      setIsEditing(false);
      alert('Username updated successfully!');
    } catch (error) {
      console.error('Error updating username:', error);
      alert('Failed to update username');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-cyan-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-cyan-400 hover:text-cyan-300"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="glass rounded-2xl p-8 border border-cyan-500/20">
          {/* Profile Header */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4">
              {user?.username[0]?.toUpperCase()}
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{user?.username}</h1>
            <p className="text-gray-400">{user?.email}</p>
          </div>

          {/* Edit Username */}
          <div className="bg-slate-700/30 rounded-xl p-6 mb-8 border border-cyan-500/10">
            <h2 className="text-xl font-bold text-white mb-4">Profile Settings</h2>
            
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdateUsername}
                    className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setUsername(user?.username || '');
                    }}
                    className="flex-1 py-2 bg-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2 bg-slate-700/50 border border-cyan-500/30 text-gray-300 font-semibold rounded-lg hover:bg-slate-700 transition"
              >
                Edit Username
              </button>
            )}
          </div>

          {/* Account Info */}
          <div className="bg-slate-700/30 rounded-xl p-6 mb-8 border border-cyan-500/10">
            <h2 className="text-xl font-bold text-white mb-4">Account Information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user?.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">User ID</p>
                <p className="text-white font-mono text-sm break-all">{user?.id}</p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-600/20 border border-red-500 text-red-400 font-semibold rounded-lg hover:bg-red-600/30 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
