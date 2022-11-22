import { Box, Button } from "@chakra-ui/react";
import { gotoAuth } from '../../../apis/googleApis/googleApis';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { GapRowStyled } from "../../../components/common/GapRowStyled";
import { useState } from 'react';

function tokenToUiGet() {
  return GoogleApiTokenStore.tokenGet() || '<empty>'
}

export function AuthorizeGoogleApisPage() {
  const [token, tokenSet] = useState(tokenToUiGet());

  const handleAuth = () => {
    gotoAuth()
  }

  const handleClear = () => {
    GoogleApiTokenStore.tokenRemove()
    tokenSet(tokenToUiGet)
  }

  return <Box>
    <Box>
      <Button onClick={handleAuth}>authorize to Google APIs</Button>
      <GapRowStyled height={8}/>
      <Button onClick={handleClear}>clear access token</Button>
    </Box>
    <GapRowStyled/>
    <Box>
      token: {token}
    </Box>
  </Box>
}
