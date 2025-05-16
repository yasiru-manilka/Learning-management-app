import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  User, 
  Menu, 
  X, 
  LogOut, 
  GraduationCap 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types/User';

interface DashboardLayoutProps {
  role: UserRole;
}

const DashboardLayout = ({ role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Close sidebar on mobile by default
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Define navigation links based on role
  const navLinks = role === 'admin' 
    ? [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/papers', icon: <FileText size={20} />, label: 'Papers' },
        { path: '/admin/students', icon: <Users size={20} />, label: 'Students' },
        { path: '/admin/profile', icon: <User size={20} />, label: 'Profile' }
      ]
    : [
        { path: '/student/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/student/papers', icon: <FileText size={20} />, label: 'Papers' },
        { path: '/student/profile', icon: <User size={20} />, label: 'Profile' }
      ];
      
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Logo */}
        <div className="px-6 py-4 border-b">
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">EduLearn</span>
          </Link>
        </div>
        
        {/* User info */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
              <img 
                src={user?.profileImage || 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg'} 
                alt={user?.name || 'User'}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    location.pathname === link.path
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Logout */}
        <div className="px-4 py-4 border-t mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full"
          >
            <LogOut size={20} />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6">
          {/* Toggle sidebar button (mobile only) */}
          <button 
            className="md:hidden mr-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Page title (dynamic based on current route) */}
          <h1 className="text-xl font-semibold">
            {navLinks.find(link => link.path === location.pathname)?.label || 'Dashboard'}
          </h1>
        </header>
        
        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;