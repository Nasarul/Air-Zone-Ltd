import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { 
  Users, UserPlus, DollarSign, Clock, ArrowUpRight, ArrowDownRight, 
  Download, RefreshCw, Plus, FileSpreadsheet, Lock, AlertCircle, Play 
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomeView() {
  const { users, systemLogs, showToast, openModal, addUser, setSubPage } = useDashboard();
  const [selectedChartTab, setSelectedChartTab] = useState<'users' | 'revenue'>('users');

  // Stats Data
  const stats = [
    {
      title: 'Total Users',
      value: users.length.toString(),
      change: '+14.2%',
      isPositive: true,
      desc: 'Active accounts in database',
      icon: <Users className="w-5.5 h-5.5 text-primary" />,
      bg: 'bg-primary/10 dark:bg-primary/20',
    },
    {
      title: 'New Members',
      value: '24',
      change: '+8.3%',
      isPositive: true,
      desc: 'Registered in the last 7 days',
      icon: <UserPlus className="w-5.5 h-5.5 text-accent" />,
      bg: 'bg-accent/10 dark:bg-accent/20',
    },
    {
      title: 'Monthly Revenue',
      value: '$34,950',
      change: '+22.5%',
      isPositive: true,
      desc: 'SaaS subscriptions collected',
      icon: <DollarSign className="w-5.5 h-5.5 text-emerald-500" />,
      bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    },
    {
      title: 'Pending Requests',
      value: '3',
      change: '-12.0%',
      isPositive: false,
      desc: 'Awaiting admin credentials approval',
      icon: <Clock className="w-5.5 h-5.5 text-amber-500" />,
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    },
  ];

  // Quick Action Triggers
  const handleExport = (format: 'CSV' | 'Excel' | 'PDF') => {
    showToast('info', 'Generating Export', `Preparing user data database for ${format} format...`);
    setTimeout(() => {
      showToast('success', 'Export Ready', `${format} file downloaded successfully.`);
    }, 1500);
  };

  const handleCreateUser = () => {
    let name = '';
    let email = '';
    let role: 'User' | 'Manager' | 'Billing' | 'Support' = 'User';

    openModal(
      'confirmation',
      'Create New Account',
      'Fill in the user details. You will simulate registering a new user.',
      () => {
        if (!name || !email) {
          showToast('error', 'Fields Empty', 'Unable to create user without valid name and email.');
          return;
        }
        addUser({
          name,
          email,
          role,
          status: 'Active',
          avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 100000)}?w=80&fit=crop&q=80`
        });
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">SaaS Dashboard Console</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time analytics, user access logs, and core system diagnostics.
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => handleExport('CSV')}
            className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => {
              showToast('info', 'Refreshing metrics', 'Fetching the latest analytics indexes...');
            }}
            className="p-2 bg-primary hover:bg-primary-hover text-white rounded-xl shadow-md shadow-primary/10 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 animate-spin-hover" />
          </button>
        </div>
      </div>

      {/* 1. Stat Cards (Lift-up Glassmorphism) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{item.title}</p>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tracking-tight">{item.value}</h3>
              </div>
              <div className={`p-3 rounded-xl ${item.bg} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
                {item.icon}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${item.isPositive ? 'bg-emerald-500/15 text-emerald-500' : 'bg-red-500/15 text-red-500'}`}>
                {item.isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                <span>{item.change}</span>
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">{item.desc}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 2. Charts and Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics SVG Line / Area chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6 border-b border-slate-100 dark:border-slate-800/60 pb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Operational Performance</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Comparing active members vs revenue growth</p>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl flex gap-1">
              <button
                onClick={() => setSelectedChartTab('users')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedChartTab === 'users' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'}`}
              >
                Members
              </button>
              <button
                onClick={() => setSelectedChartTab('revenue')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedChartTab === 'revenue' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'}`}
              >
                Revenue
              </button>
            </div>
          </div>

          {/* Premium custom SVG Chart */}
          <div className="relative h-64 w-full">
            {selectedChartTab === 'users' ? (
              <svg viewBox="0 0 500 200" className="w-full h-full text-primary" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#901A1D" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#901A1D" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                {/* Area under curve */}
                <path
                  d="M0 160 Q 80 120 160 140 T 320 80 T 500 40 L 500 200 L 0 200 Z"
                  fill="url(#chartGrad)"
                />
                {/* Spline Path */}
                <path
                  d="M0 160 Q 80 120 160 140 T 320 80 T 500 40"
                  fill="none"
                  stroke="#901A1D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Data Points */}
                <circle cx="80" cy="130" r="4.5" fill="#901A1D" stroke="white" strokeWidth="1.5" />
                <circle cx="240" cy="115" r="4.5" fill="#901A1D" stroke="white" strokeWidth="1.5" />
                <circle cx="400" cy="65" r="4.5" fill="#901A1D" stroke="white" strokeWidth="1.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 500 200" className="w-full h-full text-emerald-500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
                {/* Area under curve */}
                <path
                  d="M0 180 Q 80 160 160 110 T 320 90 T 500 20 L 500 200 L 0 200 Z"
                  fill="url(#chartGradRev)"
                />
                {/* Spline Path */}
                <path
                  d="M0 180 Q 80 160 160 110 T 320 90 T 500 20"
                  fill="none"
                  stroke="#22C55E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                {/* Data Points */}
                <circle cx="80" cy="170" r="4.5" fill="#22C55E" stroke="white" strokeWidth="1.5" />
                <circle cx="240" cy="100" r="4.5" fill="#22C55E" stroke="white" strokeWidth="1.5" />
                <circle cx="400" cy="55" r="4.5" fill="#22C55E" stroke="white" strokeWidth="1.5" />
              </svg>
            )}

            {/* Labels overlay */}
            <div className="absolute bottom-[-15px] left-0 right-0 flex justify-between text-[9px] font-bold text-slate-400 tracking-wider">
              <span>JAN</span>
              <span>FEB</span>
              <span>MAR</span>
              <span>APR</span>
              <span>MAY</span>
              <span>JUN</span>
              <span>JUL</span>
            </div>
          </div>
        </div>

        {/* Ring Chart of User Roles */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Access Distribution</h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">Security groups distribution</p>
          </div>

          <div className="my-auto py-4 flex items-center justify-center relative">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              {/* Ring segments */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#E2E8F0" strokeWidth="8" className="dark:stroke-slate-800" />
              {/* Admins - primary */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#901A1D" strokeWidth="8" strokeDasharray="238.76" strokeDashoffset="59.69" strokeLinecap="round" />
              {/* Managers - cyan */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#064368" strokeWidth="8" strokeDasharray="238.76" strokeDashoffset="179.07" strokeLinecap="round" />
              {/* Support - green */}
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22C55E" strokeWidth="8" strokeDasharray="238.76" strokeDashoffset="214.88" strokeLinecap="round" />
            </svg>
            
            {/* Center Summary */}
            <div className="absolute text-center">
              <span className="text-2xl font-black text-slate-800 dark:text-white leading-none">3</span>
              <span className="block text-[8px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">Roles Active</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold mt-2">
            <div className="flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded bg-primary mb-1" />
              <span className="text-slate-800 dark:text-slate-200">Admins</span>
              <span className="text-slate-400 font-normal">50%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded bg-accent mb-1" />
              <span className="text-slate-800 dark:text-slate-200">Managers</span>
              <span className="text-slate-400 font-normal">30%</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded bg-success mb-1" />
              <span className="text-slate-800 dark:text-slate-200">Support</span>
              <span className="text-slate-400 font-normal">20%</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Lower Content: Activities vs Quick Actions & Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent activity stream */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">Audit Trail Logs</h4>
              <p className="text-[11px] text-slate-400 dark:text-slate-500">Live feed of administrator interactions</p>
            </div>
            <button 
              onClick={() => setSubPage('security')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View Full Trail
            </button>
          </div>

          <div className="flow-root">
            <ul className="-mb-8">
              {systemLogs.slice(0, 4).map((log, logIdx) => (
                <li key={log.id}>
                  <div className="relative pb-8">
                    {logIdx !== 3 ? (
                      <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-100 dark:bg-slate-800" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-slate-900 ${
                          log.level === 'error' 
                            ? 'bg-red-500/10 text-red-500' 
                            : log.level === 'warn' 
                            ? 'bg-amber-500/10 text-amber-500' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          {log.category === 'auth' ? <Lock className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                            {log.message}
                          </p>
                        </div>
                        <div className="text-right text-[10px] text-slate-400 dark:text-slate-500 font-bold whitespace-nowrap">
                          <time>{log.timestamp.split(' ')[1]}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick Actions Panel & Announcements */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4">Quick Administration Actions</h4>
            
            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleCreateUser}
                className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Create New Account</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Quickly add simulated administrator credentials</div>
                </div>
              </button>

              <button
                onClick={() => handleExport('Excel')}
                className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Generate Report Output</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Construct financial analytics excel summary</div>
                </div>
              </button>

              <button
                onClick={() => setSubPage('settings')}
                className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3 transition-colors text-left group"
              >
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 group-hover:scale-105 transition-transform">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Toggle Maintenance State</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500">Simulate API and site downtime mode</div>
                </div>
              </button>
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-gradient-to-tr from-secondary to-primary text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-white/10 blur-xl" />
            
            <h4 className="text-sm font-bold text-white relative z-10 flex items-center gap-2">
              <span>Platform Update</span>
              <span className="bg-white/20 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase">v2.4</span>
            </h4>
            <p className="text-xs text-slate-100 leading-relaxed mt-2 relative z-10 opacity-90">
              The new automated travel visa verification pipelines are now online. Click the system reports module to trace throughput updates.
            </p>
            <button 
              onClick={() => showToast('info', 'System Update Info', 'Opening releases logs...')}
              className="mt-4 bg-white text-primary text-xs font-bold px-4 py-2 rounded-xl transition-transform hover:scale-105 shadow-sm active:scale-100 flex items-center gap-1.5"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Read Release Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
