import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, GraduationCap, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  // Handle scroll event to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Close mobile menu when navigation changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">EduLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-md font-medium transition-colors ${
              location.pathname === '/' 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}>
              Home
            </Link>
            <Link to="/about" className={`text-md font-medium transition-colors ${
              location.pathname === '/about' 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}>
              About Us
            </Link>
            <Link to="/enrollment" className={`text-md font-medium transition-colors ${
              location.pathname === '/enrollment' 
                ? 'text-primary' 
                : 'text-gray-700 hover:text-primary'
            }`}>
              Enrollment
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-md transition-colors">
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button 
                  className="flex items-center space-x-2"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    <img 
                      src={user?.profileImage || 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg'} 
                      alt={user?.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-700">{user?.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <Link 
                      to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to={user?.role === 'admin' ? '/admin/profile' : '/student/profile'} 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setProfileDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t mt-2">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="py-2 text-gray-700">Home</Link>
              <Link to="/about" className="py-2 text-gray-700">About Us</Link>
              <Link to="/enrollment" className="py-2 text-gray-700">Enrollment</Link>
              
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <Link to="/login" className="py-2 text-primary font-medium">Login</Link>
                  <Link to="/register" className="py-2 px-4 bg-primary text-white rounded-md text-center">Register</Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                  <div className="flex items-center py-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                      <img 
                        src={user?.profileImage || 'https://images.pexels.com/photos/1642228/pexels-photo-1642228.jpeg'} 
                        alt={user?.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <Link 
                    to={user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} 
                    className="py-2 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <button 
                    className="py-2 flex items-center text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;