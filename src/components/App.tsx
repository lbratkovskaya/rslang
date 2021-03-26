import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import WordBook from './WordBook';
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
      <Route path="/wordBook">
        <WordBook />
      </Route>
      <Route path="/">
        <MainPage />
      </Route>
    </Switch>
  </HashRouter>
);

export default App;
