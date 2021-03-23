import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    range: {
      display: 'flex',
      width: '100px',
      position: 'relative',
      marginLeft: '20px',
    },
    img: {
      width: '28px',
      height: '28px',
      marginRight: '10px',
      fill: 'white',
    },
    span: {
      width: '30px',
      fontSize: '18px',
      lineHeight: '20px',
    },
  })
);

export default useStyles;
