import React, { ChangeEvent, useEffect, useState } from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Card, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import UserWordCard from './UserWordCard';
import { APPEAR_DURATION, RESULT_APPEAR_TIMEOUT, WORDBOOK_GROUPS } from '../../constants';
import { IDictionarySectionProps } from './types';
import { IUserWord } from '../../store/types';
import useStyles, { transitionStyles, RESULT_APPEAR_STYLE } from './styles';

const DictionarySection: React.FC<IDictionarySectionProps> = ({
  words,
  removeOnDifficultyChange,
}: IDictionarySectionProps) => {
  const classes = useStyles();
  const [pagesCount, setPagesCount] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [pagedWords, setPagedWords] = useState([] as Array<Array<IUserWord>>);
  const [totalResults, setTotalResults] = useState({ success: 0, fail: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const pageSize = 20;

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    const targetPageIndex = newPage - 1;
    if (activePage === targetPageIndex) return;
    setActivePage(targetPageIndex);
    setIsMounted(false);
  };

  const calculateTotalResults = (currentPageWords: IUserWord[]): void => {
    const totalHeats = currentPageWords.reduce(
      (acc, uWord) => {
        acc.success += uWord.userWord?.optional.successHeats || 0;
        acc.fail += uWord.userWord?.optional.errorHeats || 0;
        return acc;
      },
      { success: 0, fail: 0 }
    );

    setTotalResults(totalHeats);
  };

  const renderWords = () => {
    return pagedWords[activePage]?.map((word, index) => (
      <div key={word.word}>
        <UserWordCard
          word={word}
          index={index}
          removeOnDifficultyChange={removeOnDifficultyChange}
        />
      </div>
    ));
  };

  const setMainBackground = () => {
    const currentGroup = WORDBOOK_GROUPS[activeGroup];
    const background = currentGroup?.background || '#fafafa';
    const borderColor = currentGroup?.color || 'darkgray';
    return { background, borderColor };
  };

  const PaginationPanel = () => (
    <Pagination
      count={pagesCount}
      page={activePage + 1}
      className={classes.pagination}
      onChange={handlePageSelect}
    />
  );

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let cardAppearTimeout: NodeJS.Timeout;
    const tempWord = [...words];
    const tmp = [] as Array<Array<IUserWord>>;
    tempWord.sort((word1, word2) => word1.group - word2.group);

    while (tempWord.length > 0) {
      const currentGroupIndex = tempWord[0].group;
      const pageWordsCount = Math.min(
        pageSize,
        tempWord.filter((word) => word.group === currentGroupIndex).length
      );
      tmp.push(tempWord.slice(0, pageWordsCount));
      tempWord.splice(0, pageWordsCount);
    }
    setPagesCount(tmp.length);
    setPagedWords(tmp);
    if (tmp.length) {
      calculateTotalResults(tmp[0]);
      cardAppearTimeout = setTimeout(() => setIsMounted(true), APPEAR_DURATION);
    }
    return () => {
      if (cardAppearTimeout) {
        clearTimeout(cardAppearTimeout);
        setIsMounted(false);
      }
    };
  }, [words]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    let cardAppearTimeout: NodeJS.Timeout;
    const currentPageWords = pagedWords[activePage];
    if (currentPageWords) {
      setActiveGroup(currentPageWords[0].group);

      calculateTotalResults(currentPageWords);
      cardAppearTimeout = setTimeout(() => setIsMounted(true), APPEAR_DURATION);
    }

    return () => {
      if (cardAppearTimeout) {
        clearTimeout(cardAppearTimeout);
        setIsMounted(false);
      }
    };
  }, [activePage]);

  return (
    <div className={classes.section} style={setMainBackground()}>
      <PaginationPanel />
      <Typography variant="h5">Раздел: {WORDBOOK_GROUPS[activeGroup].label}</Typography>
      <div className={classes.words}>{renderWords()}</div>
      {pagedWords[activePage]?.length > 2 && <PaginationPanel />}
      <Transition in={isMounted} timeout={RESULT_APPEAR_TIMEOUT}>
        {(state: TransitionStatus) => (
          <Card
            className={classes.totalResults}
            style={{ ...RESULT_APPEAR_STYLE, ...transitionStyles[state] }}>
            <Typography variant="h6">Суммарно</Typography>
            <Typography className={classes.successHeats}>
              Попаданий: {totalResults.success}
            </Typography>
            <Typography className={classes.errorHeats}>промахов: {totalResults.fail}</Typography>
          </Card>
        )}
      </Transition>
    </div>
  );
};

export default DictionarySection;
