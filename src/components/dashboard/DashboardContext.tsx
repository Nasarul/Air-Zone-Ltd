import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Page, SubPage, User, ToastMessage, SystemLog,
  HeroSettings, AboutSettings, PackagesSettings, VisaSettings, TeamSettings, FooterSettings, ContactSettings, AdSettings,
  ServicesSettings, FlightTicketingSettings, WhyChooseUsSettings, TestimonialsSettings
} from '../../types/dashboard';
import { fetchAllAppwriteData, syncCmsSettingToAppwrite, syncArrayToCollection } from '../../lib/appwriteService';
import { account } from '../../lib/appwrite';
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
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  currentUser: { name: string; email: string; avatar: string; role: string; bio: string; phone: string; address: string; cover: string } | null;
  updateProfile: (data: Partial<{ name: string; email: string; bio: string; phone: string; address: string; role: string; avatar: string; cover: string }>) => void;
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
  contactSettings: ContactSettings;
  updateContactSettings: (settings: Partial<ContactSettings>) => void;
  adSettings: AdSettings;
  updateAdSettings: (settings: Partial<AdSettings>) => void;
  servicesSettings: ServicesSettings;
  updateServicesSettings: (settings: Partial<ServicesSettings>) => void;
  flightTicketingSettings: FlightTicketingSettings;
  updateFlightTicketingSettings: (settings: Partial<FlightTicketingSettings>) => void;
  whyChooseUsSettings: WhyChooseUsSettings;
  updateWhyChooseUsSettings: (settings: Partial<WhyChooseUsSettings>) => void;
  testimonialsSettings: TestimonialsSettings;
  updateTestimonialsSettings: (settings: Partial<TestimonialsSettings>) => void;
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
  videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-commercial-airplane-flying-in-the-clouds-17255-large.mp4',
  title: 'Explore the World',
  subtitle: 'with Air Zone Ltd.',
  desc: 'Premium tour packages, domestic & international flight ticketing, and seamless visa assistance — all in one place.',
  tagline: 'YOUR GATEWAY TO ADVENTURE',
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
    { id: '6', country: 'Malaysia', flag: 'https://flagcdn.com/w80/my.png', days: '6–7 working days', category: 'Tourist / Social', price: '৳6,800', iconName: 'Send' },
    { id: '7', country: 'Canada', flag: 'https://flagcdn.com/w80/ca.png', days: '20–30 working days', category: 'Tourist / Business', price: '৳22,500', iconName: 'FileText' },
    { id: '8', country: 'Thailand', flag: 'https://flagcdn.com/w80/th.png', days: '5–8 working days', category: 'Tourist / Visit', price: '৳5,500', iconName: 'Send' }
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
  companyName: 'Air Zone Ltd.',
  logo: '/logo.png',
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

const defaultContactSettings: ContactSettings = {
  isEnabled: true,
  badge: 'Reach Us',
  title: 'Get In Touch',
  subtitle: 'Ready to plan your next journey? Our team is here to help with any inquiry.',
  address: '4/A, Tejturi Bazar (Indira Road),\nMahabub Plaza, 4th Floor, Room 502,\nFarmgate, Dhaka-1215, Bangladesh',
  phone1: '+880 1700-000001',
  phone2: '+880 1700-000002',
  hotline: '16XXX',
  email1: 'info@airzoneltd.com',
  email2: 'ticketing@airzoneltd.com',
  hoursSaturdayThursday: 'Saturday – Thursday: 9:00 AM – 6:00 PM',
  hoursFriday: 'Friday: Closed',
};

const defaultAdSettings: AdSettings = {
  isEnabled: true,
  slides: [
    {
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200',
      linkUrl: 'https://www.airzoneltd.com',
    },
    {
      image: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1200',
      linkUrl: 'https://www.airzoneltd.com',
    },
    {
      image: 'https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg?auto=compress&cs=tinysrgb&w=1200',
      linkUrl: 'https://www.airzoneltd.com',
    },
  ]
};

