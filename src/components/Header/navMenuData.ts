import { IMenuItem, ISubMenuItem } from './types';

const gamesId = 'miniGames';
const sectionsId = 'wordBook';
export const mobileMenuId = 'mobileMenu';

export const gamesItems: ISubMenuItem[] = [
  {
    label: 'Savanna',
    withLink: true,
    linkAddress: '/games/savanna',
  },
  {
    label: 'AudioCall',
    withLink: true,
    linkAddress: '/games/audio',
  },
  {
    label: 'Sprint',
    withLink: true,
    linkAddress: '/games/sprint',
  },
  {
    label: 'Memory Game',
    withLink: true,
    linkAddress: '/games/memory',
  },
];

export const sectionsItems: ISubMenuItem[] = [
  {
    label: 'Red Section',
    withLink: true,
    linkAddress: '/wordBook/red',
  },
  {
    label: 'Yellow Section',
    withLink: true,
    linkAddress: '/wordBook/yellow',
  },
  {
    label: 'Orange Section',
    withLink: true,
    linkAddress: '/wordBook/orange',
  },
  {
    label: 'Green Section',
    withLink: true,
    linkAddress: '/wordBook/green',
  },
  {
    label: 'Blue Section',
    withLink: true,
    linkAddress: '/wordBook/blue',
  },
  {
    label: 'Purple Section',
    withLink: true,
    linkAddress: '/wordBook/purple',
  },
  {
    label: 'My Dictionary',
    withLink: true,
    linkAddress: '/dictionary',
  },
  {
    label: 'Settings',
    withLink: true,
    linkAddress: '/settings',
  },
];

export const teamsItems = [
  {
    label: 'Larisa Arkaeva',
  },
  {
    label: 'Antonina Tregubova',
  },
  {
    label: 'Alexey Teterin',
  },
  {
    label: 'Aliaxei Latypau',
  },
  {
    label: 'Maxim Chernov',
  },
  {
    label: 'Nick Gurinovicha',
  },
];

export const menuItems: IMenuItem[] = [
  {
    id: 'study',
    linkAddress: '/study',
    label: 'Time to Study',
    withSubMenu: false,
  },
  {
    id: 'wordBook',
    linkAddress: '/wordBook',
    label: 'Wordbook',
    withSubMenu: true,
    ariaControlsId: sectionsId,
    subMenuId: 'wordBook',
    subMenuItems: sectionsItems,
  },
  {
    id: 'games',
    linkAddress: '/games',
    label: 'Mini-games',
    withSubMenu: true,
    ariaControlsId: gamesId,
    subMenuId: 'gamesMenu',
    subMenuItems: gamesItems,
  },
  {
    id: 'statistics',
    linkAddress: '/statistics',
    label: 'Statistics',
    withSubMenu: false,
  },
];
