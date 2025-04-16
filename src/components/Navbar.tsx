
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Book, Search, User } from 'lucide-react';

const Navbar = ({ isAuthenticated = false }: { isAuthenticated?: boolean }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-library-blue-700" />
              <span className="ml-2 text-xl font-serif font-bold text-library-blue-900">
                StudyHive
              </span>
            </Link>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-500 hover:border-library-blue-500 hover:text-library-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className="border-transparent text-gray-500 hover:border-library-blue-500 hover:text-library-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Library
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-500 hover:border-library-blue-500 hover:text-library-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/upload">
                  <Button variant="outline" className="text-library-blue-700 border-library-blue-300">
                    Upload Content
                  </Button>
                </Link>
                <Link to="/user-dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-library-blue-700">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-library-blue-700 hover:bg-library-blue-800">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-library-blue-50 border-library-blue-500 text-library-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Library
            </Link>
            <Link
              to="/about"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              {isAuthenticated ? (
                <>
                  <div className="flex-shrink-0">
                    <Link to="/user-dashboard" onClick={() => setIsMenuOpen(false)}>
                      <div className="h-10 w-10 rounded-full bg-library-blue-100 flex items-center justify-center">
                        <User className="h-6 w-6 text-library-blue-700" />
                      </div>
                    </Link>
                  </div>
                  <div className="ml-3">
                    <Link
                      to="/upload"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Upload Content
                    </Link>
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                  </div>
                </>
              ) : (
                <div className="space-y-2 w-full">
                  <Link
                    to="/login"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-library-blue-700 bg-white border border-library-blue-300 rounded-md hover:bg-library-blue-50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-library-blue-700 rounded-md hover:bg-library-blue-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
