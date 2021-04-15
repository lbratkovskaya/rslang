import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import { Countdown, FullScreenBtn, FullScreenWrapper } from '../commonComponents';
import Header from '../Header';
import SprintGamePlay from './SprintGamePlay';
import StartGameSprint from './StartGameSprint';
import { SPRINT } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './style';

const GameSprint: React.FC = () => {
  const classes = useStyles();
  const sprintInfo = useSelector((state: IAppState) => state.sprint);
  const { isCountDown } = useSelector((state: IAppState) => state.games);
  const [fullSize, setFullSize] = useState(false);
  const [style, setStyle] = useState({});
  const handleFullScreenMode = useFullScreenHandle();
  const handleFullSize = () => {
    setFullSize(!fullSize);
    return fullSize ? handleFullScreenMode.exit() : handleFullScreenMode.enter();
  };

  useEffect(() => {
    const bg = new Image();
    bg.onload = () => setStyle({ opacity: 1 });
    bg.onerror = () => setStyle({ opacity: 1 });
    bg.src = SPRINT.background;
  }, []);

  const renderComponent = () => {
    if (!isCountDown) {
      return !sprintInfo.isStartGame ? <StartGameSprint /> : <SprintGamePlay />;
    }
    return <Countdown />;
  };

  const fullScreenClass = fullSize ? ` ${classes.wrapperFull}` : ` ${classes.wrapperNotFull}`;

  const startComponent = (
    <div>
      <div className={`${classes.sprintWrapper}${fullScreenClass}`} style={style}>
        {renderComponent()}
      </div>
      <FullScreenBtn changeScreen={handleFullSize} />
    </div>
  );

  return (
    <div>
      <Header />
      <FullScreenWrapper component={startComponent} handle={handleFullScreenMode} />
    </div>
  );
};

export default GameSprint;
