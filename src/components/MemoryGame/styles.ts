import { makeStyles } from '@material-ui/core';
import { MEMORY } from '../../constants';

const useStyles = makeStyles(() => ({
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  switcherWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switcher: {
    zIndex: 1000,
  },
  button: {
    height: '38px',
    marginLeft: 'auto',
    marginRight: '1vw',
  },
  sheet4: {
    background: `url(${MEMORY.sheet})`,
    backgroundSize: 'cover',
    width: '22%',
    height: '28%',
  },
  sheet8: {
    background: `url(${MEMORY.sheet})`,
    backgroundSize: 'cover',
    width: '22%',
    height: '22%',
    margin: '1vh 1vw',
  },
  sheet10: {
    background: `url(${MEMORY.sheet})`,
    backgroundSize: 'cover',
    width: '17%',
    height: '20%',
    margin: '0.75vh 0.75vw',
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
    minWidth: '500px',
    padding: '2%',
    height: 'calc(100vh - 80px)',
    background: `url(${MEMORY.background})`,
    backgroundSize: 'cover',
    color: 'white',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 80,
      left: 0,
      width: '100%',
      height: 'calc(100vh - 80px)',
      background: 'rgba(0, 0, 0, 0.05)',
    },
  },
  cardsWrapper: {
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90vw',
    height: '75vh',
    flexWrap: 'wrap',
    marginBottom: '3vh',
    paddingTop: '3vh',
  },
  card4: {
    width: '22%',
    height: '28%',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  card8: {
    width: '22%',
    height: '22%',
    margin: '1vh 1vw',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  card10: {
    width: '17%',
    height: '20%',
    margin: '0.75vh 0.75vw',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  content: {
    marginTop: 'auto',
  },
  cardWithText4: {
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
  cardWithText8: {
    width: '22%',
    height: '22%',
    margin: '1vh 1vw',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transition: '0.6s',
    transformStyle: 'preserve-3d',
    transform: 'rotateY(180deg)',
  },
  cardWithText10: {
    width: '17%',
    height: '20%',
    margin: '0.75vh 0.75vw',
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
    userSelect: 'none',
  },
  textNone: {
    fontSize: '0',
  },
  controlsWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    '&:after': {
      content: '""',
      zIndex: 1000,
    },
  },
  selectorsWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  leftWrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  canselBtnWrapper: {
    marginLeft: 'auto',
  },
  tableContainer: {
    maxWidth: 350,
    maxHeight: 350,
    margin: '10px auto',
    paddingTop: '20px',
  },
  table: {
    maxWidth: '350px',
    paddingLeft: '20px',
    paddingRight: '20px',
    marginBottom: '30px',
  },
  incorrectAnswer: {
    color: 'red',
  },
  correctAnswer: {
    color: 'green',
  },
  title: {
    fontSize: '96px',
  },
  gameSelect: {
    color: '#FFFFFF',
    fontSize: '18px',
  },
  empty: {
    width: '100%',
    height: '60px',
  },
  gameMenuLevel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    fontSize: '1.5rem',
    marginBottom: '1rem',
    '& > div::before': {
      borderColor: '#3f51b5 !important',
    },
    '& > div::after': {
      borderColor: '#3f51b5 !important',
    },
    '& select': {
      color: '#FFFFFF !important',
      '&[disabled]': {
        opacity: 0.6,
      },
    },
    '& option': {
      color: '#000000 !important',
    },
    '& svg': {
      color: '#FFFFFF !important',
    },
  },
  levelSelectorName: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    fontSize: '18px',
  },
  volumeSettings: {
    width: '80%',
  },
  btnColor: {
    color: '#FFFFFF !important',
    '&:hover': {
      opacity: 0.7,
    },
  },
  list: {
    paddingTop: 80,
    width: 250,
    height: '100%',
    backgroundColor: '#212229 !important',
  },
  '@media (max-width: 680px)': {
    leftWrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    title: {
      fontSize: '70px',
    },
  },
}));

export default useStyles;
