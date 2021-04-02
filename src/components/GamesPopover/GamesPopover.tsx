import React, { useState } from 'react';
import { Button, Popover, Tooltip, Typography } from '@material-ui/core';
import { SportsEsportsOutlined } from '@material-ui/icons';
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

  const renderGameCard = (title: string, background?: string) => {
    const style = { background, backgroundSize: 'cover' };
    return (
      <Button className={classes.gameCard} style={style}>
        {title}
      </Button>
    );
  };

  return (
    <div className={classes.root}>
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
          {renderGameCard('Саванна', 'url(../../assets/savannah-bg.jpg) center no-repeat')}
          {renderGameCard('Аудиовызов')}
          {renderGameCard('Спринт')}
          {renderGameCard('Своя игра')}
        </div>
      </Popover>
    </div>
  );
};

export default GamesPopover;
