export type Role = 'Administrator' | 'Manager' | 'User' | 'Billing' | 'Support';
export type UserStatus = 'Active' | 'Pending' | 'Suspended' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  status: UserStatus;
  lastLogin: string;
  createdDate: string;
}

export interface Activity {
  id: string;
  type: 'login' | 'registration' | 'payment' | 'system' | 'security';
  user: string;
  avatar?: string;
  message: string;
  time: string;
  amount?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  user: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  created: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success' | 'danger';
  date: string;
}

export type Page = 'landing' | 'login' | 'forgot-password' | 'reset-password' | 'verify-email' | 'dashboard' | '404' | '500';
export type SubPage = 
  | 'home' | 'users' | 'profile' | 'reports' | 'analytics' | 'settings' | 'security' | 'notifications'
  | 'sections-topbar' | 'sections-hero' | 'sections-about' | 'sections-packages' | 'sections-visa' | 'sections-team' | 'sections-footer' | 'sections-contact' | 'sections-ad'
  | 'sections-services' | 'sections-ticketing' | 'sections-whychooseus' | 'sections-testimonials';

export interface AdSlide {
  image: string;
  linkUrl: string;
}

export interface AdSettings {
  isEnabled: boolean;
  slides: AdSlide[];
}

export interface TopBarSettings {
  isEnabled: boolean;
  email: string;
  phone: string;
  whatsappNumber: string;
  messengerLink: string;
}

export interface ContactSettings {
  isEnabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  address: string;
  phone1: string;
  phone2: string;
  hotline: string;
  email1: string;
  email2: string;
  hoursSaturdayThursday: string;
  hoursFriday: string;
}

export interface HeroSettings {
  isEnabled: boolean;
  videoUrl: string;
  title: string;
  subtitle: string;
  desc: string;
  tagline: string;
}

export interface AboutSettings {
  isEnabled: boolean;
  badge: string;
  title: string;
  desc1: string;
  desc2: string;
  points: string[];
  image: string;
  yearsExperience: string;
  yearsLabel: string;
}

export interface TourPackageItem {
  id: string;
  image: string;
  title: string;
  duration: string;
  durationDays: number;
  location: string;
  price: string;
  rating: number;
  categories: string[];
  desc: string;
  inclusions: string[];
}

export interface PackagesSettings {
  isEnabled: boolean;
  title: string;
  subtitle: string;
  items: TourPackageItem[];
}

export interface VisaServiceItem {
  id: string;
  country: string;
  processingTime: string;
  fee: string;
  type: string;
  iconName: string;
}

export interface VisaSettings {
  isEnabled: boolean;
  title: string;
  subtitle: string;
  items: VisaServiceItem[];
}

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface TeamSettings {
  isEnabled: boolean;
  title: string;
  subtitle: string;
  items: TeamMemberItem[];
}

export interface FooterSocialLink {
  platform: 'facebook' | 'youtube' | 'instagram' | 'twitter' | 'linkedin';
  url: string;
}

export interface FooterSettings {
  isEnabled: boolean;
  companyName: string;
  logo: string;
  brandTagline: string;
  address: string;
  phone: string;
  email: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  quickLinks: string[];
  services: string[];
  newsletterTitle: string;
  newsletterDesc: string;
  copyrightText: string;
  licenseText: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  category: 'auth' | 'api' | 'db' | 'system';
  message: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  iconName: string;
}

export interface ServicesSettings {
  isEnabled: boolean;
  badge: string;
  title: string;
  subtitle: string;
  items: ServiceItem[];
}

export interface FlightDealItem {
  id: string;
  airline: string;
  logo: string;
  from: string;
  to: string;
  price: string;
  duration: string;
  stops: string;
  cabin: string;
  baggage: string;
  type: 'domestic' | 'international';
  details: string;
  schedule: string;
}

export interface FlightTicketingSettings {
  isEnabled: boolean;
  title: string;
  subtitle: string;
  deals: FlightDealItem[];
}

export interface ReasonItem {
  title: string;
  desc: string;
  iconName: string;
}

export interface WhyChooseUsSettings {
  isEnabled: boolean;
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  reasons: ReasonItem[];
  image: string;
  floatingCardNumber: string;
  floatingCardTitle: string;
  floatingCardDesc: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  image: string;
  text: string;
  rating: number;
}

export interface TestimonialsSettings {
  isEnabled: boolean;
  badge: string;
  title: string;
  items: TestimonialItem[];
}
