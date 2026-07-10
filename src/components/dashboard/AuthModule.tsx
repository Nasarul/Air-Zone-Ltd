import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { Eye, EyeOff, ShieldAlert, ArrowLeft, Check, Chrome, Mail, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AuthModule() {
  const { page, setPage } = useDashboard();

  // Redirect to dashboard if logged in (in case context status is out of sync)
  if (page === 'dashboard') {
    return null;
  }

  return (
    <div className="min-h-screen bg-brandBg-light dark:bg-brandBg-darker text-slate-800 dark:text-slate-100 transition-colors duration-300 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center">
        <AnimatePresence mode="wait">
          {page === 'login' && <LoginPage key="login" />}
          {page === 'forgot-password' && <ForgotPasswordPage key="forgot" />}
          {page === 'reset-password' && <ResetPasswordPage key="reset" />}
          {page === 'verify-email' && <VerifyEmailPage key="verify" />}
        </AnimatePresence>
      </div>
      
      {/* Universal Footer */}
      <footer className="py-6 border-t border-slate-200/60 dark:border-slate-800/40 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="flex justify-center gap-6 mb-2">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <span>&bull;</span>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <span>&bull;</span>
          <button onClick={() => setPage('landing')} className="hover:text-primary transition-colors font-medium">Back to Air Zone Web</button>
        </div>
        <div>Version 2.4.0-prod &bull; © {new Date().getFullYear()} Air Zone Ltd.</div>
      </footer>
    </div>
  );
}

// ----------------------------------------------------
// 1. LOGIN PAGE (Split Screen)
// ----------------------------------------------------
function LoginPage() {
  const { login, setPage } = useDashboard();
  const [email, setEmail] = useState('admin@airzoneltd.com');
  const [password, setPassword] = useState('Admin123!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [capsLock, setCapsLock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const detectCapsLock = (e: React.KeyboardEvent) => {
    setCapsLock(e.getModifierState('CapsLock'));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Basic Validation checks
    if (!email) {
      setValidationError('Email address is required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (!password) {
      setValidationError('Password field cannot be empty.');
      return;
    }
    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setValidationError('Invalid email or password. Please check your credentials.');
      }
    } catch (e) {
      setValidationError('Authentication failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-[90vh] flex flex-col md:flex-row max-w-7xl mx-auto rounded-3xl overflow-hidden md:shadow-2xl md:border md:border-slate-200/50 md:dark:border-slate-800/50 m-4 bg-white dark:bg-slate-900"
    >
      {/* Left Column: Premium Brand Illustration */}
      <div className="w-full md:w-1/2 bg-slate-950 text-white p-12 flex flex-col justify-between relative overflow-hidden">
        {/* Background gradient graphics */}
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary via-slate-950 to-primary/20 opacity-90 z-0" />
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-secondary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-secondary/15 blur-[120px]" />

        {/* Company Header */}
        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.png" alt="Air Zone Logo" className="w-9 h-9 object-contain" />
          <div>
            <div className="font-extrabold text-sm tracking-wider uppercase leading-none">Air Zone</div>
            <div className="text-[10px] opacity-60 uppercase tracking-widest font-semibold">Enterprise Suite</div>
          </div>
        </div>

        {/* Dynamic Graphic */}
        <div className="relative z-10 my-auto py-12 flex flex-col items-center">
          {/* Plane Flying Abstract Animation */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="w-64 h-64 flex items-center justify-center bg-white/5 dark:bg-white/5 border border-white/10 rounded-full backdrop-blur-md shadow-2xl relative mb-8"
          >
            <div className="absolute inset-4 rounded-full border border-white/5 border-dashed animate-spin" style={{ animationDuration: '30s' }} />
            
            {/* Custom SVG Dashboard graphic representation */}
            <svg viewBox="0 0 100 100" className="w-36 h-36 text-primary-light">
              <path d="M20 70 A 35 35 0 0 1 80 70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
              <path d="M20 70 A 35 35 0 0 1 65 35" fill="none" stroke="#064368" strokeWidth="5" strokeLinecap="round" />
              <circle cx="50" cy="50" r="4" fill="white" />
              <line x1="50" y1="50" x2="68" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <path d="M30 65 L40 55 H60 L70 65" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <h2 className="text-3xl font-extrabold text-center tracking-tight text-white mb-3">
            Welcome Back
          </h2>
          <p className="text-slate-300 text-center max-w-sm text-sm leading-relaxed opacity-95">
            Sign in to access your dashboard. Manage bookings, client records, billing receipts, and analytics.
          </p>
        </div>

        {/* Small Tagline */}
        <div className="relative z-10 text-xs text-slate-400">
          Premium cloud operations platform. Trusted by thousands of agents globally.
        </div>
      </div>

      {/* Right Column: Beautiful Login Card */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center dark:bg-slate-900 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Account Login</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              Enter your credentials to gain access to your management console.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5" onKeyDown={detectCapsLock} onKeyUp={detectCapsLock}>
            {/* Error Message */}
            {validationError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-xs font-medium text-red-600 dark:text-red-400 flex gap-2 items-center"
              >
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </motion.div>
            )}

            {/* Caps Lock Warning */}
            {capsLock && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-2 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl text-xs font-semibold text-amber-700 dark:text-amber-400 flex gap-2 items-center"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Caps Lock is ON</span>
              </motion.div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="pass" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setPage('forgot-password')}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="pass"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                />
                <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20"
              />
              <label htmlFor="remember" className="ml-2 text-xs font-medium text-slate-600 dark:text-slate-400 select-none">
                Remember my login for 30 days
              </label>
            </div>

            {/* Login Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 rounded-xl shadow-md shadow-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <span>Sign In to Dashboard</span>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Continue With</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-800" />
            </div>

            {/* Social Logins */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    login('admin@airzoneltd.com');
                  }, 1000);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                <Chrome className="w-4 h-4" />
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    login('admin@airzoneltd.com');
                  }, 1000);
                }}
                className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
              >
                {/* Custom Microsoft Logo Grid representation */}
                <div className="grid grid-cols-2 gap-0.5 w-3.5 h-3.5">
                  <div className="bg-red-500 w-1.5 h-1.5" />
                  <div className="bg-green-500 w-1.5 h-1.5" />
                  <div className="bg-blue-500 w-1.5 h-1.5" />
                  <div className="bg-yellow-500 w-1.5 h-1.5" />
                </div>
                <span>Microsoft</span>
              </button>
            </div>
            
            {/* Quick Demo Assist */}
            <div className="mt-4 p-3 bg-primary/5 dark:bg-primary/10 border border-primary/10 rounded-xl text-center">
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Demo access: <strong className="text-primary">admin@airzoneltd.com</strong> / <strong className="text-primary">Admin123!</strong>
              </p>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

