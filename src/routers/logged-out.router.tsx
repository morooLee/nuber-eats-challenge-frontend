import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from '../pages/SignIn';

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
