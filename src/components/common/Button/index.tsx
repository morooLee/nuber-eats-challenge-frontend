import React from 'react';

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={`min-w-full focus:outline-none p-3 rounded-md text-sm text-white transition-colors ${
      canClick ? 'bg-blue-500' : 'bg-blue-300'
    }`}
  >
    {loading ? 'Loading...' : actionText}
  </button>
);
