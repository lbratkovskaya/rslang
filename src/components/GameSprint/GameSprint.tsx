import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import { FullScreenBtn, FullScreenWrapper } from '../commonComponents';
import Header from '../Header';
import SprintGamePlay from './SprintGamePlay';
import StartGameSprint from './StartGameSprint';
import { IAppState } from '../../store/types';
import useStyles from './style';

const GameSprint: React.FC = () => {
  const classes = useStyles();
  const sprintInfo = useSelector((state: IAppState) => state.sprint);
  const [fullSize, setFullSize] = useState(false);
  const handle = useFullScreenHandle();
  const handleFullSize = () => {
    setFullSize(!fullSize);
    return fullSize ? handle.exit() : handle.enter();
  };
  const fullScreenClass = fullSize ? ` ${classes.wrapperFull}` : ` ${classes.wrapperNotFull}`;

  const startComponent = (
    <>
      <div className={`${classes.sprintWrapper}${fullScreenClass}`}>
        {!sprintInfo.isStartGame ? <StartGameSprint /> : <SprintGamePlay />}
      </div>
      <FullScreenBtn changeScreen={handleFullSize} />
    </>
  );

  return (
    <>
      <Header />
      <FullScreenWrapper component={startComponent} handle={handle} />
    </>
  );
};

export default GameSprint;
