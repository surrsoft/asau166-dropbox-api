import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { ASAU170_SPREADSHEET_ID } from '../constants';
import { GOOGLE_SPREADSHEETS_URL } from '../../../apis/googleSheetsApi/constants';

export function ShMenu() {
  const handleToTable = () => {
    window.open(`${GOOGLE_SPREADSHEETS_URL}/${ASAU170_SPREADSHEET_ID}`)
  }

  return <Menu>
    <MenuButton
      as={IconButton}
      aria-label='menu'
      icon={<Icon as={BsThreeDotsVertical}/>}
      variant='solid'
    />
    <MenuList>
      <MenuItem icon={<ExternalLinkIcon/>} onClick={handleToTable}>
        to original table
      </MenuItem>
    </MenuList>
  </Menu>
}
