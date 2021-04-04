import { getSectionLabel, getSectionRoute } from './commonMethods';
import { GAMES, NUM_OF_SECTIONS, ROUTES } from '../../constants';
import { IMenuItem, ISubMenuItem } from './types';

const gamesId = 'miniGames';
const sectionsId = 'wordBook';
export const mobileMenuId = 'mobileMenu';

const gamesTitles = Array.from(Object.keys(GAMES));

export const gamesItems: Array<ISubMenuItem> = gamesTitles.map((game) => ({
  label: GAMES[game].title,
  withLink: true,
  linkAddress: GAMES[game].route,
}));

export const sectionsItems: Array<ISubMenuItem> = new Array(NUM_OF_SECTIONS)
  .fill(null)
  .map((el, index) => ({
    label: getSectionLabel(index),
    withLink: true,
    linkAddress: getSectionRoute(index),
    important: false,
  }))
  .concat({
    label: 'Мой словарь',
    withLink: true,
    linkAddress: ROUTES.dictionary,
    important: true,
  });

export const menuItems: Array<IMenuItem> = [
  {
    id: 'study',
    linkAddress: ROUTES.study,
    label: 'Случайная страница',
    withSubMenu: false,
  },
  {
    id: 'wordBook',
    linkAddress: ROUTES.wordBook.root,
    label: 'Учебник',
    withSubMenu: true,
    ariaControlsId: sectionsId,
    subMenuId: 'wordBook',
    subMenuItems: sectionsItems,
  },
  {
    id: 'games',
    linkAddress: ROUTES.games.root,
    label: 'Мини-игры',
    withSubMenu: true,
    ariaControlsId: gamesId,
    subMenuId: 'gamesMenu',
    subMenuItems: gamesItems,
  },
  {
    id: 'statistics',
    linkAddress: ROUTES.statistics,
    label: 'Статистика',
    withSubMenu: false,
  },
];
