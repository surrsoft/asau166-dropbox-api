import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';

export function RedirectGooglePage() {
  const location = useLocation()
  let accessToken: string | null = null;
  try {
    accessToken = new URLSearchParams(location.hash).get('access_token');
  } catch (err: any) {
    throw Error(err.message)
  }
  if (accessToken) {
    GoogleApiTokenStore.tokenPut(accessToken)
    console.info('BR: token added')
  }

  return <Box>
    RedirectGooglePage
  </Box>
}
