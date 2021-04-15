import { createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    main: {
      height: '89vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      background: 'url(assets/audio_calling_bg.jpg) rgb(133, 129, 129) no-repeat',
      backgroundBlendMode: 'multiply',
      backgroundSize: 'cover',
    },
    wrapperFull: {
      height: '100vh',
    },
    wrapperNotFull: {
      height: 'calc(100vh - 80px)',
    },
  })
);

export default useStyles;
