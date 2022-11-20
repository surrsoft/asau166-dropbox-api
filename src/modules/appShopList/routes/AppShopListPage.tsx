import { Box, Button, Heading } from '@chakra-ui/react';
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import JSONPretty from 'react-json-pretty'
import { useSheetValuesGet } from '../../../apis/googleSheets/useSheetValuesGet';
import { ASAU170_SHEET_PRODUCTS_NAME, ASAU170_SPREADSHEET_ID } from '../configs';
import { ListElems } from '../components/ListElems';

/**
 * app id: [asau170]
 */
export function AppShopListPage() {
  const accessToken = GoogleApiTokenStore.tokenGet()

  const result = useSheetValuesGet(true, {
    accessToken,
    sheetName: ASAU170_SHEET_PRODUCTS_NAME,
    diap: 'A1:B1000',
    spreadsheetId: ASAU170_SPREADSHEET_ID
  })
  const {
    isSuccess: valuesIsSuccess,
    isDone: valuesIsDone,
    isProgress: valuesIsProgress,
    queryResultRaw: {refetch: valuesRefetch},
    data: valuesData
  } = result;
  console.log('!!-!!-!!  valuesData {221120161852}\n', valuesData); // del+

  return <Box>
    <Heading size={'mb'}>Shopping List App</Heading>
    <GapRowStyled/>
    {valuesIsSuccess && <ListElems values={valuesData.values}/>}
    {!valuesIsSuccess && <JSONPretty data={result.queryResultRaw?.data?.data}></JSONPretty>}
  </Box>
}
