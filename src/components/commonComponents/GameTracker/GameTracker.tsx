import React from 'react';
import { Slider } from '@material-ui/core';
import IGameTracker from './types';
import useStyles from './styles';

const GameTracker: React.FC<IGameTracker> = (props: IGameTracker) => {
  const styles = useStyles();

  return (
    <div className="tracker">
      <label className={styles.label} htmlFor="tracker">
        {props.index}-{props.end}
      </label>
      <Slider
        id="tracker"
        min={0}
        max={props.end}
        onChange={() => undefined}
        className={styles.input}
        value={props.index}
        aria-labelledby="discrete-slider-small-steps"
      />
    </div>
  );
};

export default GameTracker;
