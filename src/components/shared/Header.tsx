import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser, faMenu, faTimes } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side - Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gradient">Oryzenx</h1>
              <p className="text-xs text-gray-500">Premium Domains</p>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-4">
            {/* Notification Icon */}
            <button className="relative p-2 hover:bg-white/10 rounded-lg smooth-transition">
              <FontAwesomeIcon icon={faBell} className="text-lg text-primary" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full animate-pulse" />
            </button>

            {/* Auth Buttons */}
            {!isAuthenticated ? (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 rounded-lg smooth-transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg smooth-transition"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-white/10 rounded-lg smooth-transition"
                >
                  <FontAwesomeIcon icon={faUser} className="text-lg text-primary" />
                  <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-glass p-2 animate-slideDown">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm hover:bg-white/10 rounded smooth-transition"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/offers"
                      className="block px-4 py-2 text-sm hover:bg-white/10 rounded smooth-transition"
                    >
                      My Offers
                    </Link>
                    <Link
                      href="/payments"
                      className="block px-4 py-2 text-sm hover:bg-white/10 rounded smooth-transition"
                    >
                      Payments
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-sm hover:bg-white/10 rounded smooth-transition"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-red-500/10 text-red-500 rounded smooth-transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-white/10 rounded-lg smooth-transition"
              >
                <FontAwesomeIcon
                  icon={mobileMenuOpen ? faTimes : faMenu}
                  className="text-lg text-primary"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
