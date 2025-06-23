import React from "react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center text-gray-700 space-y-4">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-30 blur-lg animate-pulse"></div>
        <svg
          className="w-12 h-12 text-blue-600 animate-spin drop-shadow-md z-10 relative"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v4m0 8v4m4-4h4m-8 0H4m2.93-6.36l2.83 2.83m8.49 8.49l-2.83-2.83m2.83-8.49l-2.83 2.83M6.34 6.34l2.83 2.83"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-wide animate-pulse">Loading Course Info</h2>
        <p className="text-sm text-gray-500 mt-1">Please wait a moment while we prepare everything for you.</p>
      </div>
    </div>
  );
}

export default Loader;
