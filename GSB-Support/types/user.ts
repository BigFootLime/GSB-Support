export interface User {
    uid: string;
    email: string;
    fullName: string;
    department: string;
    role: 'employee' | 'support' | 'admin';
    createdAt: Date;
    lastLogin: Date;
    avatarUrl?: string;
  }
  