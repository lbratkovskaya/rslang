import React, { useRef, useState } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { renderMenuItem } from './commonMethods';
import { IMenuItem, MobileNavMenuProps } from './types';
import useStyles from './styles';

const MobileNavMenu: React.FC<MobileNavMenuProps> = (props: MobileNavMenuProps) => {
  const { anchor, isOpen, items, onMenuClose } = props;

  const [subMenuOpenId, setSubMenuOpenId] = useState('');

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});

  const handleSubMenuClose = (): void => {
    setTimeout(() => setSubMenuOpenId('none'), 0);
  };

  const mobileClasses = useStyles();

  const renderItems = (): JSX.Element[] =>
    items?.map((menuItem: IMenuItem) => {
      return (
        <MenuItem key={menuItem.id} onClick={onMenuClose}>
          {renderMenuItem(
            refsObject,
            menuItem,
            mobileClasses.navMenuItem,
            subMenuOpenId,
            setSubMenuOpenId,
            handleSubMenuClose
          )}
        </MenuItem>
      );
    });

  return (
    <Menu
      anchorEl={anchor}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id="menu-auth"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isOpen}
      onClose={onMenuClose}>
      {items && renderItems()}
    </Menu>
  );
};

export default MobileNavMenu;
