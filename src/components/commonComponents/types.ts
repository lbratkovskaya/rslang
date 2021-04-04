import { FullScreenHandle } from 'react-full-screen';
import { IGroup } from '../../constants';

export interface IGameSelectProps {
  changeSelectFc: (item: string | number) => void;
  selectData: Array<IGroup> | number;
  selectName: string;
  disabled: boolean;
  value: number;
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

export interface IRenderTimeProps {
  remainingTime: number;
}

export interface ITimerProps {
  gameTime: number;
  size: number;
  handleOnComplite: () => void;
  // isGameStarted: boolean;
}
