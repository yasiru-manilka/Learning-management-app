import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
type UserRole = 'admin' | 'student';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
}

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin' as UserRole,
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg'
  },
  {
    id: '2',
    name: 'Student One',
    email: 'student1@example.com',
    password: 'student123',
    role: 'student' as UserRole,
    profileImage: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg'
  },
  {
    id: '3',
    name: 'Student Two',
    email: 'student2@example.com',
    password: 'student123',
    role: 'student' as UserRole,
    profileImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg'
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('lms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function - simulates API call
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (!foundUser) {
      setLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Remove password from user object before storing
    const { password: _, ...userWithoutPassword } = foundUser;
    
    setUser(userWithoutPassword);
    localStorage.setItem('lms_user', JSON.stringify(userWithoutPassword));
    setLoading(false);
  };
  
  // Register function - simulates API call
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      setLoading(false);
      throw new Error('User with this email already exists');
    }
    
    // In a real app, we would call an API to create the user
    // For this demo, we'll just simulate a successful registration
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'student' as UserRole,
      profileImage: 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg'
    };
    
    setUser(newUser);
    localStorage.setItem('lms_user', JSON.stringify(newUser));
    setLoading(false);
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('lms_user');
  };
  
  // Derived state
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isStudent
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};