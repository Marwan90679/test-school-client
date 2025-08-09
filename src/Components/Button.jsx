import React from 'react';

const getButtonClasses = (variant) => {
  switch (variant) {
    case 'outline':
      return 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-100';
    case 'destructive':
      return 'bg-red-600 text-white hover:bg-red-700';
    case 'success':
      return 'bg-green-600 text-white hover:bg-green-700';
    default:
      return 'bg-blue-600 text-white hover:bg-blue-700';
  }
};

export const Button = ({ className = '', variant, disabled, onClick, children }) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none h-10 px-4 py-2';
  const variantClasses = getButtonClasses(variant);
  const combinedClasses = `${baseClasses} ${variantClasses} ${className}`;

  return (
    <button
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};