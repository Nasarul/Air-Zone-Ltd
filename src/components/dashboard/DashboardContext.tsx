import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Page, SubPage, User, ToastMessage, SystemLog,
  HeroSettings, AboutSettings, PackagesSettings, VisaSettings, TeamSettings, FooterSettings
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
  footerSettings: FooterSettings;
  updateFooterSettings: (settings: Partial<FooterSettings>) => void;
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

const defaultHeroSettings: HeroSettings = {
  isEnabled: true,
  slides: [
    {
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Explore the World',
      subtitle: 'with Air Zone Ltd.',
      desc: 'Premium tour packages, domestic & international flight ticketing, and seamless visa assistance — all in one place.',
      tagline: 'YOUR GATEWAY TO ADVENTURE',
    },
    {
      image: 'https://images.pexels.com/photos/46148/pexels-photo-46148.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Best Flight Deals',
      subtitle: 'Domestic & International',
      desc: 'Fly to your dream destination with premium airlines. Quick booking, flexible dates, and 24/7 ticketing support.',
      tagline: 'ACCUMULATED MILES & BEST FARES',
    },
    {
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Hassle-Free',
      subtitle: 'Visa Processing',
      desc: 'Fast, reliable visa processing for tourist, business, and student visas with expert documentation support.',
      tagline: 'FAST & SECURE APPLICATION',
    },
    {
      image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Unforgettable Journeys',
      subtitle: 'Tailored Just For You',
      desc: 'From hot air balloons to scenic mountain hikes, let us design the perfect itinerary for your dream vacation.',
      tagline: 'MEMORABLE EXPERIENCES',
    },
    {
      image: 'https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Luxury Resorts',
      subtitle: 'At Unbeatable Prices',
      desc: 'Get exclusive discounts on premium resorts, hotels, and beachside villas worldwide. Book today.',
      tagline: 'PREMIUM ACCOMMODATION',
    },
    {
      image: 'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Explore Heritage',
      subtitle: 'Cultural & Historic Tours',
      desc: 'Discover rich histories, architectures, and local cultures with our expert-guided heritage tour packages.',
      tagline: 'CULTURAL EXPERIENCE',
    },
  ]
};

const defaultAboutSettings: AboutSettings = {
  isEnabled: true,
  badge: 'Who We Are',
  title: 'Your Trusted Travel Partner Since 2009',
  desc1: 'Air Zone Ltd. is a leading travel agency based in Dhaka, Bangladesh, specializing in international and domestic tour packages, air ticketing, and comprehensive visa assistance services.',
  desc2: 'We are committed to delivering exceptional travel experiences with personalized service, competitive pricing, and round-the-clock support — ensuring every journey is smooth, memorable, and stress-free.',
  points: [
    'Licensed by Civil Aviation Authority, Bangladesh',
    'IATA Accredited Travel Agency',
    'Over 15 years of trusted travel experience',
    'Partnerships with 200+ global hotels & airlines',
    'Dedicated Air Ticketing & Support division',
    'Transparent pricing with zero hidden charges',
  ],
  image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800',
  yearsExperience: '15+',
  yearsLabel: 'Years of Excellence',
};

