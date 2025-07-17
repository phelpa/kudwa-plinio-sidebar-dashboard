import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-light-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-warm-brown">FinanceApp</h1>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/")
                    ? "bg-warm-brown text-white"
                    : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/report"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive("/report")
                    ? "bg-warm-brown text-white"
                    : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
                }`}
              >
                Report
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
