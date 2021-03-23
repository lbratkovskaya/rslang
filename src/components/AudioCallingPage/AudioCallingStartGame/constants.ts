interface IGameMode {
  [key: string]: number;
}

const gameMode: IGameMode = {
  easy: 6,
  normal: 10,
  hard: 20,
};

export default gameMode;
