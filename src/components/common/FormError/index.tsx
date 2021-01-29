import React from 'react';

interface IFormErrorProps {
  errorMessage: string;
}

export const FormError: React.FC<IFormErrorProps> = ({ errorMessage }) => (
  <span role="alert" className="text-xs text-red-500">
    {errorMessage}
  </span>
);
