import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import { changeCountDown } from '../../../store/actions/gamesActions';
import { COUNTDOWN, timeout } from '../../../constants';
import 'react-circular-progressbar/dist/styles.css';
import { circularStyle, useStyles } from '../styles';

const Countdown: React.FC = () => {
  const dispatch = useDispatch();
  const countDown = (isCountEnd: boolean) => dispatch(changeCountDown(isCountEnd));
  const [countValue, setCountValue] = useState(COUNTDOWN.delay);
  const [precentage, setPercentage] = useState(COUNTDOWN.percentage);
  const classes = useStyles();
  const countDownTimeOut = () => {
    setCountValue(countValue - 1);
  };

  const percentageBar = () => {
    setPercentage(precentage - 1);
  };

  useEffect(() => {
    const timeOutBar = setTimeout(() => percentageBar(), COUNTDOWN.timeOutPetcent);
    return () => clearTimeout(timeOutBar);
  });

  useEffect(() => {
    if (countValue === 0) countDown(false);
    const timeOut = setTimeout(() => countDownTimeOut(), timeout);
    return () => clearTimeout(timeOut);
  }, [countValue]);

  return (
    <div className={classes.countDown}>
      <CircularProgressbar
        value={precentage}
        strokeWidth={50}
        text={`${countValue}`}
        styles={circularStyle}
      />
    </div>
  );
};

export default Countdown;
