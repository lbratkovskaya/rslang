import React, { ChangeEvent, useEffect } from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Typography, Breadcrumbs, Chip } from '@material-ui/core';
import { ArrowUpward } from '@material-ui/icons';
import { Pagination } from '@material-ui/lab';
import Header from '../Header';
import Footer from '../Footer';
import WordCard from '../WordCard';
import GamesPopover from '../GamesPopover';
import SettingsPopover from '../SettingsPopover';
import { fetchWords, setGroup, setPage } from '../../store/actions/wordBookActions';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { addWordToGamesStore } from '../../store/actions/gamesActions';
import { useSavedWordBookSettings } from '../../utils';
import {
  WORDBOOK_GROUPS,
  IGroup,
  ROUTES,
  APPEAR_DURATION,
  APPEAR_STYLE,
  NUM_OF_PAGES,
} from '../../constants';
import { IAppState, IWord } from '../../store/types';
import useStyles, { transitionStyles } from './styles';

const WordBook: React.FC = () => {
  const dispatch = useDispatch();
  const wordBook = useSelector((state: IAppState) => state.wordBook);
  const userData = useSelector((state: IAppState) => state.user.data);
  const location = useLocation();
  const { activeGroup, isLoading } = wordBook;
  const classes = useStyles();
  const [savedSettings, setSavedSettings] = useSavedWordBookSettings();

  const isRootLocation = `${ROUTES.wordBook.root}/`.includes(location.pathname);
  const shouldRenderGamesButton = !isRootLocation && !isLoading;

  const getWords = () => dispatch(fetchWords(activeGroup, savedSettings.activePage));

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    const targetPageIndex = newPage - 1;
    if (savedSettings.activePage === targetPageIndex) return;
    setSavedSettings({ ...savedSettings, activePage: targetPageIndex });
    dispatch(setPage(targetPageIndex));
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
    <Transition in appear timeout={APPEAR_DURATION}>
      {(state: TransitionStatus) => (
        <div className={classes.welcome} style={{ ...APPEAR_STYLE, ...transitionStyles[state] }}>
          <Typography variant="h5" color="textSecondary" className={classes.welcomeText}>
            Выберите раздел учебника <ArrowUpward />
          </Typography>
          <div className={classes.welcomeImg} />
        </div>
      )}
    </Transition>
  );

  const PaginationPanel = () => (
    <Pagination
      count={NUM_OF_PAGES}
      page={savedSettings.activePage + 1}
      className={classes.pagination}
      onChange={handlePageSelect}
    />
  );

  const BreadcrumbsPanel = (): JSX.Element => (
    <Breadcrumbs aria-label="breadcrumb" separator="" className={classes.breadcrumbs}>
      <Typography variant="body1">Разделы:</Typography>
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
    const renderWordCards = () => (
      <div className={classes.words}>
        {wordBook.words.map((word: IWord, index: number) => (
          <WordCard
            word={word}
            key={word.word}
            index={index}
            activeGroup={activeGroup}
            isLoading={isLoading}
            showDeleted={false}
            removeOnDifficultyChange={false}
          />
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
    if (userData) {
      dispatch(fetchDictionary(userData));
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [savedSettings.activePage, activeGroup]);

  useEffect(() => {
    wordBook.words.forEach((word) => dispatch(addWordToGamesStore(word)));
  }, [wordBook.words]);

  useEffect(() => {
    dispatch(setPage(savedSettings.activePage));
  }, []);

  return (
    // we need to have an empty parent component on every page for smooth transition animation
    <div>
      <Header />
      <main className={classes.main} style={setMainBackground()}>
        <Typography variant="h5" className={classes.title}>
          Учебник {!isRootLocation && <SettingsPopover />}
        </Typography>
        <BreadcrumbsPanel />
        {!isRootLocation && <PaginationPanel />}
        {shouldRenderGamesButton && <GamesPopover />}
        <GroupsContent />
        {isRootLocation && <WelcomeMessage />}
        {shouldRenderGamesButton && <GamesPopover />}
        {!isRootLocation && <PaginationPanel />}
      </main>
      <Footer />
    </div>
  );
};

export default WordBook;
