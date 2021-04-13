import { makeStyles } from '@material-ui/core';
import { HEADER_HEIGHT, STATS } from '../../constants';

const defaultBG = {
  background: 'rgba(255, 255, 255, 0.75)',
  transition: 'background 0.25s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.95)',
  },
};

const useStyles = makeStyles(() => ({
  statsWrapper: {
    padding: '1rem 0 0',
    boxSizing: 'border-box',
    backgroundSize: 'cover',
    width: '100%',
    minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    position: 'relative',
    userSelect: 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&::before': {
      background: STATS.background,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: 'brightness(0.7)',
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
    },
  },
  title: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#fafafa',
  },
  totalWrapper: {
    width: '400px',
    marginTop: '20px',
    ...defaultBG,
  },
  gamesWrapper: {
    display: 'grid',
    gridTemplateColumns: '300px 300px',
    justifyContent: 'space-between',
    justifyItems: 'center',
    rowGap: '30px',
    paddingTop: '20px',
  },
  gameTable: {
    width: '260px',
    ...defaultBG,
  },
  graphsWrapper: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-around',
    paddingTop: '30px',
    paddingBottom: '50px',
    flexWrap: 'wrap',
  },
  graphWrapper: {
    width: '460px',
    boxSizing: 'border-box',
    padding: '10px',
    borderRadius: '4px',
    ...defaultBG,
  },
  warning: {
    margin: 'auto',
    color: '#fafafa',
  },

  '@media (max-width: 680px)': {
    gamesWrapper: {
      gridTemplateColumns: '240px 240px',
    },
    gameTable: {
      width: '230px',
    },
  },
}));

export default useStyles;
