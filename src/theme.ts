import { extendTheme } from '@chakra-ui/react';

const COLOR_1 = '#fae487'

export const themeObj = {
  colors: {
    thRootHead: {
      bg: COLOR_1
    },
    thSidebar: {
      bg: COLOR_1
    },
    thSidebarLinks: {
      normal: "#0c0307",
      hover: "#f61427",
    },
  },
}

export const theme = extendTheme(themeObj)
