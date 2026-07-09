import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { 
  Building2, Mail, ShieldCheck, Database, Terminal, Sliders, Save, 
  Plus, Copy, CheckCircle, ShieldAlert, RefreshCw 
} from 'lucide-react';

export default function SettingsView() {
  const { systemLogs, addSystemLog, showToast, maintenanceMode, setMaintenanceMode } = useDashboard();
  const [activeTab, setActiveTab] = useState<'general' | 'smtp' | 'api' | 'backup' | 'logs' | 'maintenance'>('general');

  // Logo / Favicon upload states
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [faviconSrc, setFaviconSrc] = useState<string | null>(null);

  // SMTP form states
  const [smtpServer, setSmtpServer] = useState('smtp.mailgun.org');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUser, setSmtpUser] = useState('postmaster@mg.airzoneltd.com');
  const [smtpPass, setSmtpPass] = useState('•••••••••••••••••••••••••••••');

  // API Key mock states
  const [apiKeys, setApiKeys] = useState([
    { id: '1', name: 'Production Checkout API', prefix: 'az_live_k8a9x...', created: '2025-05-10', active: true },
    { id: '2', name: 'Mobile Application Sync', prefix: 'az_live_q3j8c...', created: '2026-01-22', active: true },
    { id: '3', name: 'Sandbox Local Dev Key', prefix: 'az_test_d2n4x...', created: '2026-07-01', active: false }
  ]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select a logo under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogoSrc(event.target?.result as string);
        showToast('success', 'Logo Uploaded', 'Successfully updated portal logo preview.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        showToast('error', 'File Too Large', 'Please select a favicon under 500KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setFaviconSrc(event.target?.result as string);
        showToast('success', 'Favicon Uploaded', 'Successfully updated favicon preview.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyKey = (prefix: string) => {
    navigator.clipboard.writeText(prefix + 'SECRET_SECRET_STUB');
    showToast('success', 'Key Copied', 'Token credentials copied to keyboard buffer.');
  };

  const handleToggleKey = (id: string) => {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, active: !k.active } : k));
    showToast('info', 'API Key Status Changed', 'Access permissions altered for target token.');
  };

  const handleCreateKey = () => {
    const name = prompt('Enter a name for this API token:');
    if (!name) return;

    const newKey = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      prefix: 'az_live_' + Math.random().toString(36).substring(2, 8) + '...',
      created: new Date().toISOString().split('T')[0],
      active: true
    };
    setApiKeys([...apiKeys, newKey]);
    addSystemLog('info', 'api', `Created new API credential: ${name}`);
    showToast('success', 'API Key Generated', 'Store it securely. This value won\'t be visible again.');
  };

  // Maintenance Toggle Helper
  const handleMaintenanceToggle = () => {
    const nextVal = !maintenanceMode;
    setMaintenanceMode(nextVal);
    addSystemLog(
      nextVal ? 'warn' : 'info',
      'system',
      `Maintenance mode toggled: ${nextVal ? 'ENABLED' : 'DISABLED'}`
    );
    showToast(
      nextVal ? 'warning' : 'success',
      nextVal ? 'Maintenance Mode Enabled' : 'Maintenance Mode Disabled',
      nextVal 
        ? 'Public users will now encounter a 503 Service Unavailable notice.'
        : 'The core dashboard application is again available for public booking traffic.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">System Settings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure mail gateways, backup intervals, API hooks, and site maintenance flags.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left tabs selector */}
        <div className="w-full lg:w-64 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 select-none">
          <TabButton active={activeTab === 'general'} icon={<Building2 className="w-4 h-4" />} label="General Info" onClick={() => setActiveTab('general')} />
          <TabButton active={activeTab === 'smtp'} icon={<Mail className="w-4 h-4" />} label="SMTP Gateway" onClick={() => setActiveTab('smtp')} />
          <TabButton active={activeTab === 'api'} icon={<ShieldCheck className="w-4 h-4" />} label="API Credentials" onClick={() => setActiveTab('api')} />
          <TabButton active={activeTab === 'backup'} icon={<Database className="w-4 h-4" />} label="Backups & Data" onClick={() => setActiveTab('backup')} />
          <TabButton active={activeTab === 'logs'} icon={<Terminal className="w-4 h-4" />} label="System Logs" onClick={() => setActiveTab('logs')} />
          <TabButton active={activeTab === 'maintenance'} icon={<Sliders className="w-4 h-4" />} label="Maintenance Mode" onClick={() => setActiveTab('maintenance')} />
        </div>

        {/* Right content panel */}
        <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl p-6 shadow-sm w-full">
          {/* TAB: GENERAL */}
          {activeTab === 'general' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">General Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Company Legal Name</label>
                  <input type="text" defaultValue="Air Zone Ltd." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Support Email Address</label>
                  <input type="email" defaultValue="support@airzoneltd.com" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">System Timezone</label>
                  <select defaultValue="GMT+6" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-300">
                    <option value="GMT-5">GMT-5 (EST - New York)</option>
                    <option value="GMT+0">GMT+0 (UTC - London)</option>
                    <option value="GMT+6">GMT+6 (BST - Dhaka)</option>
                    <option value="GMT+9">GMT+9 (JST - Tokyo)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Display Currency</label>
                  <select defaultValue="USD" className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-300">
                    <option value="USD">USD ($)</option>
                    <option value="BDT">BDT (৳)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              {/* Logo / Favicon Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Upload Portal Logo</label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                    {logoSrc ? (
                      <img src={logoSrc} alt="Portal Logo" className="w-10 h-10 object-contain rounded" />
                    ) : (
                      <img src="/logo.png" alt="Portal Logo" className="w-10 h-10 object-contain" />
                    )}
                    <label className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                      <span>Select Image (PNG, Max 2MB)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Upload Favicon Node</label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                    {faviconSrc ? (
                      <img src={faviconSrc} alt="Favicon" className="w-6 h-6 object-contain rounded" />
                    ) : (
                      <div className="w-6 h-6 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded flex items-center justify-center text-[10px] font-bold">A</div>
                    )}
                    <label className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                      <span>Select Icon (ICO/PNG, 16x16)</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFaviconUpload} />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button type="button" onClick={() => showToast('success', 'Settings Saved', 'General profile settings have been updated.')} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: SMTP */}
          {activeTab === 'smtp' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">SMTP Mail Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">Mail Gateway Server</label>
                  <input type="text" value={smtpServer} onChange={e => setSmtpServer(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">SMTP Port Node</label>
                  <input type="text" value={smtpPort} onChange={e => setSmtpPort(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">SMTP Authenticated User</label>
                  <input type="text" value={smtpUser} onChange={e => setSmtpUser(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400">SMTP Account Password</label>
                  <input type="password" value={smtpPass} onChange={e => setSmtpPass(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none" />
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => showToast('info', 'Triggering Handshake', 'Delivering mock diagnostic mail to postmaster...')} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 rounded-xl">
                  Test Connection
                </button>
                <button type="button" onClick={() => showToast('success', 'SMTP Stored', 'SMTP mail server properties modified.')} className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Mail Gateway</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: API */}
          {activeTab === 'api' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">API Access Tokens</h3>
                <button onClick={handleCreateKey} className="px-3 py-1.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-lg flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Generate Key</span>
                </button>
              </div>

              <div className="space-y-3.5">
                {apiKeys.map(k => (
                  <div key={k.id} className="p-4 border border-slate-200/80 dark:border-slate-800/60 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <span>{k.name}</span>
                        <span className={`inline-flex px-1.5 py-0.5 rounded text-[8px] font-black uppercase ${k.active ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-200 dark:bg-slate-800 text-slate-400'}`}>
                          {k.active ? 'Active' : 'Disabled'}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-450 dark:text-slate-505 mt-1.5">Prefix: {k.prefix}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Generated on: {k.created}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleCopyKey(k.prefix)} className="p-1.5 hover:bg-white dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded border border-transparent hover:border-slate-200 dark:hover:border-slate-700" title="Copy Key">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleToggleKey(k.id)} className={`px-2 py-1 text-[10px] font-bold rounded ${k.active ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                        {k.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: BACKUP */}
          {activeTab === 'backup' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">System Backup Operations</h3>
              
              <div className="p-4 bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-xl flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">Automatic Cloud Backups</h4>
                  <p className="text-[10px] text-slate-500 dark:text-slate-450 mt-1 leading-relaxed">
                    Database snapshot captures occur daily at 02:00 BST. Standard storage backup files reside inside secondary offsite AWS S3 shards.
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => {
                  showToast('info', 'Initializing Dump', 'Compressing application relational tables...');
                  setTimeout(() => {
                    showToast('success', 'Backup Export Ready', 'db_backup_manual_v3.sql (24.8 MB) created.');
                  }, 2000);
                }} className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md">
                  <Database className="w-4 h-4" />
                  <span>Backup Now</span>
                </button>

                <button type="button" onClick={() => {
                  showToast('info', 'Verifying Integrity', 'Running checksum test on standard archives...');
                }} className="px-4 py-2.5 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-800 rounded-xl">
                  Test Archives
                </button>
              </div>

              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-350">Recent Backups Log</h4>
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-50 dark:bg-slate-900 px-4 py-2 font-bold text-slate-400 grid grid-cols-3">
                    <span>Archive Name</span>
                    <span>Created Date</span>
                    <span className="text-right">Actions</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    <div className="px-4 py-2.5 grid grid-cols-3 items-center">
                      <span className="font-mono text-[10px]">backup_20260708.sql</span>
                      <span className="text-slate-400">Today, 02:00</span>
                      <button onClick={() => showToast('success', 'Download', 'Fetching backup file...')} className="text-right text-primary hover:underline font-bold">Download</button>
                    </div>
                    <div className="px-4 py-2.5 grid grid-cols-3 items-center">
                      <span className="font-mono text-[10px]">backup_20260707.sql</span>
                      <span className="text-slate-400">Yesterday, 02:00</span>
                      <button onClick={() => showToast('success', 'Download', 'Fetching backup file...')} className="text-right text-primary hover:underline font-bold">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SYSTEM LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Audit Log Engine</h3>
                <button onClick={() => showToast('info', 'Refreshing logs', 'Reading stderr/stdout streams...')} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800">
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-[10px] leading-relaxed max-h-[300px] overflow-y-auto space-y-1.5 shadow-inner">
                {systemLogs.map(l => (
                  <div key={l.id} className="flex gap-2">
                    <span className="text-slate-500 flex-shrink-0">{l.timestamp}</span>
                    <span className={`flex-shrink-0 font-bold uppercase ${
                      l.level === 'error' ? 'text-red-500' :
                      l.level === 'warn' ? 'text-amber-500' :
                      'text-primary-light'
                    }`}>[{l.level}]</span>
                    <span className="text-slate-400">({l.category})</span>
                    <span className="text-slate-100">{l.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: MAINTENANCE MODE */}
          {activeTab === 'maintenance' && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3">Maintenance Window</h3>
              
              <div className={`p-4 rounded-xl border flex items-start gap-4 ${
                maintenanceMode 
                  ? 'bg-amber-500/10 border-amber-500/25 text-amber-900 dark:text-amber-400' 
                  : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}>
                {maintenanceMode ? (
                  <ShieldAlert className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4 className="text-xs font-bold">
                    {maintenanceMode ? 'Maintenance state is active' : 'All systems operating normally'}
                  </h4>
                  <p className="text-[10px] opacity-80 mt-1 leading-relaxed">
                    Turning on maintenance mode locks non-administrative API endpoints and serves a custom splash loader screen to client browsers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 py-4 bg-slate-50/50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200/55 dark:border-slate-850">
                {/* Switch Slider */}
                <button
                  type="button"
                  onClick={handleMaintenanceToggle}
                  className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${maintenanceMode ? 'bg-amber-500' : 'bg-slate-350 dark:bg-slate-700'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${maintenanceMode ? 'right-1' : 'left-1'}`} />
                </button>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-250">System Interlocking Mode</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-550 mt-0.5">Toggle maintenance page redirect triggers</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Sub Tab button helper
const TabButton = ({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all flex-shrink-0 ${
        active 
          ? 'bg-primary text-white shadow-md shadow-primary/10' 
          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
