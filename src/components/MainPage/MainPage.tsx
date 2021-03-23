import React from 'react';

import Footer from '../Footer';
import Header from '../Header';
import useStyles from './styles';



const MainPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div>
      <Header />
      <main className={classes.root}>Weclome Page</main>
      <Footer />
    </div>
  );
};

export default MainPage;
