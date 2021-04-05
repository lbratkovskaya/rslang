import React, { ChangeEvent, useEffect, useState } from 'react';
import { Pagination } from '@material-ui/lab';
import { IDictionarySectionProps } from './types';
import useStyles from './styles';
import UserWordCard from './UserWordCard';
import { IUserWord } from '../../store/types';
import { WORDBOOK_GROUPS } from '../../constants';

const DictionarySection: React.FC<IDictionarySectionProps> = ({
  words,
}: IDictionarySectionProps) => {
  const classes = useStyles();
  const [pagesCount, setPagesCount] = useState(0);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [pagedWords, setPagedWords] = useState([] as Array<Array<IUserWord>>);
  const pageSize = 20;

  const handlePageSelect = (e: ChangeEvent<unknown>, newPage: number): void => {
    const targetPageIndex = newPage - 1;
    if (activePage === targetPageIndex) return;
    setActivePage(targetPageIndex);
  };

  useEffect(() => {
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
  }, [words]);

  useEffect(() => {
    const currentPageWords = pagedWords[activePage];
    if (currentPageWords) {
      setActiveGroup(currentPageWords[0].group);
    }
  }, [activePage]);

  const PaginationPanel = () => (
    <Pagination
      count={pagesCount}
      page={activePage + 1}
      className={classes.pagination}
      onChange={handlePageSelect}
    />
  );

  const renderWords = () => {
    return pagedWords[activePage]?.map((word, index) => (
      <div key={word.word}>
        <UserWordCard word={word} index={index} />
      </div>
    ));
  };

  const setMainBackground = () => {
    const currentGroup = WORDBOOK_GROUPS[activeGroup];
    const background = currentGroup?.background || '#fafafa';
    const borderColor = currentGroup?.color || 'darkgray';
    return { background, borderColor };
  };

  return (
    <div className={classes.section} style={setMainBackground()}>
      <PaginationPanel />
      <div className={classes.words}>{renderWords()}</div>
      {pagedWords[activePage]?.length > 2 && <PaginationPanel />}
    </div>
  );
};

export default DictionarySection;
