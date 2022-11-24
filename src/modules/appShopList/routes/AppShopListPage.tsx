import { Box, Button, Heading, IconButton, Spinner } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import JSONPretty from 'react-json-pretty'
import { ASAU170_SPREADSHEET_ID, SHEET_PRODUCTS_INFO } from '../constants';
import { ListElems } from '../components/ListElems';
import { useSheetValuesGet } from '../../../apis/googleSheetsApi/useSheetValuesGet';
import { useValuesGetErrorHandle } from '../hooks/useValuesGetErrorHandle';
import styled from 'styled-components';
import { useState } from 'react';
import { useRowInsert } from '../hooks/useRowInsert';

const ButtonsPaneStyled = styled.div`
  display: flex;
`

/**
 * app id: [asau170]
 */
export function AppShopListPage() {
  const accessToken = GoogleApiTokenStore.tokenGet()

  const result = useSheetValuesGet(true, {
    accessToken,
    sheetName: SHEET_PRODUCTS_INFO.name,
    diap: 'A1:B1000',
    spreadsheetId: ASAU170_SPREADSHEET_ID
  })
  const {
    isSuccess: valuesIsSuccess,
    isDone: valuesIsDone,
    isProgress: valuesIsProgress,
    queryResultRaw: {refetch: valuesRefetch},
    data: valuesData,
    errorId: valuesErrorId
  } = result;
  console.log('!!-!!-!!  valuesData {221120161852}\n', valuesData); // del+

  useValuesGetErrorHandle({enabled: valuesIsDone, errorId: valuesErrorId})

  // --- insert mutation

  const {perform: handleAdd} = useRowInsert()

  // ---

  const [temp, tempSet] = useState(0);

  return <Box>
    <Heading size={'mb'}>Shopping List App</Heading>
    <GapRowStyled/>
    {valuesIsProgress && <Spinner/>}
    {valuesIsSuccess && <Box>
			<ButtonsPaneStyled>
				<IconButton aria-label={'button Add'} icon={<AddIcon/>} onClick={handleAdd}/>
			</ButtonsPaneStyled>
			<GapRowStyled height={8}/>
			<ListElems values={valuesData.values}/>
		</Box>}
    {valuesIsDone && !valuesIsSuccess && <JSONPretty data={result.queryResultRaw?.data?.data}></JSONPretty>}
    <GapRowStyled/>
    <Button onClick={() => tempSet(temp + 1)}>temp</Button>
  </Box>
}
