import { NavLink, Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ChakraProvider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Hide,
  IconButton,
  Show,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { theme, themeObj } from '../theme';
import { RoutesEnum } from '../types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAccessTokenGetFromUrl } from '../apis/dropbox/useAccessTokenGetFromUrl';
import { MenuList, SidebarStyled } from '../components/MenuList';

const appRev = process.env.REACT_APP_APP_REVISION || '';

const MainStyled = styled.div`
  padding: 12px;
`

const ContainerStyled = styled.div`
  display: flex;
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

/** */
export function RootPage() {

  useAccessTokenGetFromUrl();
  const {isOpen, onOpen, onClose} = useDisclosure()
  const btnRef = React.useRef(null)
  const location = useLocation()

  return <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <MainStyled>
        <HeadingStyled>
          <Show below='md'>
            <IconButton ref={btnRef} aria-label='menu open/close' icon={<HamburgerIcon/>} mr={4} onClick={onOpen}/>
          </Show>
          <Heading size={'md'}>asau166-project rev. {appRev}</Heading>
        </HeadingStyled>
        <ContainerStyled>
          <Show>
            {location?.pathname === RoutesEnum.ROOT && <MenuList/>}
          </Show>
          <Hide below={'md'}>
            {location?.pathname !== RoutesEnum.ROOT && <MenuList/>}
          </Hide>
          <OutletContainerStyled>
            <Outlet/>
          </OutletContainerStyled>
        </ContainerStyled>
        <Drawer
          isOpen={isOpen}
          placement='left'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay/>
          <DrawerContent>
            <DrawerCloseButton/>
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <MenuList onClose={onClose}/>
            </DrawerBody>
            <DrawerFooter>
              <Button variant='outline' mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </MainStyled>
    </ChakraProvider>
  </QueryClientProvider>
}
