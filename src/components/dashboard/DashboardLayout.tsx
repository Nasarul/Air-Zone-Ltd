import { useState } from 'react';
import { useDashboard } from './DashboardContext';
import { SubPage } from '../../types/dashboard';
import { 
  LayoutDashboard, Users, User, FileSpreadsheet, TrendingUp, Settings, 
  Bell, Lock, HelpCircle, LogOut, Menu, X, Search, Sun, Moon, 
  Globe, ChevronDown, AlertTriangle, Mail, Calendar, Sliders 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Sub-views
import HomeView from './pages/HomeView';
import UserManagement from './pages/UserManagement';
import ProfileView from './pages/ProfileView';
import ReportsView from './pages/ReportsView';
import AnalyticsView from './pages/AnalyticsView';
import SettingsView from './pages/SettingsView';
import SecurityView from './pages/SecurityView';
import NotificationsView from './pages/NotificationsView';
import { 
  HeroSectionSettings, AboutSectionSettings, PackagesSectionSettings, 
  VisaSectionSettings, TeamSectionSettings, FooterSectionSettings, ContactSectionSettings, AdSectionSettings,
  ServicesSectionSettings, FlightTicketingSectionSettings, WhyChooseUsSectionSettings, TestimonialsSectionSettings
} from './pages/SectionSettingsPages';

export default function DashboardLayout() {
  const { 
    subPage, setSubPage, darkMode, toggleDarkMode, currentUser, logout, 
    language, setLanguage, maintenanceMode, showToast 
  } = useDashboard();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsExpanded, setSectionsExpanded] = useState(false);

  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState<'profile' | 'notifications' | 'messages' | 'lang' | 'calendar' | null>(null);

  const toggleDropdown = (name: 'profile' | 'notifications' | 'messages' | 'lang' | 'calendar') => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeAllDropdowns = () => setActiveDropdown(null);

  if (!currentUser) return null;

  // Sidebar navigation mapping
  const navItems = [
    { id: 'home' as SubPage, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'users' as SubPage, label: 'Users', icon: <Users className="w-5 h-5" /> },
    { id: 'profile' as SubPage, label: 'Profile', icon: <User className="w-5 h-5" /> },
    { id: 'reports' as SubPage, label: 'Reports', icon: <FileSpreadsheet className="w-5 h-5" /> },
    { id: 'analytics' as SubPage, label: 'Analytics', icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'settings' as SubPage, label: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'notifications' as SubPage, label: 'Notifications', icon: <Bell className="w-5 h-5" />, badge: 2 },
    { id: 'security' as SubPage, label: 'Security', icon: <Lock className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-brandBg-light dark:bg-brandBg-darker text-slate-800 dark:text-slate-100 transition-colors duration-300 flex">
      
      {/* 1. Desktop Sidebar (Collapsible with Framer Motion) */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 76 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:flex flex-col border-r border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-900 sticky top-0 h-screen z-40 overflow-hidden flex-shrink-0 select-none"
      >
        {/* Brand Logo Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src="/logo.png" alt="Air Zone Logo" className="w-9 h-9 object-contain flex-shrink-0" />
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="leading-none"
              >
                <div className="text-slate-900 dark:text-white font-extrabold text-sm tracking-wider uppercase">Air Zone</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Control Panel</div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = subPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSubPage(item.id);
                  closeAllDropdowns();
                }}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/10 font-bold' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`transition-transform duration-200 group-hover:scale-105 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-primary dark:group-hover:text-slate-200'}`}>
                    {item.icon}
                  </div>
                  {!sidebarCollapsed && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs">
                      {item.label}
                    </motion.span>
                  )}
                </div>
                {!sidebarCollapsed && item.badge && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-black ${isActive ? 'bg-white text-primary' : 'bg-primary text-white'}`}>
                    {item.badge}
                  </span>
                )}
                {/* Active sidebar bar indicator */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-white rounded-r" />
                )}
              </button>
            );
          })}

          {/* Section Settings Accordion */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
            <button
              onClick={() => setSectionsExpanded(!sectionsExpanded)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                subPage.startsWith('sections-')
                  ? 'text-primary dark:text-primary-light font-bold bg-slate-50 dark:bg-slate-800/30'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-slate-400 group-hover:text-primary transition-colors flex-shrink-0" />
                {!sidebarCollapsed && (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs">
                    Section Settings
                  </motion.span>
                )}
              </div>
              {!sidebarCollapsed && (
                <ChevronDown className={`w-3.5 h-3.5 text-slate-450 transition-transform duration-200 ${sectionsExpanded ? 'rotate-180' : ''}`} />
              )}
            </button>
            {sectionsExpanded && !sidebarCollapsed && (
              <div className="pl-4 space-y-1 mt-1.5 border-l border-slate-100 dark:border-slate-800 ml-5">
                {[
                  { id: 'sections-hero' as SubPage, label: 'Hero Slides' },
                  { id: 'sections-services' as SubPage, label: 'Service Highlights' },
                  { id: 'sections-about' as SubPage, label: 'About Us' },
                  { id: 'sections-packages' as SubPage, label: 'Tour Packages' },
                  { id: 'sections-ticketing' as SubPage, label: 'Flight Ticketing' },
                  { id: 'sections-whychooseus' as SubPage, label: 'Why Choose Us' },
                  { id: 'sections-visa' as SubPage, label: 'Visa Services' },
                  { id: 'sections-team' as SubPage, label: 'Team Members' },
                  { id: 'sections-ad' as SubPage, label: 'Advertising Banner' },
                  { id: 'sections-testimonials' as SubPage, label: 'Client Testimonials' },
                  { id: 'sections-contact' as SubPage, label: 'Get In Touch' },
                  { id: 'sections-footer' as SubPage, label: 'Footer' },
                ].map(subItem => {
                  const isSubActive = subPage === subItem.id;
                  return (
                    <button
                      key={subItem.id}
                      onClick={() => setSubPage(subItem.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-[11px] transition-colors ${
                        isSubActive
                          ? 'text-primary dark:text-primary-light bg-primary/5 dark:bg-primary-light/5 font-bold'
                          : 'text-slate-450 hover:text-slate-700 dark:hover:text-slate-200 font-medium'
                      }`}
                    >
                      {subItem.label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Sidebar Footer Support / Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <button 
            onClick={() => showToast('info', 'Customer Help Desk', 'Support chat initialized...')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-xs font-semibold"
          >
            <HelpCircle className="w-5 h-5 text-slate-400" />
            {!sidebarCollapsed && <span>Help Support</span>}
          </button>
          
          <button
            onClick={() => {
              closeAllDropdowns();
              logout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors text-xs font-bold"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* 2. Main content viewport section */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 lg:pb-0">
        
        {/* Maintenance Banner */}
        {maintenanceMode && (
          <div className="bg-amber-500 text-slate-950 px-6 py-2 text-center text-xs font-bold flex items-center justify-center gap-2 z-50">
            <AlertTriangle className="w-4 h-4 text-slate-950 animate-bounce" />
            <span>Maintenance mode is active. Non-admin routes are temporarily interlocked.</span>
          </div>
        )}

        {/* Top Header navbar */}
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/50 dark:border-slate-850 h-16 flex items-center justify-between px-6 select-none">
          <div className="flex items-center gap-4">
            {/* Collapse toggle button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-2 text-slate-450 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <Menu className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-slate-455 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Simulated Search bar */}
            <div className="relative hidden md:block w-64">
              <input
                type="text"
                placeholder="Global searching..."
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 pl-9 text-xs focus:ring-1 focus:ring-primary focus:outline-none"
              />
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Right Header Navigation controls */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('lang')}
                className="p-2 text-slate-505 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl flex items-center gap-1.5 text-xs font-bold"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{language}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
              {activeDropdown === 'lang' && (
                <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 text-xs">
                  {['English', 'Arabic', 'Spanish', 'French'].map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setActiveDropdown(null);
                        showToast('info', 'Language Swapped', `Display language configured to ${lang}.`);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-semibold"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-505 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-500" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('notifications')}
                className="p-2 text-slate-505 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>
              {activeDropdown === 'notifications' && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden text-xs">
                  <div className="p-3.5 font-bold border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <span>Unread Alerts</span>
                    <span className="text-[10px] text-primary">2 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-60 overflow-y-auto">
                    <button 
                      onClick={() => { setSubPage('notifications'); setActiveDropdown(null); }}
                      className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="font-bold">Database backup completed</div>
                        <div className="text-[10px] text-slate-450 mt-1">Manual backup successfully copied to S3.</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => { setSubPage('notifications'); setActiveDropdown(null); }}
                      className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex gap-3"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      <div>
                        <div className="font-bold">New administrator added</div>
                        <div className="text-[10px] text-slate-450 mt-1">Robert Downey credentials created.</div>
                      </div>
                    </button>
                  </div>
                  <button 
                    onClick={() => { setSubPage('notifications'); setActiveDropdown(null); }}
                    className="w-full py-2 bg-slate-50 dark:bg-slate-800 text-center font-bold text-primary hover:underline border-t border-slate-100 dark:border-slate-800"
                  >
                    View All Notifications
                  </button>
                </div>
              )}
            </div>

            {/* Messages Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('messages')}
                className="p-2 text-slate-505 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl relative hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>
              {activeDropdown === 'messages' && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg overflow-hidden text-xs z-50">
                  <div className="p-3.5 font-bold border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                    <span>Inbox Messages</span>
                    <span className="text-[10px] text-primary">2 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-60 overflow-y-auto">
                    <button 
                      onClick={() => { showToast('info', 'Sarah Connor Chat', 'Opening conversation thread...'); setActiveDropdown(null); }}
                      className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex gap-3"
                    >
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&fit=crop&q=80" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold flex justify-between gap-4">
                          <span>Sarah Connor</span>
                          <span className="text-[9px] text-slate-400 font-normal">10m ago</span>
                        </div>
                        <div className="text-[10px] text-slate-550 dark:text-slate-450 mt-0.5">Is the tour package itinerary ready for customer review?</div>
                      </div>
                    </button>
                    <button 
                      onClick={() => { showToast('info', 'Emily Watson Chat', 'Opening conversation thread...'); setActiveDropdown(null); }}
                      className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 flex gap-3"
                    >
                      <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&fit=crop&q=80" className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <div className="font-bold flex justify-between gap-4">
                          <span>Emily Watson</span>
                          <span className="text-[9px] text-slate-400 font-normal">2h ago</span>
                        </div>
                        <div className="text-[10px] text-slate-550 dark:text-slate-450 mt-0.5">Confirmed payment for flight seat booking AZ-829.</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('calendar')}
                className="p-2 text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl hover:text-primary transition-colors"
              >
                <Calendar className="w-4 h-4" />
              </button>
              {activeDropdown === 'calendar' && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-4 text-xs z-50">
                  <div className="font-bold text-center border-b border-slate-100 dark:border-slate-800 pb-2 mb-2 flex justify-between items-center">
                    <span>July 2026</span>
                    <span className="text-[9px] text-slate-400 font-bold">UTC Time</span>
                  </div>
                  {/* Miniature Monthly Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1 text-center font-semibold text-[9px] text-slate-405 mb-1">
                    <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    <span className="text-slate-200 dark:text-slate-800">28</span>
                    <span className="text-slate-200 dark:text-slate-800">29</span>
                    <span className="text-slate-200 dark:text-slate-800">30</span>
                    <span>1</span><span>2</span><span>3</span><span>4</span>
                    <span>5</span><span>6</span><span>7</span>
                    <span className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center mx-auto">8</span>
                    <span>9</span><span>10</span><span>11</span>
                    <span className="w-5 h-5 border border-primary text-primary rounded-full flex items-center justify-center mx-auto" title="Hasan Onboarding">12</span>
                    <span>13</span><span>14</span>
                    <span className="w-5 h-5 border border-primary text-primary rounded-full flex items-center justify-center mx-auto" title="Security Review">15</span>
                    <span>16</span><span>17</span><span>18</span>
                    <span>19</span><span>20</span><span>21</span><span>22</span><span>23</span><span>24</span><span>25</span>
                    <span>26</span><span>27</span><span>28</span><span>29</span><span>30</span><span>31</span>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[9px] text-slate-450 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>July 8: Today (Current Cycle)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>July 12: Onboarding Setup</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('profile')}
                className="flex items-center gap-2 p-1 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 object-cover"
                />
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              {activeDropdown === 'profile' && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg p-1.5 text-xs overflow-hidden">
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1.5">
                    <div className="font-bold text-slate-900 dark:text-white leading-tight">{currentUser.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{currentUser.email}</div>
                  </div>
                  
                  <button
                    onClick={() => { setSubPage('profile'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-655 font-bold"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => { setSubPage('settings'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-655 font-bold"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={() => { setSubPage('security'); setActiveDropdown(null); }}
                    className="w-full text-left px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-slate-655 font-bold text-indigo-500"
                  >
                    Security Panel
                  </button>
                  
                  <div className="border-t border-slate-100 dark:border-slate-800/80 my-1.5" />
                  
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg font-bold text-red-500 flex items-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Core Sub-view Container */}
        <main className="flex-1 p-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={subPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              {subPage === 'home' && <HomeView />}
              {subPage === 'users' && <UserManagement />}
              {subPage === 'profile' && <ProfileView />}
              {subPage === 'reports' && <ReportsView />}
              {subPage === 'analytics' && <AnalyticsView />}
              {subPage === 'settings' && <SettingsView />}
              {subPage === 'security' && <SecurityView />}
              {subPage === 'notifications' && <NotificationsView />}
              {subPage === 'sections-hero' && <HeroSectionSettings />}
              {subPage === 'sections-services' && <ServicesSectionSettings />}
              {subPage === 'sections-about' && <AboutSectionSettings />}
              {subPage === 'sections-packages' && <PackagesSectionSettings />}
              {subPage === 'sections-ticketing' && <FlightTicketingSectionSettings />}
              {subPage === 'sections-whychooseus' && <WhyChooseUsSectionSettings />}
              {subPage === 'sections-visa' && <VisaSectionSettings />}
              {subPage === 'sections-team' && <TeamSectionSettings />}
              {subPage === 'sections-footer' && <FooterSectionSettings />}
              {subPage === 'sections-contact' && <ContactSectionSettings />}
              {subPage === 'sections-ad' && <AdSectionSettings />}
              {subPage === 'sections-testimonials' && <TestimonialsSectionSettings />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* 3. Mobile Bottom Navigation (Visible on small screens) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200/60 dark:border-slate-850 h-16 z-40 flex items-center justify-around px-4 select-none">
        <MobileNavButton active={subPage === 'home'} icon={<LayoutDashboard className="w-5 h-5" />} label="Home" onClick={() => setSubPage('home')} />
        <MobileNavButton active={subPage === 'users'} icon={<Users className="w-5 h-5" />} label="Users" onClick={() => setSubPage('users')} />
        <MobileNavButton active={subPage === 'profile'} icon={<User className="w-5 h-5" />} label="Profile" onClick={() => setSubPage('profile')} />
        <MobileNavButton active={subPage === 'analytics'} icon={<TrendingUp className="w-5 h-5" />} label="Charts" onClick={() => setSubPage('analytics')} />
        <MobileNavButton active={subPage === 'settings'} icon={<Settings className="w-5 h-5" />} label="Settings" onClick={() => setSubPage('settings')} />
      </nav>

      {/* 4. Mobile Left Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-xs"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute top-0 bottom-0 left-0 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="Air Zone Logo" className="w-8 h-8 object-contain flex-shrink-0" />
                    <span className="font-bold">Air Zone Admin</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map(item => {
                    const isActive = subPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSubPage(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold ${
                          isActive ? 'bg-primary text-white' : 'text-slate-505 hover:bg-slate-50'
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </nav>

                {/* Mobile Section Settings Accordion */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => setSectionsExpanded(!sectionsExpanded)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-bold ${
                      subPage.startsWith('sections-') ? 'text-primary' : 'text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sliders className="w-5 h-5" />
                      <span>Section Settings</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-205 ${sectionsExpanded ? 'rotate-180' : ''}`} />
                  </button>
                  {sectionsExpanded && (
                    <div className="pl-6 space-y-1 mt-1 border-l border-slate-100 dark:border-slate-800 ml-5 animate-fadeIn">
                      {[
                        { id: 'sections-hero' as SubPage, label: 'Hero Slides' },
                        { id: 'sections-services' as SubPage, label: 'Service Highlights' },
                        { id: 'sections-about' as SubPage, label: 'About Us' },
                        { id: 'sections-packages' as SubPage, label: 'Tour Packages' },
                        { id: 'sections-ticketing' as SubPage, label: 'Flight Ticketing' },
                        { id: 'sections-whychooseus' as SubPage, label: 'Why Choose Us' },
                        { id: 'sections-visa' as SubPage, label: 'Visa Services' },
                        { id: 'sections-team' as SubPage, label: 'Team Members' },
                        {id: 'sections-ad' as SubPage, label: 'Advertising Banner'},
                        {id: 'sections-testimonials' as SubPage, label: 'Client Testimonials'},
                        {id: 'sections-footer' as SubPage, label: 'Footer'},
                        {id: 'sections-contact' as SubPage, label: 'Get In Touch'},
                      ].map(subItem => {
                        const isSubActive = subPage === subItem.id;
                        return (
                          <button
                            key={subItem.id}
                            onClick={() => {
                              setSubPage(subItem.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-[10px] transition-colors font-bold ${
                              isSubActive
                                ? 'text-primary bg-primary/5 dark:bg-primary-light/5'
                                : 'text-slate-450 hover:text-slate-700 dark:hover:text-slate-200'
                            }`}
                          >
                            {subItem.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2.5 bg-red-50 text-red-500 dark:bg-red-950/20 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Mobile bottom navigation button helper
const MobileNavButton = ({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all ${
        active ? 'text-primary scale-105 font-bold' : 'text-slate-400 hover:text-slate-655 font-medium'
      }`}
    >
      {icon}
      <span className="text-[9px] mt-1 tracking-wide leading-none">{label}</span>
    </button>
  );
};
