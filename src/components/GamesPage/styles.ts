import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { HEADER_HEIGHT } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      padding: '0.5rem 1rem 0',
    },
    gamesGrid: {
      padding: '1rem 0',
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
      display: 'grid',
      justifyItems: 'center',
      alignItems: 'center',
      gridTemplateColumns: 'repeat(2, 1fr)',
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
    gameCard: {
      width: '100%',
      height: '100%',
      color: 'rgba(255, 255, 255, 1)',
      textShadow: '0 0 4px rgba(0, 0, 0, 0.75)',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      filter: 'brightness(0.85)',
      transition: 'filter 0.25s, background 0.25s',
      '&:hover': {
        filter: 'brightness(1)',
      },
    },
    link: {
      textDecoration: 'none',
      width: '95%',
      height: '95%',
      // maxHeight: 340,
    },
  })
);

export const transitionStyles: { [key: string]: {} } = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0, transform: 'scale(0)' },
  exited: { opacity: 0 },
};

export default useStyles;
