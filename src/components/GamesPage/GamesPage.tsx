import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import { GAMES, IGame } from '../../constants';
import useStyles from './styles';

const GamesPage: React.FC = () => {
  const classes = useStyles();

  const renderGameCard = ({ title, background, route }: IGame) => {
    const style = { background, backgroundSize: 'cover' };

    return (
      <Link className={classes.link} to={route}>
        <Button className={classes.gameCard} style={style}>
          {title}
        </Button>
      </Link>
    );
  };

  return (
    <div>
      <Header />
      <main className={classes.root}>
        <Typography variant="h5" className={classes.title}>
          Мини-игры
        </Typography>
        <div className={classes.gamesGrid}>
          {renderGameCard(GAMES.savannah)}
          {renderGameCard(GAMES.audio)}
          {renderGameCard(GAMES.sprint)}
          {renderGameCard(GAMES.memory)}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GamesPage;
