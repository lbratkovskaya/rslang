import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import WordBook from './WordBook';
import MainPage from './MainPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import { enterTimeout, exitTimeout } from '../constants';
import './App.scss';

const App: React.FC = () => {
  const timeout = { enter: enterTimeout, exit: exitTimeout };

  return (
    <Router>
      <Route
        render={(routeProps) => {
          return (
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
                  <Route exact path="/" component={MainPage} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </Router>
  );
};

export default App;
