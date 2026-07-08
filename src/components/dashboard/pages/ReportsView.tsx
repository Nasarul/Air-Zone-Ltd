import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { 
  FileText, Printer, Filter, FileSpreadsheet, 
  ArrowUpRight, ArrowDownRight, CheckCircle2
} from 'lucide-react';

export default function ReportsView() {
  const { showToast } = useDashboard();
  
  // Settings forms
  const [reportType, setReportType] = useState('financial');
  const [dateRange, setDateRange] = useState('7d');

  const handleExport = (format: string) => {
    showToast('info', 'Compiling PDF/Sheet data', `Formatting report index buffer into ${format} file...`);
    setTimeout(() => {
      showToast('success', 'Document Dispatched', `Successfully exported ${reportType}_report_${dateRange}.${format.toLowerCase()}`);
    }, 1500);
  };

  // Mock report table data
  const reportsData = [
    { id: '1', date: '2026-07-08', type: 'Sales Subscription', user: 'Hasan Mahmud', status: 'Completed', amount: '$499.00' },
    { id: '2', date: '2026-07-07', type: 'Flight Booking (Air Zone)', user: 'Sarah Connor', status: 'Completed', amount: '$1,250.00' },
    { id: '3', date: '2026-07-06', type: 'Visa Processing (Fee)', user: 'Robert Downey', status: 'Pending', amount: '$120.00' },
    { id: '4', date: '2026-07-05', type: 'Sales Subscription', user: 'Sophia Loren', status: 'Completed', amount: '$299.00' },
    { id: '5', date: '2026-07-05', type: 'Flight Booking Refund', user: 'Emily Watson', status: 'Refunded', amount: '-$350.00' },
  ];

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Reports</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Build custom reports, filter parameters, and compile print-ready documentation.
          </p>
        </div>
        <div className="flex gap-2 select-none">
          <button onClick={() => window.print()} className="p-2.5 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center">
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Reports Filter Form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Filter className="w-4 h-4 text-primary" />
          <span>Report Configuration parameters</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Select Report Core</label>
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="financial">Financial Statements</option>
              <option value="audits">Audit Trail Log Activity</option>
              <option value="users">User Access Metrics</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-500">Date Range Span</label>
            <select
              value={dateRange}
              onChange={e => setDateRange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="1y">Last Calendar Year</option>
            </select>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => handleExport('PDF')}
              className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Compile PDF</span>
            </button>
            <button
              onClick={() => handleExport('XLSX')}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-emerald-500/10 flex items-center justify-center gap-1.5"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Excel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-5 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Bookings Output</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">$1,828.00</h3>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.3% relative to last cycle</span>
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-5 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Completed Transactions</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">4 Transactions</h3>
          <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-0.5 mt-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% gateway success rate</span>
          </span>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-5 rounded-2xl shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Refunds Processed</span>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1.5">$350.00</h3>
          <span className="text-[10px] text-red-500 font-bold flex items-center gap-0.5 mt-1">
            <ArrowDownRight className="w-3 h-3" />
            <span>-2.4% relative to last cycle</span>
          </span>
        </div>
      </div>

      {/* Compiled Report Preview table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Generated Report Output Preview</h4>
          <p className="text-[10px] text-slate-400 mt-0.5">Previews are locked to the first 5 compiled rows.</p>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-slate-150 dark:divide-slate-800/80 text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-900/60 font-bold text-slate-450 uppercase tracking-wider text-[9px]">
              <tr>
                <th className="px-6 py-3">Reference Date</th>
                <th className="px-6 py-3">Operation Type</th>
                <th className="px-6 py-3">Authorized Account</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-350">
              {reportsData.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                  <td className="px-6 py-3.5 font-semibold text-slate-400">{row.date}</td>
                  <td className="px-6 py-3.5 font-bold text-slate-900 dark:text-white">{row.type}</td>
                  <td className="px-6 py-3.5 font-medium">{row.user}</td>
                  <td className="px-6 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      row.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                      row.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className={`px-6 py-3.5 text-right font-black ${row.amount.startsWith('-') ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                    {row.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