const defaultServicesSettings: ServicesSettings = {
  isEnabled: true,
  badge: 'What We Offer',
  title: 'Service Highlights',
  subtitle: 'Everything you need for a seamless journey — from planning to landing.',
  items: [
    { title: 'Air Ticketing', desc: 'Domestic & international flight reservations on 100+ airlines. Corporate travel management and instant group bookings.', iconName: 'Plane' },
    { title: 'Visa Assistance', desc: 'Professional visa processing for 50+ countries — tourist, business, and student visas with a 98% approval success rate.', iconName: 'Globe' },
    { title: 'Tour Packages', desc: 'Curated domestic and international tour packages with flights, hotels, and guided experiences tailored to every budget.', iconName: 'Compass' }
  ]
};

const defaultFlightTicketingSettings: FlightTicketingSettings = {
  isEnabled: true,
  title: 'Domestic & International Ticketing',
  subtitle: 'Find the cheapest flight routes on Biman Bangladesh, US-Bangla, Emirates, Qatar Airways, Singapore Airlines, and 100+ other airlines.',
  deals: [
    {
      id: 'dac-cxb',
      airline: 'US-Bangla Airlines',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: "Cox's Bazar (CXB)",
      price: '৳6,200',
      duration: '1h 00m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '20 kg',
      type: 'domestic',
      details: 'Regular daily flights on comfortable turboprop aircraft. Quick check-in and friendly service.',
      schedule: '08:30 AM - 09:30 AM'
    },
    {
      id: 'dac-cgp',
      airline: 'Novoair',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Chittagong (CGP)',
      price: '৳5,800',
      duration: '0h 45m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '20 kg',
      type: 'domestic',
      details: 'Excellent business commuter flight with highly reliable on-time performance records.',
      schedule: '11:15 AM - 12:00 PM'
    },
    {
      id: 'dac-zyl',
      airline: 'Biman Bangladesh',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Sylhet (ZYL)',
      price: '৳5,500',
      duration: '0h 45m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '20 kg',
      type: 'domestic',
      details: 'Daily service using modern fleets. In-flight mineral water provided.',
      schedule: '03:30 PM - 04:15 PM'
    },
    {
      id: 'dac-dxb',
      airline: 'Emirates',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Dubai (DXB)',
      price: '৳68,000',
      duration: '4h 30m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '30 kg',
      type: 'international',
      details: 'Fly on the world-class Boeing 777. Enjoy premium multi-course meals, seatback entertainment, and famous crew hospitality.',
      schedule: '07:30 PM - 11:00 PM'
    },
    {
      id: 'dac-sin',
      airline: 'Singapore Airlines',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Singapore (SIN)',
      price: '৳52,000',
      duration: '4h 15m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '25 kg',
      type: 'international',
      details: 'Award-winning passenger service. Features extensive media collections and premium hot dining options.',
      schedule: '11:55 PM - 06:10 AM (+1)'
    },
    {
      id: 'dac-lhr',
      airline: 'Qatar Airways',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'London (LHR)',
      price: '৳1,10,000',
      duration: '11h 45m',
      stops: '1 Stop (Doha)',
      cabin: 'Economy',
      baggage: '30 kg',
      type: 'international',
      details: 'Transit through Hamad International Airport (Doha), recognized as one of the best airports globally. Free transit meals included.',
      schedule: '10:40 AM - 05:25 PM'
    },
    {
      id: 'dac-kul',
      airline: 'US-Bangla Airlines',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Kuala Lumpur (KUL)',
      price: '৳38,000',
      duration: '3h 50m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '25 kg',
      type: 'international',
      details: 'Direct flight linking Dhaka and KL. Friendly cabin crew and hot meals served onboard.',
      schedule: '08:50 AM - 12:40 PM'
    },
    {
      id: 'dac-bkk',
      airline: 'Thai Airways',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Bangkok (BKK)',
      price: '৳32,000',
      duration: '2h 30m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '20 kg',
      type: 'international',
      details: 'Traditional Thai service, quick transit entry, and extensive vegetarian meal choices.',
      schedule: '02:00 PM - 04:30 PM'
    },
    {
      id: 'dac-ist',
      airline: 'Turkish Airlines',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'Istanbul (IST)',
      price: '৳85,000',
      duration: '8h 15m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '35 kg',
      type: 'international',
      details: 'Experience premium Turkish hospitality. Includes hot meals, free Wi-Fi messaging, and generous baggage allowance.',
      schedule: '06:30 AM - 12:45 PM'
    }
  ]
};

