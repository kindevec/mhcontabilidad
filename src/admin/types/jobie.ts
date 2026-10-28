export type NavSection =
  | 'dashboard'
  | 'search-job'
  | 'applications'
  | 'message'
  | 'statistics'
  | 'news';

export type ApplicationStatus = 'Pending' | 'On-Hold' | 'Candidate';

export type ApplicationFilter = 'All' | ApplicationStatus;

export type EmploymentType = 'FREELANCE' | 'PART TIME' | 'FULLTIME';

export type SortOrder = 'Newest' | 'Oldest' | 'Company A-Z';

export type LogoVariant =
  | 'orange-arch'
  | 'dark-c'
  | 'magenta-c'
  | 'cyan-arch'
  | 'green-arch'
  | 'blue-arch'
  | 'red-arch'
  | 'pink-arch'
  | 'gold-arch';

export interface ApplicationItem {
  id: string;
  code: string; // e.g. #APL-0003
  dateApplied: string; // e.g. June 1, 2020, 08:22 AM
  timestamp: number;
  companyName: string;
  companyDepartment: string;
  logoVariant: LogoVariant;
  type: EmploymentType;
  position: string;
  hasPhone: boolean;
  hasEmail: boolean;
  phone: string;
  email: string;
  status: ApplicationStatus;
  applicantName: string;
  expectedSalary: string;
  experience: string;
}

export interface CompanyItem {
  id: string;
  name: string;
  category: string;
  logoVariant: LogoVariant;
  location: string;
  employees: string;
  openPositions: number;
  salaryRange: string;
  rating: number;
  skills: string[];
  featuredPosition: string;
  about: string;
  timestamp: number;
}

export interface MessageItem {
  id: string;
  sender: string;
  role: string;
  company: string;
  avatarBg: string;
  initials: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: {
    id: string;
    fromMe: boolean;
    text: string;
    time: string;
  }[];
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  author: string;
}
