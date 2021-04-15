import { IWord } from '../../store/types';

export interface IWordCardProps {
  word: IWord;
  index: number;
  activeGroup: any;
  isLoading: boolean;
  showDeleted: boolean;
  removeOnDifficultyChange: boolean;
}

export interface IWordCardButton {
  label: string;
  altLabel: string;
  title: string;
  altTitle: string;
  clickable: boolean;
  onClick?: () => void;
  param?: boolean;
}
