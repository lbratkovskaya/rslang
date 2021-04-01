const backendUrl = 'https://rslang-server.herokuapp.com';

export const ROUTES = {
  root: '/',
  games: {
    root: '/games',
    savannah: '/games/savannah',
    audio: '/games/audio',
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
    label: 'Красный',
    linkAddress: ROUTES.wordBook.red,
    color: COLORS.RED,
    background: COLORS.BG_RED,
  },
  {
    label: 'Жёлтый',
    linkAddress: ROUTES.wordBook.yellow,
    color: COLORS.YELLOW,
    background: COLORS.BG_YELLOW,
  },
  {
    label: 'Оранжевый',
    linkAddress: ROUTES.wordBook.orange,
    color: COLORS.ORANGE,
    background: COLORS.BG_ORANGE,
  },
  {
    label: 'Зелёный',
    linkAddress: ROUTES.wordBook.green,
    color: COLORS.GREEN,
    background: COLORS.BG_GREEN,
  },
  {
    label: 'Синий',
    linkAddress: ROUTES.wordBook.blue,
    color: COLORS.BLUE,
    background: COLORS.BG_BLUE,
  },
  {
    label: 'Фиолетовый',
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
  sadImg: '../../../assets/sad.svg',
  winkImg: '../../../assets/wink.svg',
  audioCorrect: '../../../assets/audio/savannah-true.mp3',
  audioIncorrect: '../../../assets/audio/savannah-false.mp3',
};

export const MEMORY = {
  timeShowingCard: 700,
  sheet: 'assets/sheet-bg.jpg',
  background: 'assets/memory-bg.jpg',
  sizes: [
    {
      label: '',
      linkAddress: '',
      color: COLORS.RED,
      background: COLORS.BG_RED,
    },
    {
      label: 'Легко',
      linkAddress: '',
      color: COLORS.RED,
      background: COLORS.BG_RED,
    },
    {
      label: 'Нормально',
      linkAddress: '',
      color: COLORS.RED,
      background: COLORS.BG_RED,
    },
    {
      label: 'Сложно',
      linkAddress: '',
      color: COLORS.RED,
      background: COLORS.BG_RED,
    },
  ],
  Easy: 4,
  Normal: 8,
  Hard: 10,
};

export interface IGroup {
  label: string;
  linkAddress: string;
  color: COLORS;
  background: COLORS;
}

export const modalTimeout = 1000;

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

export interface IGame {
  title: string;
  background: string;
  route: string;
}

export const GAMES: { [key: string]: IGame } = {
  savannah: {
    title: 'Саванна',
    background: 'url(../../assets/savannah-bg.jpg) center no-repeat',
    route: ROUTES.games.savannah,
  },
  audio: {
    title: 'Аудиовызов',
    background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)',
    route: ROUTES.games.audio,
  },
  sprint: {
    title: 'Спринт',
    background: '',
    route: ROUTES.games.sprint,
  },
  memory: {
    title: 'Найди пару',
    background: '',
    route: ROUTES.games.memory,
  },
};

export default backendUrl;
