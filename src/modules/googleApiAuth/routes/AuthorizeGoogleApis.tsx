import { Box, Button } from "@chakra-ui/react";
import { getAuthenticatedClient } from '../../../apis/googleApis/googleApis';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { GapRowStyled } from "../../../components/common/GapRowStyled";

export function AuthorizeGoogleApis() {
  const handleClick = () => {
    getAuthenticatedClient()
  }

  return <Box>
    <Button onClick={handleClick}>authorize to Google APIs</Button>
    <GapRowStyled/>
    <Box>
      token: ${GoogleApiTokenStore.tokenGet() || '<empty>'}
    </Box>
  </Box>
}
