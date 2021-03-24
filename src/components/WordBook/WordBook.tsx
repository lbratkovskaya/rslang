import React, { ChangeEvent, useEffect } from 'react';
import { HashRouter, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Breadcrumbs, Chip } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import Header from '../Header';
import Footer from '../Footer';
import { fetchWords, setGroup, setPage } from '../../store/actions/wordBookActions';
import groups from './constants';
import { IAppState, IWord } from '../../store/types';
import { IGroup } from './types';
import useStyles from './styles';

const WordBook: React.FC = () => {
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const location = useLocation();
  const { activeGroup, activePage } = wordBook;
  const dispatch = useDispatch();
  const classes = useStyles();

  const isRootLocation = location.pathname === '/wordBook';

  const getWords = () => dispatch(fetchWords(activeGroup, activePage));

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    dispatch(setPage(newPage - 1));
  };

  const setMainBackground = () => {
    const currentRoute = groups.find((group: IGroup) => group.linkAddress === location.pathname)!;
    const background = currentRoute?.background || '#fafafa';
    return { background };
  };

  const WelcomeMessage = () => <div className={classes.welcome}>Select section to study</div>;

  const PaginationPanel = (): JSX.Element => (
    <Pagination
      count={30}
      page={activePage + 1}
      variant="outlined"
      className={classes.pagination}
      onChange={handlePageSelect}
      showFirstButton
      showLastButton
    />
  );

  const BreadcrumbsPanel = (): JSX.Element => (
    <Breadcrumbs aria-label="breadcrumb" separator="•" className={classes.breadcrumbs}>
      {groups.map((group: IGroup) => {
        const isActive = location.pathname === group.linkAddress;
        const style = {
          color: 'white',
          backgroundColor: group.color,
        };

        return (
          <Chip
            key={group.linkAddress}
            component="a"
            href={`#${group.linkAddress}`}
            variant="outlined"
            clickable
            label={group.label}
            style={isActive ? style : {}}
          />
        );
      })}
    </Breadcrumbs>
  );

  const renderWords = () => {
    const opacity = wordBook.isLoading ? 0.35 : 1;

    return (
      <div className={classes.words} style={{ opacity }}>
        {wordBook.words.map((word: IWord) => (
          <Typography className={classes.text} key={word.word}>
            {word.word}
          </Typography>
        ))}
      </div>
    );
  };

  const GroupsContent = (): JSX.Element => (
    <>
      {groups.map((group: IGroup) => (
        <Switch key={group.linkAddress}>
          <Route path={group.linkAddress}>{renderWords}</Route>
        </Switch>
      ))}
    </>
  );

  useEffect(() => {
    const routeIndex = groups.findIndex((route: IGroup) => route.linkAddress === location.pathname);
    dispatch(setGroup(routeIndex));
  }, [location]);

  useEffect(() => {
    getWords();
  }, [activePage, activeGroup]);

  return (
    <>
      <Header />
      <main className={classes.main} style={setMainBackground()}>
        <HashRouter>
          <Typography variant="h4">WordBook</Typography>
          <Switch>
            <Route path="/wordBook">
              <BreadcrumbsPanel />
            </Route>
          </Switch>
          <GroupsContent />
          {isRootLocation ? <WelcomeMessage /> : <PaginationPanel />}
        </HashRouter>
      </main>
      <Footer />
    </>
  );
};

export default WordBook;
