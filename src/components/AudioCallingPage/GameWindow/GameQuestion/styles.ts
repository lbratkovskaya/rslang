import { createStyles, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    MuiButton: {
      width: '200px',
      height: '200px',
      margin: '0 auto',
      background:
        'radial-gradient(circle, rgba(41,34,181,1) 3%, rgba(53,116,125,1) 30%, rgba(215,58,193,1) 76%, rgba(0,212,255,1) 99%)',
      borderRadius: '50%',
      marginBottom: '1rem',
      transition: 'all .2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .2s ease-in-out',
      },
    },
  })
);

export default useStyles;
