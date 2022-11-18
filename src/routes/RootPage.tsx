import { NavLink, Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { theme, themeObj } from '../theme';
import { RoutesEnum } from '../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccessTokenGetFromUrl } from '../apis/dropbox/useAccessTokenGetFromUrl';

const appRev = process.env.REACT_APP_APP_REVISION || '';

const MainStyled = styled.div`
  padding: 12px;
`

const ContainerStyled = styled.div`
  display: flex;
`

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 180px;
  background-color: ${themeObj.colors.thSidebar.bg};
  padding: 12px;
`

const OutletContainerStyled = styled.div`
  background: #aef596;
  width: 100%;
  padding: 12px;
`

export const SidebarLinkStyled = styled(NavLink)`
  color: ${themeObj.colors.thSidebarLinks.normal};

  &:hover {
    color: ${themeObj.colors.thSidebarLinks.hover};
  }
`

const HeadingStyled = styled.div`
  display: flex;
  padding: 8px 12px;
  background: ${themeObj.colors.thRootHead.bg};
`

const queryClient = new QueryClient()

const fnStyle = ({isActive}: any) => {
  return isActive ? {textDecoration: 'underline', fontWeight: 'bold'} : undefined;
}

const fnRx = () => {
  console.log(`!!-!!-!! -> :::::::::::::: () {221118184949}:${Date.now()}`); // del+
  return 'hello'
}

export function RootPage() {

  useAccessTokenGetFromUrl();

  return <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <MainStyled>
        <HeadingStyled>
          <Heading size={'md'}>asau166-project rev. {appRev}</Heading>
        </HeadingStyled>
        <ContainerStyled>
          <SidebarStyled>
            <NavLink to={RoutesEnum.ROOT} style={fnStyle}>Main</NavLink>
            <NavLink to={RoutesEnum.LOGIN} style={fnStyle}>Authorize</NavLink>
            <NavLink to={RoutesEnum.ZTYR} style={fnStyle}>Ztyr</NavLink>
          </SidebarStyled>
          <OutletContainerStyled>
            <Outlet/>
          </OutletContainerStyled>
        </ContainerStyled>
      </MainStyled>
    </ChakraProvider>
  </QueryClientProvider>
}
