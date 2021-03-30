import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Typography, Switch } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { setShowButtons, setShowTranslate } from '../../store/actions/wordBookActions';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const SettingsPopover: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const { showTranslate, showButtons } = useSelector((state: IAppState) => state.wordBook);

  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleShowTranslateChange = () => {
    dispatch(setShowTranslate(!showTranslate));
  };

  const handleShowButtonsChange = () => {
    dispatch(setShowButtons(!showButtons));
  };

  return (
    <div>
      <Settings
        aria-describedby={id}
        onClick={handleClick}
        className={classes.settingsButton}
        color="action"
      />
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
        <Typography variant="h6" className={classes.title}>
          Настройки
        </Typography>
        <Typography className={classes.typography}>
          Показывать перевод на русский язык:
          <Switch
            checked={showTranslate}
            onChange={handleShowTranslateChange}
            color="primary"
            // name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
        <Typography className={classes.typography}>
          Показывать кнопки:
          <Switch
            checked={showButtons}
            onChange={handleShowButtonsChange}
            color="primary"
            // name="checkedB"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
      </Popover>
    </div>
  );
};

export default SettingsPopover;
