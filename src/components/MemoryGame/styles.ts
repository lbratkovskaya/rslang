import { makeStyles } from '@material-ui/core';
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
    backgroundColor: 'red',
    width: '22%',
    height: '28%',
  },
  imageNone: {
    opacity: '0',
  },
  image: {
    width: '100%',
    height: 'calc(width * 0.6666)',
  },
  gameWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100vw',
    padding: '2%',
    height: 'calc(100vh - 80px)',
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
  },
  text: {
    maxWidth: '100%',
    fontSize: '2vw',
    margin: '0 1%',
  },
  textNone: {
    fontSize: '0',
  },
}));

export default useStyles;
