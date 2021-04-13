/* eslint-disable react/jsx-props-no-spreading */
import React, { PropsWithChildren, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tab, Tabs, Typography, useTheme } from '@material-ui/core';
import UserDictionarySection from './UserDictionarySection';
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
      {value === index && children}
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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    getWords();
  }, [currentUser]);

  return (
    <>
      <Header />
      <main>
        <Typography variant="h5" className={classes.title}>
          Мой словарь
        </Typography>
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
                <Tab label="Изучаемые слова" {...a11yProps(0)} />
                <Tab label="Сложные слова" {...a11yProps(1)} />
                <Tab label="Удалённые слова" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
              <div className={classes.dictionary}>
                <UserDictionarySection
                  words={dictionary.learningWords || []}
                  removeOnDifficultyChange={false}
                />
              </div>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <div className={classes.dictionary}>
                <UserDictionarySection
                  words={dictionary.difficultWords || []}
                  removeOnDifficultyChange
                />
              </div>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              <div className={classes.dictionary}>
                <UserDictionarySection
                  words={dictionary.deletedWords || []}
                  removeOnDifficultyChange={false}
                />
              </div>
            </TabPanel>
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
