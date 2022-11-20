import { Box, Button } from "@chakra-ui/react";
import { getAuthenticatedClient } from '../../../apis/googleApis/googleApis';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { GapRowStyled } from "../../../components/common/GapRowStyled";

export function AuthorizeGoogleApis() {
  console.log('!!-!!-!!  process.env.NODE_ENV {221120172706}\n', process.env.NODE_ENV); // del+
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
