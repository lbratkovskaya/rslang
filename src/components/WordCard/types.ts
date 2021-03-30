import { IWord } from '../../store/types';

export interface IWordCardProps {
  word: IWord;
  index: number;
}

export interface IWordCardButton {
  label: string;
  altLabel: string;
  onClick?: () => void;
  param?: boolean;
}
