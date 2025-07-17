import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-r border-light-brown h-screen w-64 fixed left-0 top-0 z-10">
      <div className="flex flex-col h-full">
        {/* App Title */}
        <div className="p-6 border-b border-light-brown">
          <h1 className="text-2xl font-bold text-warm-brown">FinanceApp</h1>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6">
          <div className="space-y-2 px-4">
            <Link
              to="/"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive("/")
                  ? "bg-warm-brown text-white"
                  : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              to="/report"
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive("/report")
                  ? "bg-warm-brown text-white"
                  : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
              }`}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Report
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
