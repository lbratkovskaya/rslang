import { IWord } from '../../store/types';

export interface IWordCardProps {
  word: IWord;
  index: number;
  activeGroup: any;
  isLoading: boolean;
  showDeleted: boolean;
}

export interface IWordCardButton {
  label: string;
  altLabel: string;
  onClick?: () => void;
  param?: boolean;
}
