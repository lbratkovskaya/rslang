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
  sadImg: '../../../assets/sad.png',
  winkImg: '../../../assets/wink.png',
  audioCorrect: '../../../assets/audio/savannah-true.mp3',
  audioIncorrect: '../../../assets/audio/savannah-false.mp3',
  finishAudioWin: '../../../assets/audio/win-sound.mp3',
  finishAudioFail: '../../../assets/audio/fail-sound.mp3',
};

export const MEMORY = {
  timeShowingCard: 700,
  sheet: 'assets/sheet-bg.jpg',
  background: 'assets/memory-bg.jpg',
  gameTimePerCard: 5,
  gameWordsMinimalVolumeLevel: 10,
  gameWordsDefaultVolumeLevel: 60,
  gameWordsMaxVolumeLevel: 100,
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
};

export interface IGroup {
  label: string;
  linkAddress: string;
  color: COLORS;
  background: COLORS;
}

export const SPRINT = {
  timeOutDelay: 60,
  background: '../../../assets/sprint-bg.jpg',
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
export const FOOTER_HEIGHT = 189;
export const FOOTER_HEIGHT_MEDIA = 217;

export const VOLUME_DIVIDER = 100;

export const MAX_VOLUME = 100;
export const MIN_VOLUME = 0;
export const EXTRA_WORDS_FOR_GAMES = 50;

export const COUNTDOWN = {
  delay: 3,
  percentage: 100,
  timeOutPetcent: 25,
};

interface IgameDifficulty {
  value: number;
  label: string;
}

export interface IGame {
  title: string;
  background: string;
  route: string;
  difficulty: { [key: string]: IgameDifficulty };
}

export const GAMES: { [key: string]: IGame } = {
  savannah: {
    title: 'Саванна',
    background: `url(${SAVANNAH.background}) #858181 center no-repeat`,
    route: ROUTES.games.savannah,
    difficulty: {
      easy: {
        value: 10,
        label: 'Легко',
      },
      normal: {
        value: 20,
        label: 'Нормально',
      },
      hard: {
        value: 30,
        label: 'Сложно',
      },
    },
  },
  audio: {
    title: 'Аудиовызов',
    background: 'url(assets/audio_calling_bg.jpg) center no-repeat',
    route: ROUTES.games.audio,
    difficulty: {
      easy: {
        value: 0,
        label: 'Легко',
      },
      normal: {
        value: 0,
        label: 'Нормально',
      },
      hard: {
        value: 0,
        label: 'Сложно',
      },
    },
  },
  sprint: {
    title: 'Спринт',
    background: `url(${SPRINT.background}) center no-repeat`,
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
    title: 'Найди пару',
    background: `url(${MEMORY.background}) center no-repeat`,
    route: ROUTES.games.memory,
    difficulty: {
      easy: {
        value: 4,
        label: 'Легко',
      },
      normal: {
        value: 8,
        label: 'Нормально',
      },
      hard: {
        value: 10,
        label: 'Сложно',
      },
    },
  },
};

export const REGFORMS = {
  sign_in: {
    background: 'url(../../assets/sign_in_bg.jpeg)',
  },
  sign_up: {
    background: 'url(../../assets/sign_up_bg.jpeg)',
  },
};

export const STATS = {
  background: 'url(../../assets/trash_bg.jpg) center no-repeat',
};

export const PERSONS_INFO = [
  {
    photo: './assets/photo_Lara.jpg',
    name: 'Лариса Аркаева',
    about: `Борец за стайл-гайд. Любит чистый код и порядок во всем, особенно в импортах,
      не любит copy&paste. Характер въедливый.`,
    contribution: `Тимлид проекта. Панель навигации, страница статистики, словарь пользователя,
      работа с бэкендом.`,
  },
  {
    photo: './assets/photo_Nick.jpg',
    name: 'Николай Гуринович',
    about: `Критичен к себе, но со стороны не видно.
      Целеустремленный скромный перфекционист, но это не точно.
      Занимался спринтом, добегался до фронта.`,
    contribution: 'Игра спринт, ряд общих компонентов других игр.',
  },
  {
    photo: './assets/photo_Alex_l.jpg',
    name: 'Алексей Латыпов',
    about: `Повелитель саванны, укротитель енотов, абсолютный чемпион по комментариям к PR,
      любитель велосипедов.`,
    contribution: 'Игра саванна, ряд общих компонентов других игр, страница настроек.',
  },
  {
    photo: './assets/photo_Teterin.jpg',
    name: 'Алексей Тетерин',
    about: `Образование - госслужащий. Деятельность - профессиональный игрок в онлайн-покер
      с 10-летним стажем.
      Кризис среднего возраста в 33 года привел его на фронт.`,
    contribution: 'Старт и настройка проекта, учебник, дизайн-верстка, тесты на jest.',
  },
  {
    photo: './assets/photo_Antonina.jpg',
    name: 'Антонина Трегубова',
    about: `Высшее химическое образование помогает
      вкусно готовить и выводить любые пятна.
      Неплохо стреляет, так и попала на фронт.`,
    contribution: `Игра найди пару, ряд общих компонентов других игр, формы регистрации и входа,
      работа с бэкендом.`,
  },
  {
    photo: './assets/photo_Max.jpg',
    name: 'Максим Чернов',
    about: `Инженер по автоматизации, с опытом работы инженера-наладчика КИПиА на заводе г.Могилев.
      Страстно желает с завода на фронт.`,
    contribution: 'Игра аудиовызов, ряд общих компонентов других игр.',
  },
];

export default backendUrl;
