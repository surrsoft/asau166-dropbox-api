import { authUrlCook, handleAuthorize } from '../apis/dropbox/auth';
import { Button, Heading, VStack, useToast } from '@chakra-ui/react'
import { GapRowStyled } from '../components/common/GapRowStyled';
import { accessTokenRemove } from '../apis/dropbox/accessTokenStore';

export function LoginPage() {

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
      <Button onClick={handleAuthorize}>authorize to Dropbox</Button>
      <Button onClick={handleRemoveAccessToken}>remove access token</Button>
    </VStack>
  </div>
}
