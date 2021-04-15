import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setPage } from '../../store/actions/wordBookActions';
import { NUM_OF_PAGES, NUM_OF_SECTIONS, WORDBOOK_GROUPS } from '../../constants';
import getRandomNumber, { useSavedWordBookSettings } from '../../utils';

const getRandomSectionIndex = () => getRandomNumber(NUM_OF_SECTIONS);
const getRandomPageIndex = () => getRandomNumber(NUM_OF_PAGES);

const RandomPage: React.FC = () => {
  const [route, setRoute] = useState('/');
  const dispatch = useDispatch();
  const [savedSettings, setSavedSettings] = useSavedWordBookSettings();

  useEffect(() => {
    const randomPage = getRandomPageIndex();
    const randomGroup = WORDBOOK_GROUPS[getRandomSectionIndex()];
    setSavedSettings({ ...savedSettings, activePage: randomPage });
    dispatch(setPage(randomPage));
    setRoute(randomGroup.linkAddress);
  }, []);

  return <Redirect to={route} />;
};

export default RandomPage;