// ----------------------------------------------------
// 2. FORGOT PASSWORD PAGE
// ----------------------------------------------------
function ForgotPasswordPage() {
  const { setPage, showToast } = useDashboard();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide an email address.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please provide a valid email format.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      showToast('success', 'Verification Link Sent', 'Password reset instructions have been emailed.');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl"
    >
      <button
        onClick={() => setPage('login')}
        className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Login</span>
      </button>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="forgot-step-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            <div className="mb-6">
              <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl flex items-center justify-center mb-4">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Recover Password</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Enter your email address below. If an account is associated with this address, we will send a secure link to reset your credentials.
              </p>
            </div>

            {/* Stepper indicator */}
            <div className="flex items-center gap-2 mb-6 text-[10px] font-bold text-slate-400">
              <span className="text-primary border-b-2 border-primary pb-0.5">1. Enter Email</span>
              <span className="opacity-40">&rarr;</span>
              <span className="opacity-40">2. Verify Inbox</span>
              <span className="opacity-40">&rarr;</span>
              <span className="opacity-40">3. Change Pass</span>
            </div>

            <form onSubmit={handleSendLink} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="agent@airzoneltd.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Send Reset Link</span>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="forgot-step-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center"
          >
            {/* SVG Checkmark Pulse */}
            <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="bg-emerald-500 text-white rounded-full p-2.5 shadow-lg shadow-emerald-500/20"
              >
                <Check className="w-6 h-6 stroke-[3px]" />
              </motion.div>
            </div>

            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">Check Your Email</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              A password reset link has been sent to <strong className="text-slate-800 dark:text-slate-200">{email}</strong>. The link expires in 30 minutes.
            </p>

            <div className="space-y-3">
              <button
                onClick={() => setPage('reset-password')}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm transition-colors"
              >
                Simulate Reset Password Redirect
              </button>
              <button
                onClick={() => setStep(1)}
                className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
              >
                Resend Link
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ----------------------------------------------------
// 3. RESET PASSWORD PAGE
// ----------------------------------------------------
function ResetPasswordPage() {
  const { setPage, showToast } = useDashboard();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password requirements state
  const reqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const strength = Object.values(reqs).filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (strength < 5) {
      setError('Please satisfy all password security requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      showToast('success', 'Password Updated', 'Your security password was successfully modified.');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl"
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="reset-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Create New Password</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                Set a highly secure password that you do not use on other platforms.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-xs font-medium text-red-600 dark:text-red-400">
                  {error}
                </div>
              )}

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <Key className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                </div>
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-2 p-4 bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/50 rounded-xl">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-slate-500 dark:text-slate-400">Password Strength:</span>
                  <span
                    className={
                      strength <= 2
                        ? 'text-red-500'
                        : strength <= 4
                        ? 'text-amber-500'
                        : 'text-emerald-500'
                    }
                  >
                    {strength <= 2 ? 'Weak' : strength <= 4 ? 'Good' : 'Very Strong'}
                  </span>
                </div>

                {/* Strength segments */}
                <div className="grid grid-cols-5 gap-1.5 h-1.5">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <div
                      key={idx}
                      className={`h-full rounded-full transition-colors duration-300 ${
                        idx <= strength
                          ? strength <= 2
                            ? 'bg-red-500'
                            : strength <= 4
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-slate-200 dark:bg-slate-800'
                      }`}
                    />
                  ))}
                </div>

                {/* Requirement list */}
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-2 text-[10px] font-medium text-slate-400 dark:text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${reqs.length ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>8+ characters</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${reqs.upper ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${reqs.lower ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${reqs.number ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>One number</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${reqs.special ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>Special character</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <span>Reset Password</span>
                )}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="reset-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="bg-emerald-500 text-white rounded-full p-2.5 shadow-lg shadow-emerald-500/20">
                <Check className="w-6 h-6 stroke-[3px]" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">Password Reset</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
              Your credentials were changed successfully. You can now use the new password to access your agent dashboard portal.
            </p>

            <button
              onClick={() => setPage('login')}
              className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Go to Login
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ----------------------------------------------------
// 4. EMAIL VERIFICATION PAGE
// ----------------------------------------------------
function VerifyEmailPage() {
  const { setPage, showToast } = useDashboard();
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('success', 'Email Dispatched', 'A new verification message has been sent to your registered address.');
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="w-full max-w-md mx-4 p-8 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl shadow-xl text-center"
    >
      <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
        <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 animate-bounce">
          <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-2">Verify Your Email</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
        An activation request has been forwarded to your email address. Please click on the contained link to activate your system profile.
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleResend}
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold py-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Resend Activation Email</span>
          )}
        </button>
        <button
          onClick={() => setPage('login')}
          className="w-full bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors"
        >
          Back to Login
        </button>
      </div>
    </motion.div>
  );
}
