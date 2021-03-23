interface NavMenuProps {
  anchor: HTMLElement | null;
  isOpen: boolean;
  onMenuClose: () => void;
}
export interface NavSubMenuProps extends NavMenuProps {
  id: string;
  items: ISubMenuItem[];
}

export interface MobileNavMenuProps extends NavMenuProps {
  items: IMenuItem[];
}

export type ISubMenuItem = {
  label: string;
  withLink: boolean;
  linkAddress?: string;
};

export type IMenuItem = {
  id: string;
  linkAddress: string;
  label: string;
  withSubMenu: boolean;
  ariaControlsId?: string;
  subMenuId?: string;
  subMenuItems?: ISubMenuItem[];
};
