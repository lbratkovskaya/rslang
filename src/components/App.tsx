import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dictionary from './Dictionary';
import MainPage from './MainPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import './App.scss';

const App: React.FC = () => (
  <HashRouter>
    <Switch>
      <Route path="/sign-in">
        <SignInPage />
      </Route>
      <Route path="/sign-up">
        <SignUpPage />
      </Route>
      <Route path="/dictionary">
        <Dictionary />
      </Route>
      <Route path="/">
        <MainPage />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
