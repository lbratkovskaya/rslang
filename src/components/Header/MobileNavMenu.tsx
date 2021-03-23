import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import { IMenuItem, MobileNavMenuProps } from './types';
import NavSubMenu from './NavSubMenu';

const MobileNavMenu: React.FC<MobileNavMenuProps> = (props: MobileNavMenuProps) => {
  const [subMenuOpenId, setSubMenuOpenId] = useState<string>('');

  const refsObject = useRef<{ [key: string]: HTMLDivElement }>({});

  const handleMenuClose = () => {
    setTimeout(() => setSubMenuOpenId('none'), 0);
  };

  const {
    anchor,
    isOpen,
    items,
    onMenuClose,
  } = props;

  const renderItems = () => items?.map((menuItem: IMenuItem) => {
    const getRef = (element: HTMLDivElement) => Object.assign(
      refsObject.current,
      { [menuItem.id]: element },
    );
    return (
      <MenuItem key={menuItem.id}>
        <div key={menuItem.id} ref={getRef}>
          <Link to={menuItem.linkAddress}>{menuItem.label}</Link>
          {
            menuItem.withSubMenu && (
              <>
                <IconButton
                  aria-label={menuItem.label}
                  aria-controls={menuItem.subMenuId}
                  aria-haspopup="true"
                  onClick={() => setSubMenuOpenId(menuItem.subMenuId || '')}
                >
                  <ArrowDropDown />
                </IconButton>
                <NavSubMenu
                  anchor={refsObject.current[menuItem.id]}
                  id={menuItem.subMenuId!}
                  isOpen={subMenuOpenId === menuItem.subMenuId}
                  items={menuItem.subMenuItems!}
                  onMenuClose={handleMenuClose}
                />
              </>
            )
          }
        </div>
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
      onClose={onMenuClose}
    >
      {items && renderItems()}
    </Menu>
  );
};

export default MobileNavMenu;
