import React from 'react';
import ReactPlayer from 'react-player';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Footer from '../Footer';
import Header from '../Header';
import useStyles from './styles';
import { PERSONS_INFO } from '../../constants';
import { IPersonInfo } from './types';

const MainPage: React.FC = () => {
  const classes = useStyles();

  const renderCard = (personInfo: IPersonInfo) => {
    return (
      <Card className={classes.card} key={personInfo.name}>
        <CardMedia className={classes.cover} image={personInfo.photo} title={personInfo.name} />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h4" align="left" className={classes.name}>
              {`${personInfo.name}`}
            </Typography>
            <Typography variant="subtitle1" align="left" color="inherit" className={classes.info}>
              {personInfo.about}
            </Typography>
            <Typography variant="h6" align="left" className={classes.contribution}>
              Вклад в общее дело:
            </Typography>
            <Typography variant="subtitle1" align="left" color="inherit" className={classes.info}>
              {personInfo.contribution}
            </Typography>
          </CardContent>
        </div>
      </Card>
    );
  };

  return (
    <div>
      <Header />
      <main className={classes.root}>
        <Typography variant="h5" component="div" className={classes.title}>
          О проекте
        </Typography>
        <Typography className={classes.brief}>
          RSCoon English – приложение для изучения иностранных слов, включающее электронный учебник
          с базой слов для изучения, мини-игры для их повторения, страницу статистики для
          отслеживания индивидуального прогресса.
        </Typography>
        <ReactPlayer
          playing={false}
          width="100%"
          height="500px"
          url="https://www.youtube.com/watch?v=pCjBetzC8ME"
          controls
          className={classes.video}
        />
        <Typography variant="h5" component="div" className={classes.title}>
          наша команда
        </Typography>
        <div className={classes.cardsWrapper}>
          {PERSONS_INFO.map((personInfo) => renderCard(personInfo))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
