import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover, Typography, Tooltip, Checkbox } from '@material-ui/core';
import { Settings } from '@material-ui/icons';
import { setShowButtons, setShowTranslate } from '../../store/actions/wordBookActions';
import { IAppState } from '../../store/types';
import useStyles from './styles';

const SettingsPopover: React.FC = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const { showTranslate, showButtons } = useSelector((state: IAppState) => state.wordBook);

  const open = Boolean(anchorEl);
  const id = open ? 'settings-popover' : undefined;

  const handleClick = (event: React.SyntheticEvent) => {
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
    <div className={classes.root}>
      <Tooltip title="Настройки">
        <Settings
          aria-describedby={id}
          onClick={handleClick}
          className={classes.settingsButton}
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
          Отображать на карточках:
        </Typography>
        <Typography variant="overline" className={classes.typography}>
          Переводы
          <Checkbox
            checked={showTranslate}
            onChange={handleShowTranslateChange}
            size="small"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Typography>
        <Typography variant="overline" className={classes.typography}>
          Кнопки
          <Checkbox
            checked={showButtons}
            onChange={handleShowButtonsChange}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
          />
        </Typography>
      </Popover>
    </div>
  );
};

export default SettingsPopover;
