import React, { ChangeEvent, useEffect } from 'react';
import { HashRouter, Link, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorageState from 'use-local-storage-state';
import { Typography, Breadcrumbs, Chip } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import Header from '../Header';
import Footer from '../Footer';
import WordCard from '../WordCard';
import { fetchWords, setGroup } from '../../store/actions/wordBookActions';
import { WORDBOOK_GROUPS, ROUTES, IGroup } from '../../constants';
import { IAppState, IWord } from '../../store/types';
import useStyles from './styles';

const WordBook: React.FC = () => {
  const dispatch = useDispatch();
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const location = useLocation();
  const { activeGroup } = wordBook;
  const [activePage, setActivePage] = useLocalStorageState('activePage', 0);
  const classes = useStyles();

  const isRootLocation = location.pathname.match(/(\/wordBook)[/]*$/);

  const getWords = () => dispatch(fetchWords(activeGroup, activePage));

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    setActivePage(newPage - 1);
  };

  const setMainBackground = () => {
    const currentGroup = WORDBOOK_GROUPS.find(
      (group: IGroup) => group.linkAddress === location.pathname
    )!;
    const background = currentGroup?.background || '#fafafa';
    const borderColor = currentGroup?.color || 'darkgray';
    return { background, borderColor };
  };

  const WelcomeMessage = (): JSX.Element => (
    <div className={classes.welcome}>
      <Typography variant="h5" color="textSecondary" className={classes.welcomeText}>
        Select section to study <ArrowUpward />
      </Typography>
      <div className={classes.welcomeImg} />
    </div>
  );

  const PaginationPanel = () => (
    <Pagination
      count={30}
      page={activePage + 1}
      className={classes.pagination}
      onChange={handlePageSelect}
    />
  );

  const BreadcrumbsPanel = (): JSX.Element => (
    <Breadcrumbs aria-label="breadcrumb" separator="" className={classes.breadcrumbs}>
      <Typography variant="body1">Sections:</Typography>
      {WORDBOOK_GROUPS.map((group: IGroup) => {
        const isActive = location.pathname === group.linkAddress;
        const style = {
          color: 'white',
          backgroundColor: group.color,
        };

        return (
          <Link to={group.linkAddress} key={group.label} className={classes.breadcrumb}>
            <Chip
              variant="outlined"
              clickable
              className={classes.chip}
              label={group.label}
              style={isActive ? style : {}}
            />
          </Link>
        );
      })}
    </Breadcrumbs>
  );

  const GroupsContent = (): JSX.Element => {
    const opacity = wordBook.isLoading ? 0 : 1;

    const renderWordCards = () => (
      <div className={classes.words} style={{ opacity }}>
        {wordBook.words.map((word: IWord) => (
          <WordCard word={word} key={word.word} />
        ))}
      </div>
    );

    return (
      <>
        {WORDBOOK_GROUPS.map((group: IGroup) => (
          <Switch key={group.linkAddress}>
            <Route path={group.linkAddress}>{renderWordCards}</Route>
          </Switch>
        ))}
      </>
    );
  };

  useEffect(() => {
    const routeIndex = WORDBOOK_GROUPS.findIndex(
      (group: IGroup) => group.linkAddress === location.pathname
    );
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
          <Typography variant="h5">WordBook</Typography>
          <Switch>
            <Route path={ROUTES.wordBook.root}>
              <BreadcrumbsPanel />
            </Route>
          </Switch>
          {!isRootLocation && <PaginationPanel />}
          <GroupsContent />
          {isRootLocation ? <WelcomeMessage /> : <PaginationPanel />}
        </HashRouter>
      </main>
      <Footer />
    </>
  );
};

export default WordBook;
