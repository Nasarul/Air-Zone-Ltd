import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { Bell, Check, Search, Trash2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotificationsView() {
  const { showToast } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'security'>('all');

  // Mock notifications state
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Relational Database backup successful', message: 'Manual backup file AZ_MANUAL_1092.sql has been safely copied to S3 buckets.', read: false, type: 'system', date: '5 mins ago' },
    { id: '2', title: 'New administrator account created', message: 'User Robert Downey registered from verified browser agent.', read: false, type: 'security', date: '1 hour ago' },
    { id: '3', title: 'API connection checkout failure', message: 'Billing endpoint gateway failed handshake on visa processing node.', read: true, type: 'system', date: '1 day ago' },
    { id: '4', title: 'SMTP Mail server successfully updated', message: 'Host parameters swapped to mailgun gateways.', read: true, type: 'security', date: '2 days ago' },
    { id: '5', title: 'Daily bookings digest compiled', message: 'Air ticketing bookings total reached 14 flights in the last cycle.', read: true, type: 'system', date: '3 days ago' },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('success', 'Operations Completed', 'Marked all messages as read.');
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    showToast('info', 'Item Removed', 'Deleted notification.');
  };

  // Filtered Notifications list
  const filteredNotifications = notifications.filter(n => {
    // 1. Search Query filter
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    // 2. Tab Category filter
    if (filter === 'unread') return matchesSearch && !n.read;
    if (filter === 'system') return matchesSearch && n.type === 'system';
    if (filter === 'security') return matchesSearch && n.type === 'security';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Notification Center</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse critical security notices, automated cron backups logs, and system events.
          </p>
        </div>
        
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All As Read</span>
          </button>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl shadow-sm overflow-hidden">
        {/* Search & Tabs control */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800/85 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
          
          {/* Left: Tab options */}
          <div className="flex gap-1 overflow-x-auto pb-1.5 lg:pb-0 select-none">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === 'all' ? 'bg-primary text-white' : 'text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              All Logs
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${filter === 'unread' ? 'bg-primary text-white' : 'text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              <span>Unread</span>
              {unreadCount > 0 && (
                <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${filter === 'unread' ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('system')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === 'system' ? 'bg-primary text-white' : 'text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              System
            </button>
            <button
              onClick={() => setFilter('security')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${filter === 'security' ? 'bg-primary text-white' : 'text-slate-505 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              Security
            </button>
          </div>

          {/* Right: Search box */}
          <div className="relative max-w-sm w-full lg:w-72">
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 pl-9 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Notifications Feed */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          <AnimatePresence initial={false}>
            {filteredNotifications.map(n => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-4 transition-colors flex items-start gap-4 relative group ${n.read ? 'bg-white dark:bg-slate-900' : 'bg-primary/5 dark:bg-primary/10'}`}
              >
                {/* Visual Unread Dot indicator */}
                {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />}

                {/* Icons based on type */}
                <div className={`p-2.5 rounded-xl border flex-shrink-0 mt-0.5 ${
                  n.type === 'security' 
                    ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/30 text-amber-550' 
                    : 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/30 text-blue-550'
                }`}>
                  {n.type === 'security' ? <ShieldCheck className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className={`text-xs font-bold ${n.read ? 'text-slate-800 dark:text-slate-200' : 'text-slate-950 dark:text-white'}`}>
                      {n.title}
                    </h4>
                    <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">{n.date}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{n.message}</p>
                  
                  {/* Actions row */}
                  <div className="flex items-center gap-4 pt-1.5 text-[10px] font-bold">
                    <button
                      onClick={() => handleToggleRead(n.id)}
                      className="text-slate-400 hover:text-primary transition-colors"
                    >
                      {n.read ? 'Mark as Unread' : 'Mark as Read'}
                    </button>
                    <button
                      onClick={() => handleDeleteNotification(n.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}

            {filteredNotifications.length === 0 && (
              <div className="text-center py-16 text-slate-400">
                <Bell className="w-8 h-8 mx-auto opacity-50 mb-3" />
                <h4 className="text-sm font-bold text-slate-550 dark:text-slate-350">No Messages Found</h4>
                <p className="text-xs mt-1">There are no notification logs matching your filter inputs.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
