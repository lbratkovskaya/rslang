import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFullScreenHandle } from 'react-full-screen';
import SavannahGamePlay from './SavannahGamePlay';
import SavannahStartWindow from './SavannahStartWindow';
import { FullScreenWrapper, FullScreenBtn, Countdown } from '../commonComponents';
import Header from '../Header';
import { SAVANNAH } from '../../constants';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const GameSavannah: React.FC = () => {
  const savannahData = useSelector((state: IAppState) => state.savannah);
  const { isCountDown } = useSelector((state: IAppState) => state.games);
  const [fullSize, setFullSize] = useState(false);
  const classes = useStyles();
  const handle = useFullScreenHandle();
  const fullScreenClass = fullSize ? ` ${classes.wrapperFull}` : ` ${classes.wrapperNotFull}`;
  const [style, setStyle] = useState({});

  const handleFullSize = () => {
    setFullSize(!fullSize);
    return fullSize ? handle.exit() : handle.enter();
  };

  useEffect(() => {
    const bg = new Image();
    bg.onload = () => setStyle({ opacity: 1 });
    bg.onerror = () => setStyle({ opacity: 1 });
    bg.src = SAVANNAH.background;
  }, []);

  const renderComponent = () => {
    if (!isCountDown) {
      return !savannahData.isStartGame ? <SavannahStartWindow /> : <SavannahGamePlay />;
    }
    return <Countdown />;
  };

  const gameComponent = (
    <div>
      <div className={`${classes.savannahWrapper}${fullScreenClass}`} style={style}>
        {renderComponent()}
      </div>
      <FullScreenBtn changeScreen={handleFullSize} />
    </div>
  );

  return (
    <div>
      <div className={classes.headerWrapper}>
        <Header />
      </div>
      <FullScreenWrapper component={gameComponent} handle={handle} />
    </div>
  );
};

export default GameSavannah;