const defaultWhyChooseUsSettings: WhyChooseUsSettings = {
  isEnabled: true,
  badge: 'Why Air Zone Ltd.',
  titleLine1: 'We Make Travel',
  titleLine2: 'Simple & Memorable',
  description: 'With over 15 years of experience, we have helped thousands of travelers explore the world with confidence. Our commitment to quality, transparency, and customer satisfaction sets us apart.',
  reasons: [
    { title: 'Licensed & Certified', desc: 'Fully licensed by the Civil Aviation Authority, Bangladesh, with valid certification and IATA accreditation.', iconName: 'Award' },
    { title: 'Best Price Guarantee', desc: 'Competitive pricing with complete transparency. No hidden fees, no surprise charges — ever.', iconName: 'BadgeDollarSign' },
    { title: '24/7 Support', desc: 'Our dedicated team is available round-the-clock to assist you before, during, and after your trip.', iconName: 'HeadphonesIcon' },
    { title: 'Global Network', desc: 'Strong partnerships with 200+ airlines, hotels, and tour operators worldwide for seamless experiences.', iconName: 'Globe2' }
  ],
  image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800',
  floatingCardNumber: '98%',
  floatingCardTitle: 'Visa Success Rate',
  floatingCardDesc: 'Based on 5,000+ applications processed'
};

