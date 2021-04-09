import { Button, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../store/types';
import { IGameModeProps } from '../types';
import GAME_MODE_DATA from '../constants';
import { useStyles } from '../styles';

const GameMode: React.FC<IGameModeProps> = ({ changeModeFc }: IGameModeProps) => {
  const classes = useStyles();
  const { gameMode } = useSelector((state: IAppState) => state.settings);
  const [mode, setMode] = useState(gameMode);
  const handleChangeMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setMode(name);
    changeModeFc(name);
  };

  return (
    <>
      <Typography className={classes.gameModeTitle}>Выберите уровень сложности</Typography>
      <div className={classes.gameModeWrapper}>
        {Object.values(GAME_MODE_DATA).map((el) => {
          return (
            <Button
              variant="contained"
              size="small"
              key={el.label}
              name={el.name}
              color="secondary"
              className={classes.modeBtnStyle}
              disabled={el.name === mode}
              onClick={handleChangeMode}>
              {el.label}
            </Button>
          );
        })}
      </div>
    </>
  );
};

export default GameMode;
