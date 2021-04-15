import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useFullScreenHandle } from 'react-full-screen';
import AudioCallingStartGame from './AudioCallingStartGame';
import Countdown from '../commonComponents/Countdown/Countdown';
import FinishWindow from './FinishWindow';
import { FullScreenWrapper, FullScreenBtn } from '../commonComponents';
import GameWindow from './GameWindow';
import Header from '../Header';
import { resetEndGame, clickStartGame } from '../../store/actions/audioCallingActions';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const AudioCallingPage: React.FC = () => {
  const audioCallingData = useSelector((state: IAppState) => state.audioCalling);
  const isCountdown = useSelector((state: IAppState) => state.games.isCountDown);
  const location = useLocation();
  const styles = useStyles();
  const handle = useFullScreenHandle();
  const [fullSize, setFullSize] = useState(false);
  const isCameFromWordbook = location.state?.fromWordbook;
  const fullScreenClass = fullSize ? ` ${styles.wrapperFull}` : ` ${styles.wrapperNotFull}`;

  const dispatch = useDispatch();
  const toggleResetEndGame = () => dispatch(resetEndGame());
  const startGame = (isStart: boolean) => dispatch(clickStartGame(isStart));

  const handleFullSize = () => {
    setFullSize(!fullSize);
    return fullSize ? handle.exit() : handle.enter();
  };

  const handleExitGame = () => {
    startGame(false);
    toggleResetEndGame();
  };

  const renderFields = useCallback(() => {
    if (isCountdown) {
      return <Countdown />;
    }
    if (audioCallingData.isEnd) {
      return <FinishWindow />;
    }
    if (audioCallingData.isStart && !audioCallingData.isEnd) {
      return <GameWindow />;
    }
    return <AudioCallingStartGame />;
  }, [audioCallingData.isStart, audioCallingData.isEnd, isCountdown]);

  useEffect(() => {
    if (!isCameFromWordbook) {
      handleExitGame();
    }
  }, []);

  const gameComponent = (
    <main className={`${styles.main}${fullScreenClass}`}>
      {renderFields()}
      <FullScreenBtn changeScreen={handleFullSize} />
    </main>
  );

  return (
    <div>
      <Header />
      <FullScreenWrapper component={gameComponent} handle={handle} />
    </div>
  );
};

export default AudioCallingPage;
