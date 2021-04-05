import { IUserWord } from '../../store/types';

export interface IDictionarySectionProps {
  words: Array<IUserWord>;
  removeOnDifficultyChange: boolean;
}

export interface IUserWordCardProps {
  word: IUserWord;
  index: number;
  removeOnDifficultyChange: boolean;
}

export interface TabPanelProps {
  dir?: string;
  index: any;
  value: any;
}
