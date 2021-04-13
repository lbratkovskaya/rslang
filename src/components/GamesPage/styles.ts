import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { HEADER_HEIGHT } from '../../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '0 2rem 1rem',
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      margin: '1rem 0',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      fontWeight: 500,
    },
    gamesGrid: {
      minHeight: `calc(100vh - ${HEADER_HEIGHT}px - 6rem)`,
      width: '100%',
      maxWidth: 1600,
      display: 'grid',
      gap: '1rem',
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
      fontSize: '1.5rem',
      transition: 'filter 0.25s, background 0.25s',
      '&:hover': {
        filter: 'brightness(1)',
      },
    },
    link: {
      textDecoration: 'none',
      width: '100%',
      height: '100%',
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
