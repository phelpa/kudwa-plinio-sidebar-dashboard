import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-light-gray flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-soft-blue"></div>
        <div className="text-dark-gray text-lg font-medium">
          Loading dashboard...
        </div>
        <div className="text-gray-500 text-sm">
          Please wait while we load your financial data
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
