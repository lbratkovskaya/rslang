import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition, TransitionStatus } from 'react-transition-group';
import { Avatar, Button, Popover, Tooltip, Typography } from '@material-ui/core';
import { APPEAR_DURATION, APPEAR_STYLE, GAMES, IGame } from '../../constants';
import useStyles, { transitionStyles } from './styles';

const GamesPopover: React.FC = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? 'games-popover' : undefined;

  const handleClick = (event: React.SyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderGameCard = ({ title, background, route }: IGame) => {
    const style = { background, backgroundSize: 'cover' };

    const handleRouteChange = () => {
      setAnchorEl(null);
    };

    return (
      <Link className={classes.link} to={{ pathname: route, state: { fromWordbook: true } }}>
        <Button className={classes.gameCard} style={style} onClick={handleRouteChange}>
          {title}
        </Button>
      </Link>
    );
  };

  return (
    <>
      <Transition in appear timeout={APPEAR_DURATION}>
        {(state: TransitionStatus) => (
          <Tooltip title="Игры" placement="right">
            <Avatar
              src="../../assets/games.svg"
              onClick={handleClick}
              className={classes.gamesIcon}
              style={{ ...APPEAR_STYLE, ...transitionStyles[state] }}
            />
          </Tooltip>
        )}
      </Transition>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Typography variant="subtitle2" className={classes.title}>
          Начните игру с просмотренными словами
        </Typography>
        <div className={classes.gamesGrid}>
          {renderGameCard(GAMES.savannah)}
          {renderGameCard(GAMES.audio)}
          {renderGameCard(GAMES.sprint)}
          {renderGameCard(GAMES.memory)}
        </div>
      </Popover>
    </>
  );
};

export default GamesPopover;
