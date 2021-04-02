import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { ITimerProps, IRenderTimeProps } from '../types';
import useStyles from '../styles';

const Timer: React.FC<ITimerProps> = (props: ITimerProps) => {

  const styles = useStyles();
  const renderTime: React.FC<IRenderTimeProps> = (props: IRenderTimeProps) => {
    if (props.remainingTime === 0) {
      return <div className={styles.gameOver}>Game over</div>;
    }
    return (
      <div className={styles.timer}>
        <div className={styles.value}>{props.remainingTime}</div>
      </div>
    );
  };

  return (
      <CountdownCircleTimer
        key={'timer'}
        isPlaying={true}
        duration={props.gameTime}
        colors={[["#3f51b5", 0.5], ["#3f51b5", 0.45], ["#A30000", 0.05]]}
        initialRemainingTime={props.gameTime}
        onComplete={props.handleOnComplite}
        trailColor={'none'}
        size={props.size}
        children={renderTime}
        strokeWidth={8}
        trailStrokeWidth={8}
      />
  );
};

export default Timer;

//size?: number
  /** Path stroke width. Default: 12 */
 // strokeWidth?: number
  /** Trail stroke width */
  //trailStrokeWidth?: number
  /** Path stroke line cap. Default: "round" */
  //strokeLinecap?: 'round' | 'square'
  /** Progress path rotation direction. Default: "clockwise" */
  //rotation?: 'clockwise' | 'counterclockwise'
  /** Circle trail color - takes any valid color format (HEX, rgb, rgba, etc.). Default: #d9d9d9 */
  //trailColor?: string