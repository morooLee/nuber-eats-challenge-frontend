import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { NotFound } from '../pages/404';
import { Home } from '../pages/Home';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';

export const LoggedOutRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Redirect to="/404"></Redirect>
      </Switch>
    </BrowserRouter>
  );
};
