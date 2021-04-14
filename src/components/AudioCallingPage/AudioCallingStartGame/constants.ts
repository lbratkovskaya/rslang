interface IGameMode {
  [key: string]: number;
}

const gameMode: IGameMode = {
  easy: 10,
  normal: 20,
  hard: 30,
};

export const WORDS_QUANTITY = 50;

export default gameMode;
