import { Smartphone, Monitor, Tablet } from 'lucide-react';
import { ProgressBar } from '../ui/Loaders';

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Analytics</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics, query times, traffic sources, and resource usage statistics.
        </p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Sales Quota Achieved</span>
            <span className="text-primary font-black">82%</span>
          </div>
          <ProgressBar progress={82} />
          <div className="text-[10px] text-slate-400 font-medium">$82,000 collected vs $100,000 target</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>System Resource stability</span>
            <span className="text-emerald-500 font-black">94.8%</span>
          </div>
          <ProgressBar progress={95} />
          <div className="text-[10px] text-slate-400 font-medium">Core API response speed avg 85ms</div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-3.5">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Customer Satisfaction Net</span>
            <span className="text-cyan-500 font-black">97%</span>
          </div>
          <ProgressBar progress={97} />
          <div className="text-[10px] text-slate-400 font-medium">978 review tickets marked 5-Star</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* CHART 1: BAR CHART (Booking Channels) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Channel Transactions</h4>
            <p className="text-[10px] text-slate-400">Comparing booking types: Flights vs Visas vs Tours</p>
          </div>
          
          <div className="h-56 flex items-end justify-between px-4 pt-6 relative border-b border-slate-100 dark:border-slate-800">
            {/* Custom SVG Bar indicators */}
            <div className="flex flex-col items-center gap-2 w-16">
              <div className="w-8 bg-primary rounded-t-lg transition-all duration-500" style={{ height: '140px' }} />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Flights</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-16">
              <div className="w-8 bg-cyan-500 rounded-t-lg transition-all duration-500" style={{ height: '90px' }} />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Visas</span>
            </div>
            <div className="flex flex-col items-center gap-2 w-16">
              <div className="w-8 bg-emerald-500 rounded-t-lg transition-all duration-500" style={{ height: '60px' }} />
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Tours</span>
            </div>
          </div>
        </div>

        {/* CHART 2: AREA CHART (Registration curve) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">API Gateway Latency</h4>
            <p className="text-[10px] text-slate-400">Response time (ms) recorded across routing nodes</p>
          </div>

          <div className="h-56 relative w-full pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full text-primary" preserveAspectRatio="none">
              <line x1="0" y1="50" x2="500" y2="50" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
              <line x1="0" y1="100" x2="500" y2="100" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
              <line x1="0" y1="150" x2="500" y2="150" stroke="currentColor" opacity="0.05" strokeDasharray="4" />
              {/* Path line */}
              <path
                d="M0 150 L 100 80 L 200 130 L 300 45 L 400 90 L 500 25"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Nodes */}
              <circle cx="100" cy="80" r="5" fill="#2563EB" stroke="white" strokeWidth="2" />
              <circle cx="200" cy="130" r="5" fill="#2563EB" stroke="white" strokeWidth="2" />
              <circle cx="300" cy="45" r="5" fill="#2563EB" stroke="white" strokeWidth="2" />
              <circle cx="400" cy="90" r="5" fill="#2563EB" stroke="white" strokeWidth="2" />
            </svg>
            <div className="absolute bottom-[-15px] left-0 right-0 flex justify-between text-[9px] font-bold text-slate-450 tracking-wider">
              <span>Node 1</span>
              <span>Node 2</span>
              <span>Node 3</span>
              <span>Node 4</span>
              <span>Node 5</span>
              <span>Node 6</span>
            </div>
          </div>
        </div>

        {/* CHART 3: DUAL LINE CHART */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Active Traffic Streams</h4>
            <p className="text-[10px] text-slate-400">Comparing desktop vs mobile client connections</p>
          </div>

          <div className="h-56 relative w-full pt-4">
            <svg viewBox="0 0 500 200" className="w-full h-full" preserveAspectRatio="none">
              {/* Line 1 - Primary (Desktop) */}
              <path
                d="M0 120 Q 120 70 240 100 T 500 40"
                fill="none"
                stroke="#2563EB"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Line 2 - Cyan (Mobile) */}
              <path
                d="M0 160 Q 120 140 240 80 T 500 60"
                fill="none"
                stroke="#06B6D4"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex gap-4 text-[10px] font-bold mt-2">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-primary" /> Desktop</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-cyan-500" /> Mobile</span>
            </div>
          </div>
        </div>

        {/* CHART 4: DONUT/PIE SOURCE OF TRAFFIC */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Device Segments</h4>
            <p className="text-[10px] text-slate-400">Relational volume of browser layouts</p>
          </div>

          <div className="flex items-center justify-around gap-6 py-4">
            <svg viewBox="0 0 100 100" className="w-28 h-28 flex-shrink-0">
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#E2E8F0" strokeWidth="8" className="dark:stroke-slate-800" />
              {/* Desktop - 60% */}
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#2563EB" strokeWidth="8" strokeDasharray="219.91" strokeDashoffset="87.96" strokeLinecap="round" />
              {/* Mobile - 30% */}
              <circle cx="50" cy="50" r="35" fill="transparent" stroke="#06B6D4" strokeWidth="8" strokeDasharray="219.91" strokeDashoffset="153.94" strokeLinecap="round" />
            </svg>

            <div className="space-y-2 text-xs font-bold">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary" />
                <span>Desktop (60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-500" />
                <span>Mobile Phone (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <Tablet className="w-4 h-4 text-slate-400" />
                <span>Tablets (10%)</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
