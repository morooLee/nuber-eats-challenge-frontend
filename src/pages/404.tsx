import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

export const NotFound = () => {
  const history = useHistory();
  return (
    <>
      <Helmet>
        <title>Not Found | Nuber Eats</title>
      </Helmet>
      <div className="h-screen flex px-5 flex-col items-center justify-center text-center">
        <span className="font-semibold text-2xl mb-3">Page Not Found.</span>
        <span className="font-medium text-base mb-5">
          The page you're looking for does not exist or has moved.
        </span>
        <span
          className="hover:underline font-medium text-blue-400"
          onClick={history.goBack}
        >
          Go back &rarr;
        </span>
      </div>
    </>
  );
};
