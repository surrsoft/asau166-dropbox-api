import { authUrlCook } from '../apis/dropbox/auth';
import { Button, Heading, VStack, useToast } from '@chakra-ui/react'
import { GapRowStyled } from '../components/GapRowStyled';
import { accessTokenRemove } from '../apis/dropbox/accessTokenStore';

export function LoginPage() {

  const clientId = process.env.REACT_APP_DROPBOX_CLIENT_ID || '';
  const redirectUri = process.env.REACT_APP_REDIRECT_URI || '';
  const dropboxAuthUrl = authUrlCook(clientId, redirectUri);

  const handleLoginClick = () => {
    if (window?.location) {
      window.location.href = dropboxAuthUrl;
    } else {
      console.error('BR: window.location is not accessible');
    }
  }

  const toast = useToast()

  const handleRemoveAccessToken = () => {
    accessTokenRemove();
    toast({
      description: 'done',
      duration: 3000,
      status: 'success'
    })
  }

  return <div>
    <Heading size={'md'}>Authorize Page</Heading>
    <GapRowStyled/>
    <VStack spacing={2} alignItems={'start'}>
      <Button onClick={handleLoginClick}>login to Dropbox</Button>
      <Button onClick={handleRemoveAccessToken}>remove access token</Button>
    </VStack>
  </div>
}
