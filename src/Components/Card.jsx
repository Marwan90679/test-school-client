import React from 'react';

export const Card = ({ className, children }) => {
  const baseClasses = 'rounded-lg border bg-card text-card-foreground shadow-sm';
  const combinedClasses = `${baseClasses} ${className}`;

  return (
    <div className={combinedClasses}>
      {children}
    </div>
  );
};