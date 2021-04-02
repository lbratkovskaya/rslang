import { FullScreenHandle } from 'react-full-screen';
import { IGroup } from '../../constants';

export interface IGameSelectProps {
  changeSelectFc: (item: string | number) => void;
  selectData: Array<IGroup> | number;
  selectName: string;
}

export interface ILangSwitchProps {
  handleSwitch: (checked: boolean) => void;
  isLang: boolean;
}

export interface IFullScreenBtnProps {
  changeScreen: () => void;
}

export interface IGameExitBtnProps {
  clickBtn: () => void;
}

export interface IFullScreenWrapperProps {
  component: {};
  handle: FullScreenHandle;
}

export interface ITimerProps {
  gameTime: number;
  size: number;
  timerText: string;
  handleOnComplite: () => void;
}