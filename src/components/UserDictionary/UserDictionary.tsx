/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Box, Tab, Tabs, useTheme } from '@material-ui/core';
import DictionarySection from './DictionarySection';
import Header from '../Header';
import Footer from '../Footer';
import { fetchDictionary } from '../../store/actions/dictionaryActions';
import { IAppState } from '../../store/types';
import { TabPanelProps } from './types';
import useStyles, { a11yProps } from './styles';

const TabPanel = (props: PropsWithChildren<TabPanelProps>) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const UserDictionary: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: IAppState) => state.user);
  const dictionary = useSelector((state: IAppState) => state.userDictionary);
  const userData = currentUser.data;
  const getWords = () => dispatch(fetchDictionary(userData));
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    getWords();
  }, [currentUser]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <>
      <Header />
      <main>
        {userData.userId ? (
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example">
                <Tab label="Item One" {...a11yProps(0)} />
                <Tab label="Item Two" {...a11yProps(1)} />
                <Tab label="Item Three" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}>
              <TabPanel value={value} index={0} dir={theme.direction}>
                <div className={classes.dictionary}>
                  <DictionarySection
                    words={[...dictionary.easyWords, ...dictionary.difficultWords] || []}
                  />
                </div>
              </TabPanel>
              <TabPanel value={value} index={1} dir={theme.direction}>
                <div className={classes.dictionary}>
                  <DictionarySection words={dictionary.difficultWords || []} />
                </div>
              </TabPanel>
              <TabPanel value={value} index={2} dir={theme.direction}>
                <div className={classes.dictionary}>
                  <DictionarySection words={dictionary.deletedWords || []} />
                </div>
              </TabPanel>
            </SwipeableViews>
          </div>
        ) : (
          <span>Авторизуйтесь для просмотра изучаемых Вами слов</span>
        )}
      </main>
      <Footer />
    </>
  );
};

export default UserDictionary;
