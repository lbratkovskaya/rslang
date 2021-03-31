import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Fullscreen, FullscreenExit } from '@material-ui/icons';
import { IFullScreenBtnProps } from '../types';
import useStyles from '../styles';

const FullScreenBtn: React.FC<IFullScreenBtnProps> = (props: IFullScreenBtnProps) => {
  const [fullSize, setFullSize] = useState(false);
  const fullOrNormalSize = fullSize ? 'full' : 'normal';
  const classes = useStyles();

  const handleFullSize = () => {
    setFullSize(!fullSize);
    props.changeScreen();
  };

  return (
    <IconButton className={classes.fullScreenBtn} id={fullOrNormalSize} onClick={handleFullSize}>
      {fullSize ? <FullscreenExit /> : <Fullscreen />}
    </IconButton>
  );
};

export default FullScreenBtn;
