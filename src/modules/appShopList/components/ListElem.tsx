import { Box, Checkbox, DefaultIcon, Flex, IconButton } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon } from '@chakra-ui/icons';
import { SheetValuesType } from '../types/types';
import { useState } from 'react';

export interface ParamsType {
  data: SheetValuesType
  onDelete: (elem: SheetValuesType) => void
  onToggle: (elem: SheetValuesType, isChecked: boolean) => Promise<boolean>
  disabled?: boolean
}

export function ListElem({data, onDelete, disabled = false, onToggle}: ParamsType) {
  const {name, isChecked = false} = data;
  const [$isChecked, $isCheckedSet] = useState(isChecked);

  const handleOnDelete = () => {
    onDelete(data)
  }

  const handleOnToggle = async (event: any) => {
    const checked = !!event.target.checked;
    const isSuccess = await onToggle(data, checked);
    if (isSuccess) {
      $isCheckedSet(checked);
    }
  }

  return <Box
    display='flex'
    columnGap={'16px'}
    bg={'#cfd3a1'}
    paddingLeft={'16px'}
  >
    <Checkbox
      colorScheme={'green'}
      isChecked={$isChecked}
      disabled={disabled}
      onChange={handleOnToggle}
    />
    <IconButton aria-label={'down arrow'} icon={<ArrowDownIcon/>} disabled={disabled}/>
    <Box display={'flex'} alignItems={'center'}>
      {name}
    </Box>
    <Flex>
      <IconButton aria-label={'up arrow'} icon={<ArrowUpIcon/>} disabled={disabled}/>
      <IconButton aria-label={'delete'} icon={<DeleteIcon/>} ml={'8px'} onClick={handleOnDelete} disabled={disabled}/>
    </Flex>
  </Box>
}
