import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';
import NavSubMenu from './NavSubMenu';
import { IMenuItem } from './types';

export const generateRefToRefObject = (
  refsObject: RefObject<{ [key: string]: HTMLDivElement }>,
  element: HTMLDivElement,
  menuItem: IMenuItem
): { [key: string]: HTMLDivElement } =>
  Object.assign(refsObject.current, { [menuItem.id]: element });

export const renderMenuItem = (
  refsObject: RefObject<{ [key: string]: HTMLDivElement }>,
  menuItem: IMenuItem,
  itemClassName: string,
  subMenuOpenId: string,
  setSubMenuOpenId: (id: string) => void,
  handleMenuClose: () => void
) => {
  const buttonClickEventHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSubMenuOpenId(menuItem.subMenuId || '');
  };

  return (
    <div
      key={menuItem.id}
      className={itemClassName}
      ref={(element: HTMLDivElement) => generateRefToRefObject(refsObject, element, menuItem)}>
      <Link to={{ pathname: menuItem.linkAddress }}>{menuItem.label}</Link>
      {menuItem.withSubMenu && (
        <>
          <IconButton
            aria-label={menuItem.label}
            aria-controls={menuItem.subMenuId}
            aria-haspopup="true"
            onClick={buttonClickEventHandler}>
            <ArrowDropDown />
          </IconButton>
          <NavSubMenu
            anchor={refsObject.current![menuItem.id]}
            id={menuItem.subMenuId!}
            isOpen={subMenuOpenId === menuItem.subMenuId}
            items={menuItem.subMenuItems!}
            onMenuClose={handleMenuClose}
          />
        </>
      )}
    </div>
  );
};
