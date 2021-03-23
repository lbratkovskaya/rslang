export interface NavSubMenuProps {
  anchor: HTMLElement | null;
  id: string;
  isOpen: boolean;
  items: IMenuItem[];
  onMenuClose: () => void;
}

export type IMenuItem = {
  label: string;
  withLink: boolean;
  linkAddress?: string;

};