const defaultPackagesSettings: PackagesSettings = {
  isEnabled: true,
  title: 'Handpicked Tour Packages',
  subtitle: 'Find your next adventure with our curated domestic and international travel deals.',
  items: [
    {
      id: 'bali-honeymoon',
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '4D/3N Bali Honeymoon Bliss',
      duration: '4 Days 3 Nights',
      durationDays: 4,
      location: 'Bali, Indonesia',
      price: '৳98,000',
      rating: 4.9,
      categories: ['international', 'honeymoon'],
      desc: 'Unwind in a luxurious private pool villa. Enjoy romantic candlelit dinners on the beach, scenic temple tours, and private driver services in tropical paradise.',
      inclusions: ['4-Star Private Pool Villa', 'Daily Breakfast & 1 Romantic Dinner', 'Private Airport Transfers', 'Dedicated Driver Guide', 'All Entrance Tickets']
    },
    {
      id: 'dubai-highlights',
      image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '6D/5N Dubai City Highlights',
      duration: '6 Days 5 Nights',
      durationDays: 6,
      location: 'Dubai, UAE',
      price: '৳1,25,000',
      rating: 4.8,
      categories: ['international'],
      desc: 'Experience the glitz and glamour of Dubai. Visit the iconic Burj Khalifa, go on a thrilling desert safari, and explore traditional gold souks.',
      inclusions: ['4-Star Hotel Accommodation', 'Daily Breakfast & 2 Dinners', 'Desert Safari with BBQ', 'Burj Khalifa Entrance Ticket', 'All Transfers']
    },
    {
      id: 'coxs-bazar',
      image: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '5D/4N Cox\'s Bazar Escape',
      duration: '5 Days 4 Nights',
      durationDays: 5,
      location: "Cox's Bazar, BD",
      price: '৳28,500',
      rating: 4.7,
      categories: ['domestic'],
      desc: 'Relax on the world\'s longest natural sandy beach. Enjoy fresh seafood, tour Himchori waterfalls, and drive down the breathtaking Marine Drive road.',
      inclusions: ['Premium Beach Resort Stay', 'Daily Buffet Breakfast', 'Private sightseeing vehicle', 'Moheshkhali Boat Tickets', 'Tour Coordinator Support']
    },
    {
      id: 'maldives-villa',
      image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '4D/3N Maldives Water Villa',
      duration: '4 Days 3 Nights',
      durationDays: 4,
      location: 'Maldives',
      price: '৳1,25,000',
      rating: 5.0,
      categories: ['international', 'honeymoon'],
      desc: 'Stay in a premium overwater villa with direct ocean access. Swim with sea turtles, indulge in gourmet meals, and experience ultimate luxury.',
      inclusions: ['Luxury Overwater Villa', 'Full Board (All Meals Included)', 'Round-trip Speedboat Transfers', 'Complimentary Snorkeling Gear', 'Sunset Dolphin Cruise']
    },
    {
      id: 'sylhet-retreat',
      image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '3D/2N Sylhet Tea Garden Retreat',
      duration: '3 Days 2 Nights',
      durationDays: 3,
      location: 'Sylhet, Bangladesh',
      price: '৳18,500',
      rating: 4.6,
      categories: ['domestic'],
      desc: 'Immerse yourself in green tea estates. Visit Ratargul Swamp Forest, Jaflong river beds, and stay in a beautiful eco-resort.',
      inclusions: ['Eco-Resort Stay', 'Daily Breakfast & Lunch', 'Boat Ride Fees', 'Private Sightseeing Car', 'Local English Speaking Guide']
    },
    {
      id: 'europe-tour',
      image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '12D/11N Iconic Europe Tour',
      duration: '12 Days 11 Nights',
      durationDays: 12,
      location: 'Central & Western Europe',
      price: '৳3,60,000',
      rating: 4.9,
      categories: ['international'],
      desc: 'Cover the highlights of France, Switzerland, and Italy. Visit Eiffel Tower in Paris, Mt. Titlis in Swiss Alps, and the Colosseum in Rome.',
      inclusions: ['3 & 4-Star Hotels with Breakfast', 'Schengen Visa Assistance', 'Paris to Switzerland High-Speed Train', 'Swiss Alps Cable Car Tickets', 'Rome Guided Entry Passes']
    }
  ]
};

