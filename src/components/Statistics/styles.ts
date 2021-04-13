import { makeStyles } from '@material-ui/core';
import { STATS } from '../../constants';

const useStyles = makeStyles(() => ({
  statsWrapper: {
    background: STATS.background,
    backgroundSize: 'cover',
    width: '100%',
    minHeight: '100vh',
  },
  totalWrapper: {
    width: '400px',
    margin: 'auto',
    marginTop: '20px',
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
  },
  graphsWrapper: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-around',
    paddingTop: '30px',
    paddingBottom: '30px',
    flexWrap: 'wrap',
  },
  graphWrapper: {
    width: '460px',
    boxSizing: 'border-box',
    padding: '10px',
    backgroundColor: '#ffffff',
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
