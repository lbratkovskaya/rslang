export interface IRoute {
  label: string;
  withLink: boolean;
  linkAddress: string;
  color: COLORS;
  background: COLORS;
}

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

const routes: Array<IRoute> = [
  {
    label: 'Red Section',
    withLink: true,
    linkAddress: '/wordBook/red',
    color: COLORS.RED,
    background: COLORS.BG_RED,
  },
  {
    label: 'Yellow Section',
    withLink: true,
    linkAddress: '/wordBook/yellow',
    color: COLORS.YELLOW,
    background: COLORS.BG_YELLOW,
  },
  {
    label: 'Orange Section',
    withLink: true,
    linkAddress: '/wordBook/orange',
    color: COLORS.ORANGE,
    background: COLORS.BG_ORANGE,
  },
  {
    label: 'Green Section',
    withLink: true,
    linkAddress: '/wordBook/green',
    color: COLORS.GREEN,
    background: COLORS.BG_GREEN,
  },
  {
    label: 'Blue Section',
    withLink: true,
    linkAddress: '/wordBook/blue',
    color: COLORS.BLUE,
    background: COLORS.BG_BLUE,
  },
  {
    label: 'Purple Section',
    withLink: true,
    linkAddress: '/wordBook/purple',
    color: COLORS.PURPLE,
    background: COLORS.BG_PURPLE,
  },
];

export default routes;
