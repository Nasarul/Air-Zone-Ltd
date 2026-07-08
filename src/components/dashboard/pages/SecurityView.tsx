import { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { Key, Smartphone, Table, AlertTriangle, LogOut, Check } from 'lucide-react';

export default function SecurityView() {
  const { showToast, openModal, logout } = useDashboard();
  
  // 2FA mock state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);

  // Form states
  const [curPass, setCurPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confPass, setConfPass] = useState('');

  // Active Sessions
  const [sessions, setSessions] = useState([
    { id: '1', device: 'Chrome Browser on Windows 11', location: 'Dhaka, Bangladesh', ip: '103.114.172.54', current: true },
    { id: '2', device: 'Safari Browser on iPhone 15 Pro', location: 'Chittagong, Bangladesh', ip: '202.4.118.89', current: false },
    { id: '3', device: 'Firefox on Macbook Pro', location: 'Sylhet, Bangladesh', ip: '37.111.200.5', current: false }
  ]);

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (!curPass || !newPass || !confPass) {
      showToast('error', 'Validation Error', 'All password parameters are required.');
      return;
    }
    if (newPass !== confPass) {
      showToast('error', 'Validation Error', 'New passwords do not match.');
      return;
    }
    if (newPass.length < 8) {
      showToast('error', 'Weak Password', 'New password must satisfy strength criteria (8+ chars).');
      return;
    }

    setCurPass('');
    setNewPass('');
    setConfPass('');
    showToast('success', 'Security Credentials Modified', 'Your login password has been changed.');
  };

  const handleToggle2FA = () => {
    if (twoFactorEnabled) {
      openModal(
        'confirmation',
        'Disable Two-Factor Authentication',
        'Deactivating 2FA reduces account security. Are you sure?',
        () => {
          setTwoFactorEnabled(false);
          setShowQrCode(false);
          showToast('info', '2FA Deactivated', 'Two-Factor Authentication is now disabled.');
        }
      );
    } else {
      setShowQrCode(true);
    }
  };

  const handleConfirm2FA = () => {
    setTwoFactorEnabled(true);
    setShowQrCode(false);
    showToast('success', '2FA Enabled', 'Authenticator app verified. Two-Factor Authentication is active.');
  };

  const handleRevokeSession = (id: string) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast('success', 'Session Revoked', 'The selected login session was terminated.');
  };

  const handleDeleteAccount = () => {
    openModal(
      'delete',
      'Permanently Delete Account',
      'WARNING: This will wipe your administrator credentials, activity history, and settings from our database. This is non-reversible.',
      () => {
        logout();
        showToast('error', 'Account Destroyed', 'Your account credentials have been removed.');
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Security Portal</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor login sessions, enforce Two-Factor authentication, and edit credential passwords.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Change Password & 2FA */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Change Password form */}
          <form onSubmit={handleChangePassword} className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3 flex items-center gap-2">
              <Key className="w-4 h-4 text-primary" />
              <span>Modify Password Settings</span>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Current Login Password</label>
                <input
                  type="password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={curPass}
                  onChange={e => setCurPass(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">New Password</label>
                  <input
                    type="password"
                    placeholder="Min 8 characters"
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Confirm New Password</label>
                  <input
                    type="password"
                    placeholder="Verify new password"
                    value={confPass}
                    onChange={e => setConfPass(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 flex justify-end">
              <button type="submit" className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl shadow-md">
                Update Password
              </button>
            </div>
          </form>

          {/* Two-Factor Authentication Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              <span>Two-Factor Authentication (2FA)</span>
            </h3>

            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/20 p-4 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-250">Authenticator Code Protocol</h4>
                <p className="text-[10px] text-slate-450 dark:text-slate-400 mt-1 max-w-md leading-relaxed">
                  Enforce an additional layer of security. Entering a generated verification code from Google Authenticator or Duo will be required on each sign-in attempt.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggle2FA}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  twoFactorEnabled 
                    ? 'bg-red-500/10 text-red-500 hover:bg-red-500/15' 
                    : 'bg-primary text-white hover:bg-primary-hover shadow-md'
                }`}
              >
                {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
              </button>
            </div>

            {/* QR Verification mock code popup */}
            {showQrCode && (
              <div className="p-4 border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-xl space-y-4 flex flex-col items-center">
                <div className="text-xs font-bold text-center">Scan QR Code with Authenticator App</div>
                <div className="w-32 h-32 bg-white p-2 border border-slate-200 rounded-lg flex items-center justify-center shadow-sm">
                  {/* Styled mock QR grid */}
                  <div className="grid grid-cols-5 gap-1.5 w-full h-full opacity-80">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map((i) => (
                      <div key={i} className={`rounded-sm ${i % 2 === 0 || i % 7 === 0 ? 'bg-slate-900' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-bold">Secret: AZ24-SM82-PK19-X295</div>
                
                <div className="flex gap-2">
                  <button onClick={handleConfirm2FA} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold">
                    Verify Code
                  </button>
                  <button onClick={() => setShowQrCode(false)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-xs font-bold">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Sessions & Danger Zone */}
        <div className="space-y-6">
          {/* Active Sessions list */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3 flex items-center gap-2">
              <Table className="w-4 h-4 text-primary" />
              <span>Active Login Sessions</span>
            </h3>

            <div className="space-y-3.5">
              {sessions.map(s => (
                <div key={s.id} className="p-3 border border-slate-100 dark:border-slate-800/80 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-205 flex items-center gap-1.5">
                    <span>{s.device}</span>
                    {s.current && (
                      <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase px-1 rounded flex items-center gap-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3px]" />
                        <span>Current</span>
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Location: {s.location}</div>
                  <div className="text-[10px] font-mono text-slate-400 mt-0.5">IP: {s.ip}</div>
                  
                  {!s.current && (
                    <button
                      onClick={() => handleRevokeSession(s.id)}
                      className="absolute right-3.5 top-3.5 p-1 text-slate-400 hover:text-red-500 transition-colors"
                      title="Terminate Session"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white dark:bg-slate-900 border border-red-500/20 dark:border-red-950/30 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-red-650 dark:text-red-400 border-b border-red-100 dark:border-red-900/20 pb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>Danger Zone</span>
            </h3>

            <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-normal">
              Deleting your account is irreversible. Once initiated, all datasets relating to bookings, user configurations, and key configurations are permanently purged.
            </p>

            <button
              onClick={handleDeleteAccount}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm shadow-red-600/15"
            >
              Terminate My Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
