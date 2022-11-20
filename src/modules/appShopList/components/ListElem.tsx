import { Box, Checkbox, IconButton } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

export interface ParamsType {
  name: string
  isChecked?: boolean
}

export function ListElem(params: ParamsType) {
  const {name, isChecked = false} = params;
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
    <IconButton aria-label={'up arrow'} icon={<ArrowUpIcon/>}/>
  </Box>
}
