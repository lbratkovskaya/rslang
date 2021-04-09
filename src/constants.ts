export const backendUrl = 'https://rslang-server.herokuapp.com';

export const ROUTES = {
  root: '/',
  games: {
    root: '/games',
    savannah: '/games/savannah',
    audio: '/games/audio-calling',
    sprint: '/games/sprint',
    memory: '/games/memory',
  },
  wordBook: {
    root: '/wordBook',
    red: '/wordBook/red',
    yellow: '/wordBook/yellow',
    orange: '/wordBook/orange',
    green: '/wordBook/green',
    blue: '/wordBook/blue',
    purple: '/wordBook/purple',
  },
  dictionary: '/dictionary',
  settings: '/settings',
  statistics: '/statistics',
  study: '/study',
  signIn: '/sign-in',
  signUp: '/sign-up',
};

export enum COLORS {
  RED = '#DD4132',
  YELLOW = '#EFC050',
  ORANGE = '#FE840E',
  GREEN = '#00A170',
  BLUE = '#3F69AA',
  PURPLE = '#6C244C',
  BG_RED = '#fbebe9',
  BG_YELLOW = '#fdf7e8',
  BG_ORANGE = '#fff2e6',
  BG_GREEN = '#e6fff7',
  BG_BLUE = '#ecf1f8',
  BG_PURPLE = '#f9ecf3',
}

export const WORDBOOK_GROUPS: Array<IGroup> = [
  {
    label: '�������',
    linkAddress: ROUTES.wordBook.red,
    color: COLORS.RED,
    background: COLORS.BG_RED,
  },
  {
    label: 'Ƹ����',
    linkAddress: ROUTES.wordBook.yellow,
    color: COLORS.YELLOW,
    background: COLORS.BG_YELLOW,
  },
  {
    label: '���������',
    linkAddress: ROUTES.wordBook.orange,
    color: COLORS.ORANGE,
    background: COLORS.BG_ORANGE,
  },
  {
    label: '������',
    linkAddress: ROUTES.wordBook.green,
    color: COLORS.GREEN,
    background: COLORS.BG_GREEN,
  },
  {
    label: '�����',
    linkAddress: ROUTES.wordBook.blue,
    color: COLORS.BLUE,
    background: COLORS.BG_BLUE,
  },
  {
    label: '����������',
    linkAddress: ROUTES.wordBook.purple,
    color: COLORS.PURPLE,
    background: COLORS.BG_PURPLE,
  },
];

export const NUM_OF_SECTIONS = WORDBOOK_GROUPS.length;
export const NUM_OF_PAGES = 30;

export const SAVANNAH = {
  health: 5,
  timeOutDelay: 500,
  background: '../../../assets/savannah-bg.jpg',
  sadImg: '../../../assets/sad.png',
  winkImg: '../../../assets/wink.png',
  audioCorrect: '../../../assets/audio/savannah-true.mp3',
  audioIncorrect: '../../../assets/audio/savannah-false.mp3',
};

export const MEMORY = {
  timeShowingCard: 700,
  sheet: 'assets/sheet-bg.jpg',
  background: 'assets/memory-bg.jpg',
  gameTimePerCard: 5,
  gameWordsMinimalVolumeLevel: 10,
  gameWordsDefaultVolumeLevel: 60,
  gameWordsMaxVolumeLevel: 100,
};

export interface IGroup {
  label: string;
  linkAddress: string;
  color: COLORS;
  background: COLORS;
}

export const SPRINT = {
  timeOutDelay: 60,
  background: 'https://99px.ru/sstorage/53/2018/08/tmb_234204_794603.jpg',
  sadImg: '../../../assets/sad.svg',
  winkImg: '../../../assets/wink.svg',
  audioTrue: '../../../assets/SprintAudio/sprint_true.mp3',
  audioFalse: '../../../assets/SprintAudio/sprint_false.mp3',
};

export const modalTimeout = 1000;
export const playIcon = './assets/play-button.svg';
export const correctUrl: string = './assets/correct.wav';
export const skipUrl: string = './assets/skip.wav';
export const incorrectUrl: string = './assets/incorrect.wav';

export const APPEAR_DURATION = 600;
export const APPEAR_STYLE = {
  transition: `opacity ${APPEAR_DURATION}ms, transform ${APPEAR_DURATION}ms, filter 200ms`,
};

export const RESULT_APPEAR_TIMEOUT = 10;

export const WORDCARD_APPEAR_GAP = 85;
export const timeout = 1000;

export const enterTimeout = 400;
export const exitTimeout = 200;

export const GAMES_WORDS_MAX_AMOUNT = 40;

export const HEADER_HEIGHT = 80;
export const MIN_MAIN_HEIGHT = `calc(100vh - ${HEADER_HEIGHT}px)`;

export const VOLUME_DIVIDER = 100;

export const MAX_VOLUME = 100;
export const MIN_VOLUME = 0;
export const EXTRA_WORDS_FOR_GAMES = 50;

export const COUNTDOWN = {
  delay: 3,
  percentage: 100,
  timeOutPetcent: 25,
};

export interface IGame {
  title: string;
  background: string;
  route: string;
}

export const GAMES: { [key: string]: IGame } = {
  savannah: {
    title: '�������',
    background: 'url(../../assets/savannah-bg.jpg) center no-repeat',
    route: ROUTES.games.savannah,
  },
  audio: {
    title: '����������',
    background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)',
    route: ROUTES.games.audio,
  },
  sprint: {
    title: '������',
    background: '',
    route: ROUTES.games.sprint,
    difficulty: {
      easy: {
        value: 60,
        label: 'Легко',
      },
      normal: {
        value: 50,
        label: 'Нормально',
      },
      hard: {
        value: 40,
        label: 'Сложно',
      },
    },
  },
  memory: {
    title: '����� ����',
    background: '',
    route: ROUTES.games.memory,
  },
};

export const GAME_MODE_WORDS = {
  easy: 10,
  normal: 20,
  hard: 30,
};

export default backendUrl;
