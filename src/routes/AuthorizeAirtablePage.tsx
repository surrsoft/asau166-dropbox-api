import { Box, Button, Heading } from '@chakra-ui/react';
import { GapRowStyled } from '../components/common/GapRowStyled';
import { AirtableAccessTokenStoreCls } from '../apis/airtable/AirtableAccessTokenStoreCls';
import { authotirzationCodeRequest } from '../apis/airtable/airtableOAuthApi/authotirzationCodeRequest';

export function AuthorizeAirtablePage() {

  const handleAuth = () => {
    authotirzationCodeRequest()
  }

  const handleTokenRemove = () => {
    AirtableAccessTokenStoreCls.tokenRemove()
  }

  const accessToken = AirtableAccessTokenStoreCls.tokenGet()

  return <Box>
    <Heading size={'mb'}>authorize airtable</Heading>
    <GapRowStyled height={16}/>
    <Box display='flex' wordBreak={'break-all'}>token: {accessToken || '<empty>'}</Box>
    <GapRowStyled height={8}/>
    <Box display='flex' flexDirection='column' rowGap='8px' alignItems={'start'}>
      <Button onClick={handleAuth}>access token get (auth to airtable)</Button>
      <Button onClick={handleTokenRemove}>access token remove</Button>
    </Box>
  </Box>
}
