import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { ITimerProps, IRenderTimeProps } from '../types';
import useStyles from '../styles';

const Timer: React.FC<ITimerProps> = (props: ITimerProps) => {
  const styles = useStyles();
  const renderTime: React.FC<IRenderTimeProps> = (renderTimeProps: IRenderTimeProps) => {
    if (renderTimeProps.remainingTime === 0) {
      return <div className={styles.gameOver}>Game over</div>;
    }
    return (
      <div className={styles.timer}>
        <div className={styles.value}>{renderTimeProps.remainingTime}</div>
      </div>
    );
  };

  return (
    <CountdownCircleTimer
      key="timer"
      isPlaying
      duration={props.gameTime}
      colors={[
        ['#3f51b5', 0.5],
        ['#3f51b5', 0.45],
        ['#A30000', 0.05],
      ]}
      initialRemainingTime={props.gameTime}
      onComplete={props.handleOnComplite}
      trailColor="none"
      size={props.size}
      strokeWidth={8}
      trailStrokeWidth={8}>
      {renderTime}
    </CountdownCircleTimer>
  );
};

export default Timer;
