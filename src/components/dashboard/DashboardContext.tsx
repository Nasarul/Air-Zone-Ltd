import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Page, SubPage, User, ToastMessage, SystemLog,
  HeroSettings, AboutSettings, PackagesSettings, VisaSettings, TeamSettings
} from '../../types/dashboard';

interface DashboardContextType {
  page: Page;
  setPage: (page: Page) => void;
  subPage: SubPage;
  setSubPage: (subPage: SubPage) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  language: string;
  setLanguage: (lang: string) => void;
  isAuthenticated: boolean;
  login: (email: string) => boolean;
  logout: () => void;
  currentUser: { name: string; email: string; avatar: string; role: string; bio: string; phone: string; address: string; cover: string } | null;
  updateProfile: (data: Partial<{ name: string; email: string; bio: string; phone: string; address: string; role: string }>) => void;
  users: User[];
  addUser: (user: Omit<User, 'id' | 'createdDate' | 'lastLogin'>) => void;
  updateUser: (id: string, updates: Partial<User>) => void;
  deleteUser: (id: string) => void;
  bulkDeleteUsers: (ids: string[]) => void;
  bulkUpdateUsersRole: (ids: string[], role: User['role']) => void;
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], title: string, message: string) => void;
  dismissToast: (id: string) => void;
  modal: { type: string; title: string; message: string; onConfirm?: () => void; data?: any } | null;
  openModal: (type: string, title: string, message: string, onConfirm?: () => void, data?: any) => void;
  closeModal: () => void;
  systemLogs: SystemLog[];
  addSystemLog: (level: SystemLog['level'], category: SystemLog['category'], message: string) => void;
  maintenanceMode: boolean;
  setMaintenanceMode: (val: boolean) => void;

  // CMS Section Settings
  heroSettings: HeroSettings;
  updateHeroSettings: (settings: Partial<HeroSettings>) => void;
  aboutSettings: AboutSettings;
  updateAboutSettings: (settings: Partial<AboutSettings>) => void;
  packagesSettings: PackagesSettings;
  updatePackagesSettings: (settings: Partial<PackagesSettings>) => void;
  visaSettings: VisaSettings;
  updateVisaSettings: (settings: Partial<VisaSettings>) => void;
  teamSettings: TeamSettings;
  updateTeamSettings: (settings: Partial<TeamSettings>) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: '1', name: 'Hasan Mahmud', email: 'hasan@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&fit=crop&q=80', role: 'Administrator', status: 'Active', lastLogin: '10 mins ago', createdDate: '2025-01-12' },
  { id: '2', name: 'Sarah Connor', email: 'sarah.c@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&fit=crop&q=80', role: 'Manager', status: 'Active', lastLogin: '2 hours ago', createdDate: '2025-02-15' },
  { id: '3', name: 'John Doe', email: 'john.doe@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&fit=crop&q=80', role: 'User', status: 'Pending', lastLogin: 'Never', createdDate: '2026-06-01' },
  { id: '4', name: 'David Miller', email: 'david.m@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&fit=crop&q=80', role: 'Billing', status: 'Suspended', lastLogin: '3 days ago', createdDate: '2025-08-20' },
  { id: '5', name: 'Emily Watson', email: 'emily.w@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&fit=crop&q=80', role: 'Support', status: 'Active', lastLogin: '1 day ago', createdDate: '2025-11-05' },
  { id: '6', name: 'Alex Rodriguez', email: 'alex.r@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80', role: 'User', status: 'Inactive', lastLogin: '1 week ago', createdDate: '2025-04-18' },
  { id: '7', name: 'Sophia Loren', email: 'sophia.l@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&fit=crop&q=80', role: 'Manager', status: 'Active', lastLogin: '5 mins ago', createdDate: '2025-09-14' },
  { id: '8', name: 'Michael Chang', email: 'michael.c@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&fit=crop&q=80', role: 'User', status: 'Pending', lastLogin: 'Never', createdDate: '2026-07-01' },
  { id: '9', name: 'Jessica Taylor', email: 'jessica.t@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&fit=crop&q=80', role: 'Billing', status: 'Active', lastLogin: '12 hours ago', createdDate: '2025-03-30' },
  { id: '10', name: 'Robert Downey', email: 'robert.d@airzoneltd.com', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=80&fit=crop&q=80', role: 'Administrator', status: 'Active', lastLogin: '1 hour ago', createdDate: '2025-06-25' }
];

