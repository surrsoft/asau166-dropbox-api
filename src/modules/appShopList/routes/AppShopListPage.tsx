import { Box, Button, Heading, IconButton, Input, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import JSONPretty from 'react-json-pretty'
import { ASAU170_SPREADSHEET_ID, SHEET_PRODUCTS_INFO } from '../constants';
import { ListElems } from '../components/ListElems';
import { useSheetValuesGet } from '../../../apis/googleSheetsApi/useSheetValuesGet';
import { useValuesGetErrorHandle } from '../hooks/useValuesGetErrorHandle';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useRowInsert } from '../hooks/useRowInsert';
import { gotoAuth } from '../../../apis/googleApis/googleApis';
import { textAdapt } from '../../../utils/utils';
import { idGen, mapData } from '../utils/utils';
import { SheetValuesType } from '../types/types';

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
  console.log('!!-!!-!!  result {221126154022}\n', result); // del+

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
  const handleOnDelete = (data: SheetValuesType) => {
    console.log('!!-!!-!!  data {221126210838}\n', data); // del+
  }

  // ---
  const isButtonAddDisabled = textAdapt($newEntryVal).length < 1 || insertIsProgress;
  const isInputDisabled = insertIsProgress;

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
			<ListElems values={$valuesData} onDelete={handleOnDelete}/>
		</Box>}
    {
      valuesIsDone && !valuesIsSuccess && !isNeetToAuth
      && <JSONPretty data={result.queryResultRaw?.data?.data}></JSONPretty>
    }
    <GapRowStyled/>
    <Button onClick={handleTemp}>temp</Button>
  </Box>
}
