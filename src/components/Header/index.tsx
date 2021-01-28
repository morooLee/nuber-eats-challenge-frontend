import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { isLoggedInVar } from '../../apollo';

export const Header: React.FC = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return <h1>header</h1>;
};
