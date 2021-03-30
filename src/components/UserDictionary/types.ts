import { IUserWord } from '../../store/types';

export interface IDictionarySectionProps {
  words: Array<IUserWord>;
}

export interface IUserWordCardProps {
  word: IUserWord;
}
