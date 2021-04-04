import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WordBook from './WordBook';
import MainPage from './MainPage';
import GameSavannah from './GameSavannah';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import UserDictionary from './UserDictionary/UserDictionary';
import RandomPage from './RandomPage';
import { enterTimeout, exitTimeout, ROUTES } from '../constants';
import './App.scss';

const App: React.FC = () => {
  const timeout = { enter: enterTimeout, exit: exitTimeout };

  return (
    <HashRouter>
      <Route
        render={(routeProps) => (
          <TransitionGroup component={null}>
            <CSSTransition
              key={routeProps.location.pathname}
              timeout={timeout}
              classNames="page"
              mountOnEnter
              unmountOnExit>
              <Switch location={routeProps.location}>
                <Route path={ROUTES.signIn} component={SignInPage} />
                <Route path={ROUTES.signUp} component={SignUpPage} />
                <Route path={ROUTES.wordBook.root} component={WordBook} />
                <Route path={ROUTES.dictionary} component={UserDictionary} />
                <Route path={ROUTES.games.savannah} component={GameSavannah} />
                <Route path={ROUTES.study} component={RandomPage} />
                <Route exact path={ROUTES.root} component={MainPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </HashRouter>
  );
};

export default App;
