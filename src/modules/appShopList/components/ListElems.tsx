import { Box } from '@chakra-ui/react';
import { ListElem } from './ListElem';
import { ListValueType } from '../../../apis/googleSheetsApi/types/types';

export interface PropsType {
  values: ListValueType[]
}

export function ListElems({values}: PropsType) {
  return <Box
    display={'flex'}
    flexDirection={'column'}
    gap={'8px'}
    padding={'8px'}
    bg={'#6669d0'}
    borderRadius={'8px'}
    alignItems={'start'}
  >
    {
      values.map((el: ListValueType) => {
        if (el.length > 0) {
          console.log('!!-!!-!!  el {221120164802}\n', el); // del+
          const name = el[0];
          const isChecked = el[1] === '1';
          console.log('!!-!!-!!  isChecked {221120164820}\n', isChecked); // del+
          return <ListElem name={name} isChecked={isChecked}/>
        }
      })
    }
  </Box>
}
