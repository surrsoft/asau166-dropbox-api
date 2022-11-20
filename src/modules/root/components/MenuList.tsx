import styled from 'styled-components';
import { themeObj } from '../../../theme';
import { NavLink } from 'react-router-dom';
import { RoutesEnum } from '../../../types';
import React from 'react';
import { Box } from '@chakra-ui/react';

export const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  background-color: ${themeObj.colors.thSidebar.bg};
  padding: 12px;
  min-width: 200px;
`

const styleByActive = ({isActive}: any) => {
  return isActive ? {textDecoration: 'underline', fontWeight: 'bold'} : undefined;
}

export interface PropsType {
  onClose?: any
}

function Wrap({children}: any) {
  return <Box
    bg={'#efdddd'}
    padding='2px 8px'
    borderRadius='4px'
    borderWidth='1px'
    borderColor={"#4fdbdb"}
    wordBreak={'normal'}
  >
    {children}
  </Box>
}

/** список пунктов навигационного меню приложение */
export function MenuList({onClose}: PropsType) {
  return <SidebarStyled>
    <Wrap>
      <NavLink to={RoutesEnum.ROOT} style={styleByActive} onClick={onClose}>main</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.AUTH_DROPBOX} style={styleByActive} onClick={onClose}>authorize
        dropbox</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.AUTH_GOOGLE_APIS} style={styleByActive} onClick={onClose}>authorize Google
        APIs</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.AUTH_AIRTABLE} style={styleByActive} onClick={onClose}>authorize
        airtable</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.ZTYR_APP} style={styleByActive} onClick={onClose}>ztyr</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.GOOGLE_SHEETS_RESEARCH} style={styleByActive} onClick={onClose}>GS research</NavLink>
    </Wrap>
    <Wrap>
      <NavLink to={RoutesEnum.APP_SHOPPING_LIST} style={styleByActive} onClick={onClose}>app shopping list</NavLink>
    </Wrap>
  </SidebarStyled>
}
