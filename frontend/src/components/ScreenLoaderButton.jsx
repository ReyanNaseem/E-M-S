import React from "react";

const ScreenLoaderButton = () => {
  return (
    <div className="fixed inset-0 bg-[#1f2937] flex flex-col items-center justify-center z-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
      
      {/* Text */}
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default ScreenLoaderButton;