const defaultTestimonialsSettings: TestimonialsSettings = {
  isEnabled: true,
  badge: 'Happy Travelers',
  title: 'What Our Clients Say',
  items: [
    {
      name: 'Mohammad Hasan',
      role: 'Business Executive',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'Air Zone arranged our Europe group tour perfectly. The itinerary was detailed, the hotels were excellent, and the visa processing was smooth. Highly recommend!',
      rating: 5,
    },
    {
      name: 'Fatima Begum',
      role: 'Homemaker',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&fit=crop&q=80',
      text: 'Air Zone booked our family flight tickets to Canada at an unbeatable rate. Their support staff helped us manage all baggage requests and seat arrangements smoothly.',
      rating: 5,
    },
    {
      name: 'Rahim Chowdhury',
      role: 'Software Engineer',
      image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'Got my UK visa processed in record time. The documentation guidance was professional and clear. Will definitely use Air Zone again for my next trip.',
      rating: 5,
    },
    {
      name: 'Sumaiya Khan',
      role: 'Teacher',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&fit=crop&q=80',
      text: 'Booked a Bali honeymoon package — the hotel selections were incredible and every detail was taken care of. It was truly the perfect trip.',
      rating: 5,
    }
  ]
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
      // If they already have the new format (videoUrl exists natively), use it directly
      if (parsed.videoUrl !== undefined) {
        return { ...defaultHeroSettings, ...parsed };
      }
      // Migration from old array format
      if (parsed.slides && parsed.slides.length > 0) {
         const oldSlide = parsed.slides[0];
         return { ...defaultHeroSettings, ...oldSlide, videoUrl: defaultHeroSettings.videoUrl };
      }
      return { ...defaultHeroSettings, ...parsed };
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
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.items && parsed.items.length < defaultVisaSettings.items.length) {
        parsed.items = [
          ...parsed.items,
          ...defaultVisaSettings.items.slice(parsed.items.length)
        ];
        localStorage.setItem('visaSettings', JSON.stringify(parsed));
      }
      return parsed;
    }
    return defaultVisaSettings;
  });

  const [teamSettings, setTeamSettings] = useState<TeamSettings>(() => {
    const saved = localStorage.getItem('teamSettings');
    return saved ? JSON.parse(saved) : defaultTeamSettings;
  });

  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => {
    const saved = localStorage.getItem('footerSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.companyName === undefined || parsed.logo === undefined) {
        parsed.companyName = parsed.companyName || defaultFooterSettings.companyName;
        parsed.logo = parsed.logo || defaultFooterSettings.logo;
        localStorage.setItem('footerSettings', JSON.stringify(parsed));
      }
      return parsed;
    }
    return defaultFooterSettings;
  });

  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => {
    const saved = localStorage.getItem('contactSettings');
    return saved ? JSON.parse(saved) : defaultContactSettings;
  });

  const [adSettings, setAdSettings] = useState<AdSettings>(() => {
    const saved = localStorage.getItem('adSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.slides) {
        parsed.slides = [
          {
            image: parsed.image || defaultAdSettings.slides[0].image,
            linkUrl: parsed.linkUrl || defaultAdSettings.slides[0].linkUrl
          }
        ];
        delete parsed.image;
        delete parsed.linkUrl;
        localStorage.setItem('adSettings', JSON.stringify(parsed));
      }
      return parsed;
    }
    return defaultAdSettings;
  });

  const [servicesSettings, setServicesSettings] = useState<ServicesSettings>(() => {
    const saved = localStorage.getItem('servicesSettings');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Force migration to new order if the first item is Tour Packages
      if (parsed.items && parsed.items[0]?.title === 'Tour Packages') {
        localStorage.setItem('servicesSettings', JSON.stringify(defaultServicesSettings));
        return defaultServicesSettings;
      }
      return parsed;
    }
    return defaultServicesSettings;
  });

  const [flightTicketingSettings, setFlightTicketingSettings] = useState<FlightTicketingSettings>(() => {
    const saved = localStorage.getItem('flightTicketingSettings');
    return saved ? JSON.parse(saved) : defaultFlightTicketingSettings;
  });

  const [whyChooseUsSettings, setWhyChooseUsSettings] = useState<WhyChooseUsSettings>(() => {
    const saved = localStorage.getItem('whyChooseUsSettings');
    return saved ? JSON.parse(saved) : defaultWhyChooseUsSettings;
  });

  const [testimonialsSettings, setTestimonialsSettings] = useState<TestimonialsSettings>(() => {
    const saved = localStorage.getItem('testimonialsSettings');
    return saved ? JSON.parse(saved) : defaultTestimonialsSettings;
  });

  // Fetch data on mount
  useEffect(() => {
    fetchAllAppwriteData().then(data => {
      if (data) {
        if (data.packages.length > 0) setPackagesSettings(prev => ({ ...prev, items: data.packages }));
        if (data.visas.length > 0) setVisaSettings(prev => ({ ...prev, items: data.visas }));
        if (data.flights.length > 0) setFlightTicketingSettings(prev => ({ ...prev, deals: data.flights }));
        if (data.team.length > 0) setTeamSettings(prev => ({ ...prev, items: data.team }));
        if (data.testimonials.length > 0) setTestimonialsSettings(prev => ({ ...prev, items: data.testimonials }));
        
        if (data.cms.heroSettings) setHeroSettings(data.cms.heroSettings);
        if (data.cms.aboutSettings) setAboutSettings(data.cms.aboutSettings);
        if (data.cms.packagesSettings_meta) setPackagesSettings(prev => ({ ...prev, ...data.cms.packagesSettings_meta }));
        if (data.cms.visaSettings_meta) setVisaSettings(prev => ({ ...prev, ...data.cms.visaSettings_meta }));
        if (data.cms.flightSettings_meta) setFlightTicketingSettings(prev => ({ ...prev, ...data.cms.flightSettings_meta }));
        if (data.cms.teamSettings_meta) setTeamSettings(prev => ({ ...prev, ...data.cms.teamSettings_meta }));
        if (data.cms.testimonialsSettings_meta) setTestimonialsSettings(prev => ({ ...prev, ...data.cms.testimonialsSettings_meta }));
        if (data.cms.footerSettings) setFooterSettings(data.cms.footerSettings);
        if (data.cms.contactSettings) setContactSettings(data.cms.contactSettings);
        if (data.cms.adSettings) setAdSettings(data.cms.adSettings);
        if (data.cms.servicesSettings) setServicesSettings(data.cms.servicesSettings);
        if (data.cms.whyChooseUsSettings) setWhyChooseUsSettings(data.cms.whyChooseUsSettings);
      }
    });
  }, []);

  // Updaters
  const updateHeroSettings = (updates: Partial<HeroSettings>) => {
    setHeroSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('heroSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('heroSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Hero Section CMS settings updated');
  };

  const updateAboutSettings = (updates: Partial<AboutSettings>) => {
    setAboutSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('aboutSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('aboutSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'About Us Section CMS settings updated');
  };

  const updatePackagesSettings = (updates: Partial<PackagesSettings>) => {
    setPackagesSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('packagesSettings', JSON.stringify(next));
      if (updates.items) {
        syncArrayToCollection('tour_packages', next.items, item => ({
           title: item.title, image: item.image, duration: item.duration, durationDays: Number(item.durationDays),
           location: item.location, price: item.price, rating: Number(item.rating), categories: item.categories,
           desc: item.desc, inclusions: item.inclusions
        }));
      } else {
        syncCmsSettingToAppwrite('packagesSettings_meta', { isEnabled: next.isEnabled, title: next.title, subtitle: next.subtitle });
      }
      return next;
    });
    addSystemLog('info', 'system', 'Tour Packages Section CMS settings updated');
  };

  const updateVisaSettings = (updates: Partial<VisaSettings>) => {
    setVisaSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('visaSettings', JSON.stringify(next));
      if (updates.items) {
        syncArrayToCollection('visa_services', next.items, item => ({
          country: item.country, flag: item.flag, days: item.processingTime, category: item.type, price: item.fee, iconName: item.iconName
        }));
      } else {
        syncCmsSettingToAppwrite('visaSettings_meta', { isEnabled: next.isEnabled, title: next.title, subtitle: next.subtitle });
      }
      return next;
    });
    addSystemLog('info', 'system', 'Visa Services Section CMS settings updated');
  };

  const updateTeamSettings = (updates: Partial<TeamSettings>) => {
    setTeamSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('teamSettings', JSON.stringify(next));
      if (updates.items) {
        syncArrayToCollection('team_members', next.items, item => ({
          name: item.name, role: item.role, avatar: item.avatar
        }));
      } else {
        syncCmsSettingToAppwrite('teamSettings_meta', { isEnabled: next.isEnabled, title: next.title, subtitle: next.subtitle });
      }
      return next;
    });
    addSystemLog('info', 'system', 'Team Section CMS settings updated');
  };

  const updateFooterSettings = (updates: Partial<FooterSettings>) => {
    setFooterSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('footerSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('footerSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Footer Section CMS settings updated');
  };

  const updateContactSettings = (updates: Partial<ContactSettings>) => {
    setContactSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('contactSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('contactSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Contact Section CMS settings updated');
  };

  const updateAdSettings = (updates: Partial<AdSettings>) => {
    setAdSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('adSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('adSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Advertising Section CMS settings updated');
  };

  const updateServicesSettings = (updates: Partial<ServicesSettings>) => {
    setServicesSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('servicesSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('servicesSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Services Section CMS settings updated');
  };

  const updateFlightTicketingSettings = (updates: Partial<FlightTicketingSettings>) => {
    setFlightTicketingSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('flightTicketingSettings', JSON.stringify(next));
      if (updates.deals) {
        syncArrayToCollection('flight_deals', next.deals, item => ({
          airline: item.airline, logo: item.logo, fromLocation: item.from, toLocation: item.to, price: item.price,
          duration: item.duration, stops: item.stops, cabin: item.cabin, baggage: item.baggage, type: item.type,
          details: item.details, schedule: item.schedule
        }));
      } else {
        syncCmsSettingToAppwrite('flightSettings_meta', { isEnabled: next.isEnabled, title: next.title, subtitle: next.subtitle });
      }
      return next;
    });
    addSystemLog('info', 'system', 'Ticketing Section CMS settings updated');
  };

  const updateWhyChooseUsSettings = (updates: Partial<WhyChooseUsSettings>) => {
    setWhyChooseUsSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('whyChooseUsSettings', JSON.stringify(next));
      syncCmsSettingToAppwrite('whyChooseUsSettings', next);
      return next;
    });
    addSystemLog('info', 'system', 'Why Choose Us Section CMS settings updated');
  };

  const updateTestimonialsSettings = (updates: Partial<TestimonialsSettings>) => {
    setTestimonialsSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem('testimonialsSettings', JSON.stringify(next));
      if (updates.items) {
        syncArrayToCollection('testimonials', next.items, item => ({
          name: item.name, role: item.role, image: item.image, text: item.text, rating: Number(item.rating)
        }));
      } else {
        syncCmsSettingToAppwrite('testimonialsSettings_meta', { isEnabled: next.isEnabled, badge: next.badge, title: next.title });
      }
      return next;
    });
    addSystemLog('info', 'system', 'Testimonials Section CMS settings updated');
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

  const login = async (email: string, password?: string): Promise<boolean> => {
    try {
      // Local development bypass for specific admin credentials
      if (email === 'nasarulhasan@gmail.com' && password === '!@#$%^&*') {
        console.log("Local bypass active: Logging in without Appwrite verification.");
      } else if (password) {
        // Appwrite Auth
        await account.createEmailPasswordSession(email, password);
      }
      
      let name = 'Nasarul Hasan';
      try {
        // Only try to fetch Appwrite user if not using local bypass
        if (!(email === 'nasarulhasan@gmail.com' && password === '!@#$%^&*')) {
          const user = await account.get();
          name = user.name || name;
        }
      } catch(e) {
        // fallback
      }

      setIsAuthenticated(true);
      setCurrentUser({
        name,
        email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&fit=crop&q=80',
        role: 'Super Admin',
        bio: 'Lead Cloud Architect and Full-Stack Developer for Air Zone Ltd.',
        phone: '+880 1700-000000',
        address: 'Dhaka, Bangladesh',
        cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
      });
      setPage('dashboard');
      setSubPage('home');
      addSystemLog('info', 'auth', `User ${name} logged in securely.`);
      showToast('success', 'Welcome Back!', `Signed in successfully as ${name}.`);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const logout = async () => {
    const userName = currentUser?.name || 'User';
    try {
      await account.deleteSession('current');
    } catch (error) {
      // ignore
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    setPage('login');
    addSystemLog('info', 'auth', `User ${userName} logged out.`);
    showToast('info', 'Signed Out', 'You have been securely signed out.');
  };

  const updateProfile = (data: Partial<{ name: string; email: string; bio: string; phone: string; address: string; role: string; avatar: string; cover: string }>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...data });
      // Update in active user listing if applicable
      setUsers(prev => prev.map(u => u.email === currentUser.email ? { ...u, name: data.name || u.name, email: data.email || u.email, role: (data.role as any) || u.role, avatar: data.avatar || u.avatar } : u));
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
        updateFooterSettings,
        contactSettings,
        updateContactSettings,
        adSettings,
        updateAdSettings,
        servicesSettings,
        updateServicesSettings,
        flightTicketingSettings,
        updateFlightTicketingSettings,
        whyChooseUsSettings,
        updateWhyChooseUsSettings,
        testimonialsSettings,
        updateTestimonialsSettings
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
