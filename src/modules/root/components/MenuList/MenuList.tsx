import React from 'react';
import styled from 'styled-components';
import { themeObj } from '../../../../theme';
import { RoutesEnum } from '../../../../types';
import { NavWrap } from './NavWrap';

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  background-color: ${themeObj.colors.thSidebar.bg};
  padding: 12px;
  min-width: 200px;
`

export interface PropsType {
  onClose?: any
}

/** список пунктов навигационного меню приложение */
export function MenuList({onClose}: PropsType) {

  return <SidebarStyled>
    <NavWrap path={RoutesEnum.ROOT} onClick={onClose}>main</NavWrap>
    <NavWrap path={RoutesEnum.AUTH_DROPBOX} onClick={onClose}>Dropbox Auth</NavWrap>
    <NavWrap path={RoutesEnum.AUTH_GOOGLE_APIS} onClick={onClose}>Google Auth</NavWrap>
    <NavWrap path={RoutesEnum.AUTH_AIRTABLE} onClick={onClose}>airtable</NavWrap>
    <NavWrap path={RoutesEnum.ZTYR_APP} onClick={onClose}>ztyr</NavWrap>
    <NavWrap path={RoutesEnum.GOOGLE_SHEETS_RESEARCH} onClick={onClose}>GS research</NavWrap>
    <NavWrap path={RoutesEnum.APP_SHOPPING_LIST} onClick={onClose}>app shopping list</NavWrap>
    <NavWrap path={RoutesEnum.APP_EVENT_LOGGER} onClick={onClose}>app event logger</NavWrap>
  </SidebarStyled>
}
