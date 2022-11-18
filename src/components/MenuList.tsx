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
    <NavLink to={RoutesEnum.LOGIN} style={styleByActive} onClick={onClose}>authorize</NavLink>
    <NavLink to={RoutesEnum.ZTYR} style={styleByActive} onClick={onClose}>ztyr</NavLink>
  </SidebarStyled>
}
