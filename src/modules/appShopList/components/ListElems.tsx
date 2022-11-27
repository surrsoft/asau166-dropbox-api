import { Box } from '@chakra-ui/react';
import { ListElem } from './ListElem';
import { SheetValuesType } from '../types/types';

export interface PropsType {
  values: SheetValuesType[]
  /** должен вызываться при нажатии на кнопку удаления элемента спика */
  onDelete: (elem: SheetValuesType) => void
  onToggle: (elem: SheetValuesType, isChecked: boolean) => Promise<boolean>
  disabled?: boolean
}

export function ListElems({values, onDelete, disabled = false, onToggle}: PropsType) {

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
        return <ListElem
          key={el.id}
          data={el}
          onDelete={onDelete}
          onToggle={onToggle}
          disabled={disabled}
        />
      })
    }
  </Box>
}
