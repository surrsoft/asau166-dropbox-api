import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';

export function RedirectGooglePage() {
  const location = useLocation()
  console.log('!!-!!-!!  location {221120141355}\n', location); // del+
  let accessToken: string | null = null;
  try {
    accessToken = new URLSearchParams(location.hash).get('access_token');
  } catch (err: any) {
    throw Error(err.message)
  }
  console.log('!!-!!-!!  accessToken {221120142011}\n', accessToken); // del+
  if (accessToken) {
    GoogleApiTokenStore.tokenPut(accessToken)
    console.info('BR: token added')
  }

  return <Box>
    RedirectGooglePage
  </Box>
}
