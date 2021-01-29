import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Home } from '../pages/Home';
import { meQuery } from '../__generated__/meQuery';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
    }
  }
`;
export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery<meQuery>(ME_QUERY);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup">
          <Redirect to="/" />
        </Route>
        <Route path="/signin">
          <Redirect to="/" />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>
  );
};
