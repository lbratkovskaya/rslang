import React from 'react';

import { HashRouter, Switch, Route } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AudioCallingPage from './AudioCallingPage';
import WordBook from './WordBook';
import MainPage from './MainPage';
import GameSavannah from './GameSavannah';
import GamesPage from './GamesPage';
import MemoryGame from './MemoryGame';
import GameSprint from './GameSprint';
import RandomPage from './RandomPage';
import Settings from './Settings';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';
import Statistics from './Statistics/Statistics';
import UserDictionary from './UserDictionary';
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
                <Route exact path={ROUTES.root} component={MainPage} />
                <Route path={ROUTES.study} component={RandomPage} />
                <Route exact path={ROUTES.games.root} component={GamesPage} />
                <Route path={ROUTES.settings} component={Settings} />
                <Route path={ROUTES.wordBook.root} component={WordBook} />
                <Route path={ROUTES.dictionary} component={UserDictionary} />
                <Route path={ROUTES.games.memory} component={MemoryGame} />
                <Route path={ROUTES.games.savannah} component={GameSavannah} />
                <Route path={ROUTES.games.audio} component={AudioCallingPage} />
                <Route path={ROUTES.games.sprint} component={GameSprint} />
                <Route path={ROUTES.signIn} component={SignInPage} />
                <Route path={ROUTES.signUp} component={SignUpPage} />
                <Route path={ROUTES.statistics} component={Statistics} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </HashRouter>
  );
};

export default App;
