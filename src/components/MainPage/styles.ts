import { createStyles, makeStyles } from '@material-ui/core';
import { MIN_MAIN_HEIGHT } from '../../constants';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: MIN_MAIN_HEIGHT,
      display: 'flex',
      justifyContent: 'center',
    },
  })
);

export default useStyles;