const initialLogs: SystemLog[] = [
  { id: '1', timestamp: '2026-07-08 12:01:05', level: 'info', category: 'auth', message: 'User Hasan Mahmud logged in successfully' },
  { id: '2', timestamp: '2026-07-08 11:45:12', level: 'info', category: 'api', message: 'API Key v3_prod initialized successfully' },
  { id: '3', timestamp: '2026-07-08 10:30:00', level: 'warn', category: 'system', message: 'CPU usage exceeded 85% threshold' },
  { id: '4', timestamp: '2026-07-08 09:12:44', level: 'error', category: 'db', message: 'Connection timeout on backup database secondary' },
  { id: '5', timestamp: '2026-07-08 08:00:00', level: 'info', category: 'system', message: 'Daily backup procedure completed: backup_20260708.sql' }
];

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPageState] = useState<Page>('landing');
  const [subPage, setSubPage] = useState<SubPage>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [language, setLanguage] = useState<string>('English');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<DashboardContextType['currentUser']>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [modal, setModal] = useState<DashboardContextType['modal']>(null);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>(initialLogs);
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);

  // Sync page state scroll behavior
  const setPage = (newPage: Page) => {
    setPageState(newPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Sync dark mode class
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    showToast(
      'info',
      darkMode ? 'Light Theme Activated' : 'Dark Theme Activated',
      `Switched color palette to ${darkMode ? 'light mode' : 'dark mode'}.`
    );
  };

  const login = (email: string): boolean => {
    // Basic verification simulation
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    const name = foundUser ? foundUser.name : 'Administrator';
    const role = foundUser ? foundUser.role : 'Administrator';
    const avatar = foundUser ? foundUser.avatar : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80';

    setIsAuthenticated(true);
    setCurrentUser({
      name,
      email,
      avatar,
      role,
      bio: 'Lead Cloud Architect and Full-Stack Developer for Air Zone Ltd. Focused on building high performance SaaS dashboards.',
      phone: '+880 1700-000000',
      address: 'Dhaka, Bangladesh',
      cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    });
    setPage('dashboard');
    setSubPage('home');
    addSystemLog('info', 'auth', `User ${name} logged in from browser.`);
    showToast('success', 'Welcome Back!', `Signed in successfully as ${name}.`);
    return true;
  };

  const logout = () => {
    const userName = currentUser?.name || 'User';
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPage('login');
    addSystemLog('info', 'auth', `User ${userName} logged out.`);
    showToast('info', 'Signed Out', 'You have been securely signed out.');
  };

  const updateProfile = (data: Partial<{ name: string; email: string; bio: string; phone: string; address: string; role: string }>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
      // Update in active user listing if applicable
      setUsers(prev => prev.map(u => u.email === currentUser.email ? { ...u, name: data.name || u.name, email: data.email || u.email, role: (data.role as any) || u.role } : u));
      addSystemLog('info', 'system', 'User profile information updated');
      showToast('success', 'Profile Updated', 'Your profile details were saved successfully.');
    }
  };

  const addUser = (newUser: Omit<User, 'id' | 'createdDate' | 'lastLogin'>) => {
    const formattedUser: User = {
      ...newUser,
      id: (users.length + 1).toString(),
      createdDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never'
    };
    setUsers([formattedUser, ...users]);
    addSystemLog('info', 'db', `Created user record: ${newUser.name}`);
    showToast('success', 'User Created', `Successfully registered ${newUser.name} as ${newUser.role}.`);
  };

  const updateUser = (id: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    const target = users.find(u => u.id === id);
    addSystemLog('info', 'db', `Updated user details for ID: ${id}`);
    showToast('success', 'User Updated', `Successfully updated settings for ${target?.name || 'user'}.`);
  };

  const deleteUser = (id: string) => {
    const target = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    addSystemLog('warn', 'db', `Deleted user: ${target?.name} (ID: ${id})`);
    showToast('error', 'User Deleted', `${target?.name || 'User'} has been removed.`);
  };

  const bulkDeleteUsers = (ids: string[]) => {
    setUsers(prev => prev.filter(u => !ids.includes(u.id)));
    addSystemLog('warn', 'db', `Bulk deleted ${ids.length} user records.`);
    showToast('error', 'Bulk Delete Successful', `Removed ${ids.length} users successfully.`);
  };

  const bulkUpdateUsersRole = (ids: string[], role: User['role']) => {
    setUsers(prev => prev.map(u => ids.includes(u.id) ? { ...u, role } : u));
    addSystemLog('info', 'db', `Bulk updated ${ids.length} users role to ${role}.`);
    showToast('success', 'Bulk Update Successful', `Changed roles of ${ids.length} users to ${role}.`);
  };

  // Toast System
  const showToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Modal System
  const openModal = (type: string, title: string, message: string, onConfirm?: () => void, data?: any) => {
    setModal({ type, title, message, onConfirm, data });
  };

  const closeModal = () => {
    setModal(null);
  };

  // System Logs
  const addSystemLog = (level: SystemLog['level'], category: SystemLog['category'], message: string) => {
    const newLog: SystemLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      level,
      category,
      message
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  return (
    <DashboardContext.Provider
      value={{
        page,
        setPage,
        subPage,
        setSubPage,
        darkMode,
        toggleDarkMode,
        language,
        setLanguage,
        isAuthenticated,
        login,
        logout,
        currentUser,
        updateProfile,
        users,
        addUser,
        updateUser,
        deleteUser,
        bulkDeleteUsers,
        bulkUpdateUsersRole,
        toasts,
        showToast,
        dismissToast,
        modal,
        openModal,
        closeModal,
        systemLogs,
        addSystemLog,
        maintenanceMode,
        setMaintenanceMode
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
