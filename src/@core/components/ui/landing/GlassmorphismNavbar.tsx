import { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Mail, Search, Bell, Settings } from 'lucide-react';

const GlassmorphismNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Detect scroll for navbar background effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', icon: Home, href: '#home', active: true },
    { name: 'About', icon: Info, href: '#about', active: false },
    { name: 'Contact', icon: Mail, href: '#contact', active: false },
  ];

  const notificationCount = 3;
  const userInitials = 'CG';
  const userName = 'Cương';
  const userRole = 'Developer';

  return (
     <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/30 dark:bg-black/40 backdrop-blur-xl shadow-xl border-b border-white/20 dark:border-white/10'
            : 'bg-white/20 dark:bg-black/20 backdrop-blur-lg border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo & Desktop Navigation */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                Logo
              </h1>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium
                      ${item.active 
                        ? 'bg-white/30 text-white shadow-lg backdrop-blur-sm' 
                        : 'text-white/80 hover:bg-white/20 hover:text-white'
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Desktop: Search, Notifications, Settings, User */}
              <div className="hidden md:flex items-center gap-2">
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative text-white hover:bg-white/20 p-2.5 rounded-xl transition-all">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      {notificationCount}
                    </span>
                  )}
                </button>

                {/* Settings */}
                <button className="text-white hover:bg-white/20 p-2.5 rounded-xl transition-all">
                  <Settings className="w-5 h-5" />
                </button>

                {/* User Avatar */}
                <button className="flex items-center gap-2 hover:bg-white/20 p-1.5 pr-3 rounded-xl transition-all">
                  <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                    <span className="text-sm font-bold text-white">{userInitials}</span>
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-medium text-white">{userName}</p>
                    <p className="text-xs text-white/70">{userRole}</p>
                  </div>
                </button>
              </div>

              {/* Mobile: Notification & Menu Button */}
              <div className="flex md:hidden items-center gap-2">
                <button className="relative text-white hover:bg-white/20 p-2 rounded-lg transition-all">
                  <Bell className="w-5 h-5" />
                  {notificationCount > 0 && (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                </button>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-all"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="pb-4 space-y-2 border-t border-white/20 pt-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
                  <input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${item.active 
                      ? 'bg-white/30 text-white shadow-lg' 
                      : 'text-white/80 hover:bg-white/20 hover:text-white'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </a>
              ))}

              {/* Mobile Settings */}
              <button className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-white/20 hover:text-white rounded-xl transition-all">
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>

              {/* Mobile User Profile */}
              <div className="pt-4 border-t border-white/20 mt-4">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-xl transition-all">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
                    <span className="text-sm font-bold">{userInitials}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">{userName}</p>
                    <p className="text-xs text-white/70">{userRole}</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
  );
};

export default GlassmorphismNavbar;