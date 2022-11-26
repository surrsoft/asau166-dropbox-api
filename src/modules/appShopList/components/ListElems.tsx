import { Box } from '@chakra-ui/react';
import { ListElem } from './ListElem';
import { SheetValuesType } from '../types/types';

export interface PropsType {
  values: SheetValuesType[]
  /** должен вызываться при нажатии на кнопку удаления элемента спика */
  onDelete: (elem: SheetValuesType) => void
}

export function ListElems({values, onDelete}: PropsType) {

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
      values.map((el: SheetValuesType) => {
        return <ListElem key={el.id} data={el} onDelete={onDelete}/>
      })
    }
  </Box>
}
