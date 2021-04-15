import { createStyles, makeStyles, Theme } from '@material-ui/core';

const shadowColor = 'rgba(0, 0, 0, 0.5)';

const setShadowFilter = (radius: number) => ({
  filter: `drop-shadow(0 0 ${radius}px ${shadowColor})`,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gamesIcon: {
      marginBottom: theme.spacing(2),
      margin: '0 0.25rem',
      ...setShadowFilter(2),
      cursor: 'pointer',
      '&:hover, &:active': {
        ...setShadowFilter(4),
      },
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
    link: {
      textDecoration: 'none',
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
