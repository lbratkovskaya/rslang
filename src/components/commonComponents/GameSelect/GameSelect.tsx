import React from 'react';
import { NativeSelect } from '@material-ui/core';
import { IGroup, WORDBOOK_GROUPS } from '../../../constants';
import { IGameSelectProps } from '../types';
import useStyles from '../styles';

const GameSelect: React.FC<IGameSelectProps> = (props: IGameSelectProps) => {
  const classes = useStyles();
  const createArrayFromNumber = (number: number): Array<number> => Array.from(Array(number).keys());
  const changePropsArray = (arr: Array<IGroup>): Array<string> => arr.map((el: IGroup) => el.label);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const colorToNumber = WORDBOOK_GROUPS.findIndex((el: IGroup) => e.target.value === el.label);
    const currentLevel: string | number = colorToNumber === -1 ? e.target.value : colorToNumber;
    props.changeSelectFc(currentLevel);
  };
  const selectItems = !Array.isArray(props.selectData)
    ? createArrayFromNumber(props.selectData)
    : changePropsArray(props.selectData);

  const selectedLevel = Array.isArray(props.selectData)
    ? WORDBOOK_GROUPS[props.value].label
    : props.value;

  const renderOption = (value: string | number) => {
    const editedValue = Number.isInteger(value) ? Number(value) + 1 : value;
    return (
      <option value={editedValue} key={editedValue}>
        {editedValue}
      </option>
    );
  };

  return (
    <div className={classes.savannahMenuLevel}>
      <span className={classes.savannahSelectorName}>{props.selectName}</span>
      <NativeSelect
        id={props.selectName}
        onChange={handleChange}
        disabled={props.disabled}
        value={selectedLevel}>
        {selectItems.map((el: string | number) => renderOption(el))}
      </NativeSelect>
    </div>
  );
};

export default GameSelect;
