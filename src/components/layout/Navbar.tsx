
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, UserCircle2 } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-primary">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                <path d="M12 14v4" />
                <path d="M12 10v.01" />
              </svg>
              <span className="font-bold text-xl">DDAS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/data-management"
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Data Management
                </Link>
                <Link
                  to="/duplicate-detection"
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Duplicates
                </Link>
                <div className="relative group">
                  <button className="flex items-center text-foreground/80 hover:text-primary transition-colors font-medium">
                    <span>More</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right ease-spring">
                    <div className="p-2 flex flex-col space-y-1">
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        Settings
                      </Link>
                      <Link
                        to="/history"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        History
                      </Link>
                      <Link
                        to="/help"
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        Help & Support
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors">
                    <UserCircle2 className="h-5 w-5" />
                    <span className="font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right ease-spring">
                    <div className="p-2">
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/help"
                  className="text-foreground/80 hover:text-primary transition-colors font-medium"
                >
                  Help
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="rounded-full">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary rounded-md"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/50 animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Dashboard
                </Link>
                <Link
                  to="/data-management"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Data Management
                </Link>
                <Link
                  to="/duplicate-detection"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Duplicates
                </Link>
                <Link
                  to="/settings"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Settings
                </Link>
                <Link
                  to="/history"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  History
                </Link>
                <Link
                  to="/help"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Help & Support
                </Link>
                <div className="pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-2 py-2">
                    <UserCircle2 className="h-5 w-5 text-foreground" />
                    <span className="font-medium">{user?.name}</span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      toggleMobileMenu();
                    }}
                    className="w-full mt-2 py-2 text-sm text-destructive font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Home
                </Link>
                <Link
                  to="/help"
                  className="block py-2 text-foreground font-medium"
                  onClick={toggleMobileMenu}
                >
                  Help
                </Link>
                <div className="pt-4 flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="py-2 px-4 text-center border border-input rounded-full text-foreground font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="py-2 px-4 text-center bg-primary text-primary-foreground rounded-full font-medium"
                    onClick={toggleMobileMenu}
                  >
                    Sign up
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
