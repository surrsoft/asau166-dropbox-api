import { Box, Button, Heading, IconButton, Input, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import JSONPretty from 'react-json-pretty'
import { ASAU170_SPREADSHEET_ID, CONF_NODATA_ROWS_COUNT, SHEET_PRODUCTS_INFO } from '../constants';
import { ListElems } from '../components/ListElems';
import { useSheetValuesGet } from '../../../apis/googleSheetsApi/useSheetValuesGet';
import { useValuesGetErrorHandle } from '../hooks/useValuesGetErrorHandle';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRowInsert } from '../hooks/useRowInsert';
import { gotoAuth } from '../../../apis/googleApis/googleApis';
import { textAdapt } from '../../../utils/utils';
import { idGen, mapData } from '../utils/utils';
import { SheetValuesType } from '../types/types';
import { useBatchUpdateB } from '../../../apis/googleSheetsApi/useBatchUpdateB';
import { useRowDelete } from '../hooks/useRowDelete';

const ButtonsPaneStyled = styled.div`
  display: flex;
  align-items: center;
  background-color: #e3bebe;
  padding: 8px;
  border-radius: 8px;
  max-width: 300px;
`

/**
 * app id: [asau170]
 */
export function AppShopListPage() {
  const accessToken = GoogleApiTokenStore.tokenGet()
  // состояние списка продуктов
  const [$valuesData, $valuesDataSet] = useState<SheetValuesType[]>([]);

  // --- get data
  const result = useSheetValuesGet(true, {
    accessToken,
    sheetName: SHEET_PRODUCTS_INFO.name,
    diap: 'A:C',
    spreadsheetId: ASAU170_SPREADSHEET_ID
  })
  const {
    isSuccess: valuesIsSuccess,
    isDone: valuesIsDone,
    isProgress: valuesIsProgress,
    data: valuesData,
    errorId: valuesErrorId
  } = result;

  useEffect(() => {
    if (valuesIsDone && valuesData?.values) {
      const values = mapData(valuesData?.values)
      $valuesDataSet(values)
    }
  }, [valuesIsDone, valuesData?.values]);

  const isNeetToAuth = useValuesGetErrorHandle({enabled: valuesIsDone, errorId: valuesErrorId})

  // --- insert product

  // добавляемый элемент
  const [$elemAdded, $elemAddingSet] = useState<SheetValuesType | null>(null);
  const {perform: insertHandleAdd, insertIsProgress} = useRowInsert({
    onSuccess: () => {
      if ($elemAdded) {
        const values = [$elemAdded, ...$valuesData]
        $valuesDataSet(values)
      }
    },
  })

  const handleOnAdd = async () => {
    const val = textAdapt($newEntryVal)
    const obj = {name: val, isChecked: false, id: idGen()} as SheetValuesType
    $elemAddingSet(obj)
    await insertHandleAdd(obj)
  }

  // ---
  const handleToAuth = () => {
    gotoAuth()
  }

  // --- temp
  const [temp, tempSet] = useState(0);
  const handleTemp = () => {
    $valuesDataSet([
      {
        id: idGen(),
        name: 'test-test',
        isChecked: false
      } as SheetValuesType
    ])
  }

  // ---
  const [$newEntryVal, $newEntryValSet] = useState('');
  const handleNewEntryOnChange = (event: any) => {
    const val = event.target?.value || '';
    $newEntryValSet(val)
  }

  // ---
  const {perform: handleDelete, isProgress: deleteIsProgress}
    = useRowDelete({valuesData: $valuesData, valuesDataSet: $valuesDataSet})

  // ---
  const handleToggle = (elem: SheetValuesType, isChecked: boolean) => {
    console.log('!!-!!-!! 0014- elem {221127001450}\n', elem); // del+
    console.log('!!-!!-!! 0014- isChecked {221127001457}\n', isChecked); // del+
    const index = $valuesData.findIndex(el => el.id === elem.id)
    if (index !== -1) {
      if (isChecked) {
        const indexChecked = $valuesData.findIndex(el => el.isChecked)
        const moved = $valuesData.splice(index, 1)[0]
        moved.isChecked = true;
        $valuesData.splice(indexChecked - 1, 0, moved)
        $valuesDataSet([...$valuesData])
      } else {
        const moved = $valuesData.splice(index, 1)[0]
        moved.isChecked = false;
        $valuesData.splice(0, 0, moved)
        $valuesDataSet([...$valuesData])
      }
    }
  }

  // ---
  const isButtonAddDisabled = textAdapt($newEntryVal).length < 1 || insertIsProgress || deleteIsProgress;
  const isInputDisabled = insertIsProgress || deleteIsProgress;
  const isListDisabled = insertIsProgress || deleteIsProgress;

  return <Box>
    <Heading size={'mb'}>Shopping List App</Heading>
    <GapRowStyled/>
    {valuesIsProgress && <Spinner/>}
    {isNeetToAuth && <Button onClick={handleToAuth}>to Google Sheets Auth</Button>}
    {valuesIsSuccess && <Box>
			<ButtonsPaneStyled>
				<Input
					bg={'white'}
					value={$newEntryVal}
					onChange={handleNewEntryOnChange}
					disabled={isInputDisabled}
				/>
        {!insertIsProgress && <IconButton
					aria-label={'button Add'}
					icon={<AddIcon/>}
					onClick={handleOnAdd} ml={'8px'}
					disabled={isButtonAddDisabled}
				/>}
        {insertIsProgress && <Box w={'40px'} h={'40px'} p={'6px'} ml={'8px'}><Spinner/></Box>}
			</ButtonsPaneStyled>

			<GapRowStyled height={8}/>
			<ListElems
				values={$valuesData}
				onDelete={handleDelete}
				onToggle={handleToggle}
				disabled={isListDisabled}
			/>
		</Box>}
    {
      valuesIsDone && !valuesIsSuccess && !isNeetToAuth
      && <JSONPretty data={result.queryResultRaw?.data?.data}></JSONPretty>
    }
    <GapRowStyled/>
    <Button onClick={handleTemp}>temp</Button>
  </Box>
}
