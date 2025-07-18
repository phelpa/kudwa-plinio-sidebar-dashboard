import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavigationProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`bg-white shadow-lg border-r border-light-brown h-screen fixed left-0 top-0 z-10 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col h-full">
        {/* App Title and Toggle */}
        <div className="p-4 border-b border-light-brown flex items-center justify-between">
          {!isCollapsed && (
            <img src="/kudwa.png" alt="Kudwa" className="h-6 w-auto" />
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg text-warm-brown hover:text-dark-gray hover:bg-gray-100"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isCollapsed ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 19l-7-7 7-7M19 19l-7-7 7-7"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6">
          <div className="space-y-2 px-2">
            <Link
              to="/"
              className={`flex items-center ${
                isCollapsed ? "justify-center px-2" : "px-4"
              } py-3 rounded-lg text-sm font-medium ${
                isActive("/")
                  ? "bg-warm-brown text-white"
                  : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
              }`}
              title={isCollapsed ? "Dashboard" : ""}
            >
              <svg
                className="w-5 h-5"
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
              {!isCollapsed && <span className="ml-3">Dashboard</span>}
            </Link>
            <Link
              to="/report"
              className={`flex items-center ${
                isCollapsed ? "justify-center px-2" : "px-4"
              } py-3 rounded-lg text-sm font-medium ${
                isActive("/report")
                  ? "bg-warm-brown text-white"
                  : "text-gray-600 hover:text-dark-gray hover:bg-gray-100"
              }`}
              title={isCollapsed ? "Report" : ""}
            >
              <svg
                className="w-5 h-5"
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
              {!isCollapsed && <span className="ml-3">Report</span>}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
