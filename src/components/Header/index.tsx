import { useReactiveVar } from '@apollo/client';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { isLoggedInVar } from '../../apollo';
import leftArrow from '../../images/arrow-left.svg';

interface IHeaderProps {
  disableBackButton?: boolean;
}
export const Header: React.FC<IHeaderProps> = ({ disableBackButton }) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);
  const history = useHistory();
  console.log(history);
  return (
    <div className="flex justify-between pl-1 pr-4 py-4">
      {!disableBackButton && (
        <img
          className="w-4"
          src={leftArrow}
          alt="go back"
          onClick={history.goBack}
        />
      )}
      {isLoggedIn && <span className="text-xs text-blue-400">Sign out</span>}
    </div>
  );
};
