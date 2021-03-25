const backendUrl = 'https://rslang-server.herokuapp.com';

export const ROUTES = {
  root: '/',
  games: {
    root: '/games',
    savanna: '/games/savanna',
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
};

export const modalTimeout = 1000;

export default backendUrl;
