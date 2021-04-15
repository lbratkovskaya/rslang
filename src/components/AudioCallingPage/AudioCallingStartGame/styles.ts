import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      height: '50vh',
    },
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    title: {
      color: 'white',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    par: {
      width: '70%',
      fontSize: '1rem',
      margin: '1% auto',
      color: 'white',
    },
    subwrapper: {
      width: 'max-content',
      margin: '1% auto',
    },
  })
);

export default useStyles;
