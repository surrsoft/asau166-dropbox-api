import styled from 'styled-components';
import { themeObj } from '../theme';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../types';
import React from 'react';

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  background-color: ${themeObj.colors.thSidebar.bg};
  padding: 12px;
`

const styleByActive = ({isActive}: any) => {
  return isActive ? {textDecoration: 'underline', fontWeight: 'bold'} : undefined;
}

export interface PropsType {
  onClose?: any
}

/** список пунктов навигационного меню приложение */
export function MenuList({onClose}: PropsType) {
  return <SidebarStyled>
    <NavLink to={RoutesEnum.ROOT} style={styleByActive} onClick={onClose}>main</NavLink>
    <NavLink to={RoutesEnum.AUTH_DROPBOX} style={styleByActive} onClick={onClose}>authorize dropbox</NavLink>
    <NavLink to={RoutesEnum.AUTH_AIRTABLE} style={styleByActive} onClick={onClose}>authorize airtable</NavLink>
    <NavLink to={RoutesEnum.ZTYR_APP} style={styleByActive} onClick={onClose}>ztyr</NavLink>
  </SidebarStyled>
}
