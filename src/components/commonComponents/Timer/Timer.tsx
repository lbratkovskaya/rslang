import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { ITimerProps } from '../types'

const Timer: React.FC<ITimerProps> = (props: ITimerProps) => {

  const renderTime: React.FC<ITimerProps> = (props) => {
    if (props.gameTime === 0) {
      return <div className="timer">{props.timerText}</div>;
    }
    return (
      <div className="timer">
        <div className="value">{props.gameTime}</div>
      </div>
    );
  };

  return (
      <CountdownCircleTimer
        key={'timer'}
        isPlaying={true}
        duration={props.gameTime}
        colors={[["#3f51b5", 1], ["#F7B801", 0.05], ["#A30000", 0.05]]}
        initialRemainingTime={props.gameTime}
        onComplete={props.handleOnComplite}
        trailColor={'none'}
        size={props.size}
        children={renderTime}
      />
  );
};

export default Timer;