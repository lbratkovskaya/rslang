import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Popover, Tooltip, Typography } from '@material-ui/core';
import { SportsEsportsOutlined } from '@material-ui/icons';
import { GAMES, IGame } from '../../constants';
import useStyles from './styles';

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
      <Tooltip title="Игры">
        <SportsEsportsOutlined
          aria-describedby={id}
          onClick={handleClick}
          className={classes.gamesIcon}
          color="action"
        />
      </Tooltip>
      <Popover
        id={id}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
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
