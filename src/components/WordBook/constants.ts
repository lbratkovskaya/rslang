import { ROUTES } from '../../consts';
import { COLORS, IGroup } from './types';

const WORDBOOK_GROUPS: Array<IGroup> = [
  {
    label: 'Red',
    linkAddress: ROUTES.wordBook.red,
    color: COLORS.RED,
    background: COLORS.BG_RED,
  },
  {
    label: 'Yellow',
    linkAddress: ROUTES.wordBook.yellow,
    color: COLORS.YELLOW,
    background: COLORS.BG_YELLOW,
  },
  {
    label: 'Orange',
    linkAddress: ROUTES.wordBook.orange,
    color: COLORS.ORANGE,
    background: COLORS.BG_ORANGE,
  },
  {
    label: 'Green',
    linkAddress: ROUTES.wordBook.green,
    color: COLORS.GREEN,
    background: COLORS.BG_GREEN,
  },
  {
    label: 'Blue',
    linkAddress: ROUTES.wordBook.blue,
    color: COLORS.BLUE,
    background: COLORS.BG_BLUE,
  },
  {
    label: 'Purple',
    linkAddress: ROUTES.wordBook.purple,
    color: COLORS.PURPLE,
    background: COLORS.BG_PURPLE,
  },
];

export default WORDBOOK_GROUPS;
