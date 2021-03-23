import { IMenuItem, ISubMenuItem } from './types';

const gamesId = 'miniGames';
const sectionsId = 'sections';
const teamsId = 'teams';
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
    linkAddress: '/sections/red',
  },
  {
    label: 'Yellow Section',
    withLink: true,
    linkAddress: '/sections/yellow',
  },
  {
    label: 'Orange Section',
    withLink: true,
    linkAddress: '/sections/orange',
  },
  {
    label: 'Green Section',
    withLink: true,
    linkAddress: '/sections/green',
  },
  {
    label: 'Blue Section',
    withLink: true,
    linkAddress: '/sections/blue',
  },
  {
    label: 'Purple Section',
    withLink: true,
    linkAddress: '/sections/purple',
  },
];

export const teamsItems: ISubMenuItem[] = [
  {
    label: 'Larisa Arkaeva',
    withLink: false,
  },
  {
    label: 'Antonina Tregubova',
    withLink: false,
  },
  {
    label: 'Alexey Teterin',
    withLink: false,
  },
  {
    label: 'Aliaxei Latypau',
    withLink: false,
  },
  {
    label: 'Maxim Chernov',
    withLink: false,
  },
  {
    label: 'Nick Gurinovicha',
    withLink: false,
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
    id: 'games',
    linkAddress: '/games',
    label: 'Mini-games',
    withSubMenu: true,
    ariaControlsId: gamesId,
    subMenuId: 'gamesMenu',
    subMenuItems: gamesItems,
  },

  {
    id: 'sections',
    linkAddress: '/sections',
    label: 'Sections',
    withSubMenu: true,
    ariaControlsId: sectionsId,
    subMenuId: 'sectionsMenu',
    subMenuItems: sectionsItems,
  },
  {
    id: 'statistics',
    linkAddress: '/statistics',
    label: 'Statistics',
    withSubMenu: false,
  },
  {
    id: 'settings',
    linkAddress: '/settings',
    label: 'Settings',
    withSubMenu: false,
  },
  {
    id: 'teams',
    linkAddress: '/teams',
    label: 'Teams',
    withSubMenu: true,
    ariaControlsId: teamsId,
    subMenuId: 'teamsMenu',
    subMenuItems: teamsItems,
  },
];
