import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    circle: {
      width: '70px',
      height: '70px',
      background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)',
    },
    label: {
      fontSize: '24px',
      display: 'flex',
      alignItems: 'center',
      margin: '0 auto',
      width: 'max-content',
      textAlign: 'center',
      color: 'white',
    },
    input: {
      width: '50%',
      fontSize: '24px',
      marginLeft: '10px',
      root: {
        padding: '0px',
      },
    },
  })
);

export default useStyles;
