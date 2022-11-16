import { Link, Outlet } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import { ChakraProvider, Heading } from '@chakra-ui/react';
import { theme, themeObj } from '../theme';
import { RoutesEnum } from '../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const MainStyled = styled.div`
  padding: 12px;
`

const ContainerStyled = styled.div`
  display: flex;
`

const SidebarStyled = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 280px;
  background-color: ${themeObj.colors.thSidebar.bg};
  padding: 12px;
`

const OutletContainerStyled = styled.div`
  background: #aef596;
  width: 100%;
  padding: 12px;
`

export const SidebarLinkStyled = styled(Link)`
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

export function RootPage() {

  return <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <MainStyled>
        <HeadingStyled>
          <Heading size={'md'}>asau166-project</Heading>
        </HeadingStyled>
        <ContainerStyled>
          <SidebarStyled>
            <SidebarLinkStyled to={RoutesEnum.ROOT}>Main</SidebarLinkStyled>
            <SidebarLinkStyled to={RoutesEnum.LOGIN}>Authorize</SidebarLinkStyled>
            <SidebarLinkStyled to={RoutesEnum.ZTYR}>Ztyr</SidebarLinkStyled>
          </SidebarStyled>
          <OutletContainerStyled>
            <Outlet/>
          </OutletContainerStyled>
        </ContainerStyled>
      </MainStyled>
    </ChakraProvider>
  </QueryClientProvider>
}
