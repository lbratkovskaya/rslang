import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      display: 'block',
      margin: '2% auto',
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
    MuiSkip: {
      display: 'block',
      margin: '2% auto',
    },
    '@keyframes fadeOut': {
      '0%': {
        opacity: 0,
        transform: 'translateY(-5rem)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    '@keyframes fadeIn': {
      '0%': {
        opacity: 0,
        transform: 'translateY(5rem)',
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
    typo: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      lineHeight: '30px',
      margin: '1% auto',
    },
    moreInfo: {
      width: 'max-content',
      margin: '2% auto',
      animation: '$fadeIn 0.2s ease-in-out',
    },
    soundInfo: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    fab: {
      display: 'block',
      height: '30px',
      width: '30px',
      padding: '0',
      outline: 'none',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
    },
    img: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      '&:hover': {
        transform: 'scale(1.1)',
        transition: 'all .3s ease-in-out',
        backgroundColor: 'green',
      },
    },
  })
);

export default useStyles;
