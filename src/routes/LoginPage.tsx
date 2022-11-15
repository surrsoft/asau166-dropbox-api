import { authUrlCook } from '../apis/dropbox/auth';
import { Button, Heading } from '@chakra-ui/react'
import { GapRowStyled } from '../components/GapRowStyled';

export function LoginPage() {

  const clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID || '';
  const redirectUri = process.env.REACT_APP_REDIRECT_URI || '';
  const dropboxAuthUrl = authUrlCook(clientId, redirectUri);
  console.log('!!-!!-!!  process.env {221115183746}\n', process.env); // del+

  const handleLoginClick = () => {
    if (window?.location) {
      window.location.href = dropboxAuthUrl;
    } else {
      console.error('BR: window.location is not accessible');
    }
  }

  return <div>
    <Heading size={'md'}>Authorize Page</Heading>
    <GapRowStyled />
    <Button onClick={handleLoginClick}>login to Dropbox</Button>
  </div>
}
