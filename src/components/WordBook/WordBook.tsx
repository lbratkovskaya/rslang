import React, { ChangeEvent, SyntheticEvent, useEffect } from 'react';
import { HashRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, Typography, Breadcrumbs, Chip } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Header from '../Header';
import Footer from '../Footer';
import { fetchWords, setGroup, setPage } from '../../store/actions/wordBookActions';
import routes, { IRoute } from './routes';
import { IAppState, IWord } from '../../store/types';
import styles from './styles';

const WordBook: React.FC = () => {
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const location = useLocation();
  const { group, page } = wordBook;
  const dispatch = useDispatch();
  const classes = makeStyles(() => styles)();

  const getWords = () => dispatch(fetchWords(group, page));

  const handleGroupSelect = (e: SyntheticEvent, index: number): void => {
    dispatch(setGroup(index));
  };

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    dispatch(setPage(newPage - 1));
  };

  const renderWords = (): Array<JSX.Element> =>
    wordBook.words.map((word: IWord) => (
      <Typography className={classes.text} key={word.word}>
        {word.word}
      </Typography>
    ));

  const renderBreadcrumbs = routes.map((route: IRoute, index) => {
    const isActive = location.pathname === route.linkAddress;
    const style = {
      color: 'white',
      backgroundColor: route.color,
    };

    return (
      <Link to={route.linkAddress} key={route.label} className={classes.breadcrumb}>
        <Chip
          onClick={(e: SyntheticEvent) => handleGroupSelect(e, index)}
          component="span"
          variant="outlined"
          clickable
          label={route.label}
          style={isActive ? style : {}}
          disabled={!!isActive}
        />
      </Link>
    );
  });

  const renderGroups = routes.map((route: IRoute) => (
    <Switch key={route.linkAddress}>
      <Route path={route.linkAddress}>{renderWords()}</Route>
    </Switch>
  ));

  useEffect(() => {
    const routeIndex = routes.findIndex((route: IRoute) => route.linkAddress === location.pathname);
    dispatch(setGroup(routeIndex));
  }, [location]);

  useEffect(() => {
    getWords();
  }, [page, group]);

  const getMainStyle = () => {
    const currentRoute = routes.find((route: IRoute) => route.linkAddress === location.pathname)!;
    const background = currentRoute?.background || '#fafafa';

    return { background };
  };

  return (
    <>
      <Header />
      <main style={getMainStyle()}>
        <HashRouter>
          <Typography variant="h4">WordBook</Typography>
          <Switch>
            <Route path="/wordBook">
              <Breadcrumbs aria-label="breadcrumb" separator="•">
                {renderBreadcrumbs}
              </Breadcrumbs>
            </Route>
          </Switch>
          {renderGroups}
          <Pagination
            count={30}
            page={page + 1}
            variant="outlined"
            onChange={handlePageSelect}
            showFirstButton
            showLastButton
          />
        </HashRouter>
      </main>
      <Footer />
    </>
  );
};

export default WordBook;
