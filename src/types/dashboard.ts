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
export type SubPage = 'home' | 'users' | 'profile' | 'reports' | 'analytics' | 'settings' | 'security' | 'notifications';

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
