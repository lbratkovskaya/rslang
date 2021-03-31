import { makeStyles } from '@material-ui/core';
import { MEMORY } from '../../constants';
// import { red200 } from 'material-ui/styles/colors';

const useStyles = makeStyles(() => ({
  // root: {
  //   maxWidth: 345,
  // },
  // media: {
  //   height: '100%',
  //   width: '100%',
  // },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  sheet: {
    background: `url(${MEMORY.sheet})`,
    backgroundSize: 'cover',
    width: '22%',
    height: '28%',
    // transition: '0.6s',
    // transformStyle: 'preserve-3d',
    // transform: 'rotateY(180deg)',
    //transform: 'rotate(-90deg)',
  },
  imageNone: {
    opacity: '0',
  },
  image: {
    width: '100%',
    height: 'calc(width * 0.6666)',
    transform: 'rotateY(180deg)',
  },
  gameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
    padding: '2%',
    height: 'calc(100vh - 80px)',
    background: `url(${MEMORY.background})`,
    backgroundSize: 'cover'
  },
  controlsWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  cardsWrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90vw',
    height: '75vh',
    flexWrap: 'wrap',
    marginBottom: '3vh',
    paddingTop: '3vh',
  },
  card: {
    width: '22%',
    height: '28%',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  content: {
    marginTop: 'auto',
  },
  cardWithText: {
    width: '22%',
    height: '28%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  text: {
    maxWidth: '100%',
    fontSize: '2vw',
    margin: '0 1%',
    transform: 'rotateY(180deg)',
  },
  textNone: {
    fontSize: '0',
  },
}));

export default useStyles;
