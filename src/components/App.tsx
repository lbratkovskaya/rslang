import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WordBook from './WordBook';
import MainPage from './MainPage';
import GameSavannah from './GameSavannah';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import UserDictionary from './UserDictionary/UserDictionary';
import { enterTimeout, exitTimeout } from '../constants';
import './App.scss';

const App: React.FC = () => {
  const timeout = { enter: enterTimeout, exit: exitTimeout };

  return (
    <HashRouter>
      <Route
        render={(routeProps) => (
          <TransitionGroup component={null}>
            <CSSTransition
              key={routeProps.location.key}
              timeout={timeout}
              classNames="page"
              mountOnEnter
              unmountOnExit>
              <Switch location={routeProps.location}>
                <Route path="/sign-in" component={SignInPage} />
                <Route path="/sign-up" component={SignUpPage} />
                <Route path="/wordbook" component={WordBook} />
                <Route path="/dictionary" component={UserDictionary} />
                <Route path="/games/savannah" component={GameSavannah} />
                <Route exact path="/" component={MainPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </HashRouter>
  );
};

export default App;
