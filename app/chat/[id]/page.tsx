'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'user' | 'other';
  content: string;
  timestamp: string;
}

const chatData: Record<string, { name: string; avatar: string; messages: Message[] }> = {
  '1': {
    name: 'Alice Johnson',
    avatar: '👩',
    messages: [
      { id: '1', sender: 'other', content: 'Hey! How are you doing?', timestamp: '10:30 AM' },
      { id: '2', sender: 'user', content: 'I\'m doing great! How about you?', timestamp: '10:31 AM' },
      { id: '3', sender: 'other', content: 'Pretty good! Working on a cool project', timestamp: '10:32 AM' },
      { id: '4', sender: 'user', content: 'That\'s awesome! Tell me more', timestamp: '10:33 AM' },
    ],
  },
  '2': {
    name: 'Bob Smith',
    avatar: '👨',
    messages: [
      { id: '1', sender: 'other', content: 'Let\'s catch up tomorrow', timestamp: '9:15 AM' },
      { id: '2', sender: 'user', content: 'Sure! How about coffee?', timestamp: '9:16 AM' },
    ],
  },
  '3': {
    name: 'Team Dev',
    avatar: '👥',
    messages: [
      { id: '1', sender: 'other', content: 'Meeting at 3pm', timestamp: '8:45 AM' },
      { id: '2', sender: 'user', content: 'Got it!', timestamp: '8:46 AM' },
    ],
  },
  '4': {
    name: 'Emma Davis',
    avatar: '👩‍💼',
    messages: [
      { id: '1', sender: 'other', content: 'Thanks for the code review!', timestamp: '11:00 AM' },
      { id: '2', sender: 'user', content: 'No problem! Great work!', timestamp: '11:01 AM' },
    ],
  },
};

export default function ChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chatInfo, setChatInfo] = useState({ name: '', avatar: '' });
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }

    const chat = chatData[params.id];
    if (chat) {
      setChatInfo({ name: chat.name, avatar: chat.avatar });
      setMessages(chat.messages);
    }
  }, [params.id, router]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'user',
        content: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInput('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="border-b border-cyan-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-gray-400 hover:text-cyan-400">
            ←
          </Link>
          <div className="text-3xl">{chatInfo.avatar}</div>
          <h1 className="text-xl font-bold text-white">{chatInfo.name}</h1>
        </div>
        <div className="text-2xl">✓ Online</div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                  : 'glass text-gray-200'
              }`}
            >
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-cyan-100' : 'text-gray-400'}`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="border-t border-cyan-500/20 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
