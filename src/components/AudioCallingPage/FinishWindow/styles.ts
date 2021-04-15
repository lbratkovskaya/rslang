import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      maxHeight: '50%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
    },
    newGame: {
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      margin: '5px',
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      backgroundColor: 'blue',
      transition: 'all .3s ease-in-out',
      boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.75)',
      '&:hover': {
        backgroundColor: '#1C2391',
        transition: 'all .2s ease-in-out',
      },
    },
  })
);

export default useStyles;
