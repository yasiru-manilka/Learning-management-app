export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  enrollmentDate?: string;
  grade?: string;
  contactNumber?: string;
  parentName?: string;
  parentContact?: string;
  address?: string;
}