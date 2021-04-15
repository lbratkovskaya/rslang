import React from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { ILangSwitchProps } from '../types';
import { useStyles } from '../styles';

const LangSwitcher: React.FC<ILangSwitchProps> = (props: ILangSwitchProps) => {
  const classes = useStyles();
  const handleSwitchLang = (e: React.ChangeEvent<{}>, checked: boolean): void => {
    props.handleSwitch(checked);
  };

  return (
    <div className={classes.switchLangWrapper}>
      <Typography variant="subtitle2" gutterBottom>
        Язык загадываемых слов
      </Typography>
      <FormControlLabel
        control={<Switch color="primary" checked={props.isLang} />}
        label={props.isLang ? 'En' : 'Ру'}
        onChange={handleSwitchLang}
      />
    </div>
  );
};

export default LangSwitcher;
