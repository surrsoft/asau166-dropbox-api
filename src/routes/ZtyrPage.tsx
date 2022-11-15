import { Button, Heading, Input } from '@chakra-ui/react';
import { isAuthorized } from '../apis/dropbox/auth';
import { GapRowStyled } from '../components/GapRowStyled';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../types';
import { useRecords } from '../hooks/useRecords';

export function ZtyrPage() {
  const isAuth = isAuthorized()
  const navigate = useNavigate()

  const handleToLoginPage = () => {
    navigate('/' + RoutesEnum.LOGIN)
  }

  const res = useRecords()

  return <div>
    <Heading size={'mb'}>Ztyr</Heading>
    {
      isAuth ? <div style={{color: 'green'}}>have access token</div> : <div style={{color: 'red'}}>no access token</div>
    }
    <GapRowStyled/>
    <Input bgColor={'white'}/>
    <GapRowStyled height={8}/>
    <Button disabled={!isAuth}>generate</Button>
    {
      !isAuth && <Button onClick={handleToLoginPage}>to Login Page</Button>
    }
  </div>
}