const defaultVisaSettings: VisaSettings = {
  isEnabled: true,
  title: 'Visa Services & Assistance',
  subtitle: 'Apply for your visa with high approval rates. We offer expert processing for major destinations.',
  items: [
    { id: '1', country: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png', days: '12–18 working days', category: 'Tourist / Business', price: '৳18,500', iconName: 'FileText' },
    { id: '2', country: 'Saudi Arabia', flag: 'https://flagcdn.com/w80/sa.png', days: '5–8 working days', category: 'Tourist / Visit', price: '৳14,500', iconName: 'FileCheck2' },
    { id: '3', country: 'Japan', flag: 'https://flagcdn.com/w80/jp.png', days: '8–12 working days', category: 'Tourist / Business', price: '৳7,500', iconName: 'Send' },
    { id: '4', country: 'Singapore', flag: 'https://flagcdn.com/w80/sg.png', days: '5–7 working days', category: 'Tourist / Business', price: '৳6,500', iconName: 'FileText' },
    { id: '5', country: 'United Arab Emirates', flag: 'https://flagcdn.com/w80/ae.png', days: '4–6 working days', category: 'Visit / Transit', price: '৳15,500', iconName: 'FileCheck2' },
    { id: '6', country: 'Malaysia', flag: 'https://flagcdn.com/w80/my.png', days: '6–7 working days', category: 'Tourist / Social', price: '৳6,800', iconName: 'Send' }
  ]
};

const defaultTeamSettings: TeamSettings = {
  isEnabled: true,
  title: 'Meet Our Travel Experts',
  subtitle: 'A passionate team dedicated to crafting unforgettable journeys.',
  items: [
    { id: 'tm-1', name: 'Rafiqul Islam', role: 'Managing Director', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&fit=crop&q=80' },
    { id: 'tm-2', name: 'Nasrin Akter', role: 'Head of Operations', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&fit=crop&q=80' },
    { id: 'tm-3', name: 'Tanvir Hossain', role: 'Visa Specialist', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&fit=crop&q=80' },
    { id: 'tm-4', name: 'Sadia Rahman', role: 'Tour Package Manager', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&fit=crop&q=80' },
  ]
};

const defaultFooterSettings: FooterSettings = {
  isEnabled: true,
  brandTagline: 'Your trusted travel partner for tours, flight tickets, and visa services — delivering memorable journeys since 2009.',
  address: 'Farmgate, Dhaka-1215',
  phone: '+880 1700-000001',
  email: 'info@airzoneltd.com',
  facebookUrl: '#',
  youtubeUrl: '#',
  instagramUrl: '#',
  quickLinks: ['Home', 'About Us', 'Tour Packages', 'Air Tickets', 'Visa Services', 'Contact'],
  services: ['International Tours', 'Domestic Tours', 'Domestic Flights', 'International Flights', 'Visa Processing', 'Air Ticketing'],
  newsletterTitle: 'Newsletter',
  newsletterDesc: 'Get exclusive travel deals and updates.',
  copyrightText: 'Air Zone Ltd. All rights reserved.',
  licenseText: 'Licensed Travel Agency — Bangladesh',
};

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

  // CMS Section Settings State Hooks
  const [heroSettings, setHeroSettings] = useState<HeroSettings>(() => {
    const saved = localStorage.getItem('heroSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.slides && parsed.slides.length < defaultHeroSettings.slides.length) {
        parsed.slides = [
          ...parsed.slides,
          ...defaultHeroSettings.slides.slice(parsed.slides.length)
        ];
        localStorage.setItem('heroSettings', JSON.stringify(parsed));
      }
      return parsed;
    }
    return defaultHeroSettings;
  });

  const [aboutSettings, setAboutSettings] = useState<AboutSettings>(() => {
    const saved = localStorage.getItem('aboutSettings');
    return saved ? JSON.parse(saved) : defaultAboutSettings;
  });

  const [packagesSettings, setPackagesSettings] = useState<PackagesSettings>(() => {
    const saved = localStorage.getItem('packagesSettings');
    return saved ? JSON.parse(saved) : defaultPackagesSettings;
  });

  const [visaSettings, setVisaSettings] = useState<VisaSettings>(() => {
    const saved = localStorage.getItem('visaSettings');
    return saved ? JSON.parse(saved) : defaultVisaSettings;
  });

  const [teamSettings, setTeamSettings] = useState<TeamSettings>(() => {
    const saved = localStorage.getItem('teamSettings');
    return saved ? JSON.parse(saved) : defaultTeamSettings;
  });

  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => {
    const saved = localStorage.getItem('footerSettings');
    return saved ? JSON.parse(saved) : defaultFooterSettings;
  });

  // Updaters
  const updateHeroSettings = (updates: Partial<HeroSettings>) => {
    setHeroSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('heroSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'Hero Section CMS settings updated');
  };

  const updateAboutSettings = (updates: Partial<AboutSettings>) => {
    setAboutSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('aboutSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'About Us Section CMS settings updated');
  };

  const updatePackagesSettings = (updates: Partial<PackagesSettings>) => {
    setPackagesSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('packagesSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'Tour Packages Section CMS settings updated');
  };

  const updateVisaSettings = (updates: Partial<VisaSettings>) => {
    setVisaSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('visaSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'Visa Services Section CMS settings updated');
  };

  const updateTeamSettings = (updates: Partial<TeamSettings>) => {
    setTeamSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('teamSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'Team Section CMS settings updated');
  };

  const updateFooterSettings = (updates: Partial<FooterSettings>) => {
    setFooterSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('footerSettings', JSON.stringify(next));
      return next;
    });
    addSystemLog('info', 'system', 'Footer Section CMS settings updated');
  };

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
        setMaintenanceMode,

        // CMS Section Settings
        heroSettings,
        updateHeroSettings,
        aboutSettings,
        updateAboutSettings,
        packagesSettings,
        updatePackagesSettings,
        visaSettings,
        updateVisaSettings,
        teamSettings,
        updateTeamSettings,
        footerSettings,
        updateFooterSettings
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
