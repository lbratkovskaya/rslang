import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gamesIcon: {
      cursor: 'pointer',
      transition: 'color 0.2s',
      '&:hover, &:active': {
        color: 'rgba(0, 0, 0, 1)',
      },
    },
    root: {
      display: 'inline-flex',
      width: '2rem',
      justifyContent: 'center',
    },
    title: {
      padding: '0.5rem 1rem 0',
    },
    gamesGrid: {
      padding: theme.spacing(1) / 2,
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
    gameCard: {
      margin: theme.spacing(1) / 2,
      width: 210,
      height: 140,
      color: 'rgba(255, 255, 255, 1)',
      textShadow: '0 0 4px rgba(0, 0, 0, 0.75)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      filter: 'brightness(0.85)',
      transition: 'filter 0.25s, background 0.25s',
      '&:hover': {
        filter: 'brightness(1)',
      },
    },
  })
);

export default useStyles;
