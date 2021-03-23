import { IWord } from '../../../../store/types';

export default interface IAnswerProps {
  index: number;
  increment: () => void;
  track: HTMLAudioElement;
  words: IWord[];
}
