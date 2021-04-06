import { createStyles, makeStyles } from '@material-ui/core';

const shadowColor = 'rgba(0, 0, 0, 0.4)';

const setShadowFilter = (radius: number) => ({
  filter: `drop-shadow(0 0 ${radius}px ${shadowColor})`,
});

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      padding: '0.5rem 1rem',
    },
    typography: {
      padding: '0 0 0 0.5rem',
      textAlign: 'right',
    },
    settingsButton: {
      position: 'absolute',
      right: '-2rem',
      cursor: 'pointer',
      transform: 'translateY(3px)',
      transition: 'filter 0.1s',
      ...setShadowFilter(1),
      '&:hover, &:active': {
        ...setShadowFilter(2),
      },
    },
  })
);

export default useStyles;
