import { Box, Button, Heading } from '@chakra-ui/react';
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { ASAU170_SPREADSHEET_ID, ASAU170_SHEET_PRODUCTS_NAME } from '../../appShopList/configs';
import JSONPretty from 'react-json-pretty'
import { useSheetValuesGet } from '../../../apis/googleSheetsApi/useSheetValuesGet';

export function GoogleSheetsResearchPage() {
  const accessToken = GoogleApiTokenStore.tokenGet()

  const result = useSheetValuesGet(false, {
    accessToken,
    sheetName: ASAU170_SHEET_PRODUCTS_NAME,
    diap: 'A1:B1000',
    spreadsheetId: ASAU170_SPREADSHEET_ID
  })
  console.log('!!-!!-!!  result {221120152120}\n', result); // del+
  const {
    isSuccess: valuesIsSuccess,
    isDone: valuesIsDone,
    isProgress: valuesIsProgress,
    queryResultRaw: {refetch: valuesRefetch}
  } = result;

  const handleClick = async () => {
    await valuesRefetch()
  }

  return <Box>
    <Heading size={'mb'}>GoogleSheetsResearch</Heading>
    <GapRowStyled/>
    <Button onClick={handleClick}>click</Button>
    <GapRowStyled/>
    <JSONPretty data={result?.queryResultRaw?.data?.data}></JSONPretty>
  </Box>
}
