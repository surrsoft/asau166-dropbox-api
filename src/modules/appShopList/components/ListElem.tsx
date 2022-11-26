import { Box, Checkbox, DefaultIcon, Flex, IconButton } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { SheetValuesType } from '../types/types';

export interface ParamsType {
  data: SheetValuesType
  onDelete: (elem: SheetValuesType) => void
}

export function ListElem({data, onDelete}: ParamsType) {
  const {name, isChecked = false} = data;
  const handleOnDelete = () => {
    onDelete(data)
  }
  return <Box
    display='flex'
    columnGap={'16px'}
    bg={'#cfd3a1'}
    paddingLeft={'16px'}
  >
    <Checkbox colorScheme={'green'} isChecked={isChecked}/>
    <IconButton aria-label={'down arrow'} icon={<ArrowDownIcon/>}/>
    <Box display={'flex'} alignItems={'center'}>
      {name}
    </Box>
    <Flex>
      <IconButton aria-label={'up arrow'} icon={<ArrowUpIcon/>}/>
      <IconButton aria-label={'delete'} icon={<DeleteIcon/>} ml={'8px'} onClick={handleOnDelete}/>
    </Flex>
  </Box>
}
