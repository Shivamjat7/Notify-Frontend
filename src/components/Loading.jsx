import React from "react";

export default function Loading({ 
  message = "Loading...", 
  type = "spinner", 
  size = "medium",
  className = "" 
}) {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-8 w-8", 
    large: "h-12 w-12",
    xl: "h-16 w-16"
  };

  const LoadingSpinner = () => (
    <div className={`animate-spin rounded-full border-4 border-blue-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
  );

  const LoadingDots = () => (
    <div className="flex space-x-2">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );

  const LoadingPulse = () => (
    <div className={`animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-indigo-600 ${sizeClasses[size]}`}></div>
  );

  const LoadingRing = () => (
    <div className="relative">
      <div className={`animate-spin rounded-full border-4 border-blue-200 ${sizeClasses[size]}`}></div>
      <div className={`absolute top-0 left-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600 ${sizeClasses[size]}`} style={{ animationDuration: '1.5s' }}></div>
    </div>
  );

  const LoadingWave = () => (
    <div className="flex space-x-1">
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse"></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
      <div className="w-1 h-4 bg-blue-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  );

  const LoadingGradient = () => (
    <div className={`animate-spin rounded-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 ${sizeClasses[size]} relative`}>
      <div className="absolute inset-1 bg-white rounded-full"></div>
    </div>
  );

  const getLoadingAnimation = () => {
    switch (type) {
      case 'dots':
        return <LoadingDots />;
      case 'pulse':
        return <LoadingPulse />;
      case 'ring':
        return <LoadingRing />;
      case 'wave':
        return <LoadingWave />;
      case 'gradient':
        return <LoadingGradient />;
      default:
        return <LoadingSpinner />;
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full h-full space-y-4 ${className}`}>
      {getLoadingAnimation()}
      {message && (
        <p className="text-sm text-gray-600 font-medium animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}

// Specialized loading components for different use cases
export function LoadingCard({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur rounded-xl shadow-lg border border-gray-200">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mb-4"></div>
      <p className="text-gray-600 font-medium">{message}</p>
    </div>
  );
}

export function LoadingOverlay({ message = "Loading...", show = true }) {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-gray-700 font-semibold">{message}</p>
      </div>
    </div>
  );
}

export function LoadingSkeleton({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{ width: `${Math.random() * 40 + 60}%` }}
        ></div>
      ))}
    </div>
  );
} 