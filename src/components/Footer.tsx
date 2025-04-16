
import { Book } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-library-blue-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-white" />
              <span className="ml-2 text-xl font-serif font-bold">StudyHive</span>
            </div>
            <p className="mt-4 text-sm text-gray-300">
              Your free digital study companion for educational resources and academic collaboration.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm">
                  Library
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-gray-300 hover:text-white text-sm">
                  Upload Material
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Study Groups
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Latest Uploads
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} StudyHive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
