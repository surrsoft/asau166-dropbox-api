import { Flex, Heading, Text } from '@chakra-ui/react';
import { useRouteError } from 'react-router-dom';
import loIsString from 'lodash/isString';
import { GapRowStyled } from '../components/GapRowStyled';

export function ErrorPage() {
  const error: any = useRouteError();
  console.log('!!-!!-!!  error {221116182759}\n', error); // del+

  return <Flex flexDirection={'column'} alignItems={'center'} bgColor={'#e6e8d3'}>
    <Heading size={'md'}>Oops!</Heading>
    <GapRowStyled/>
    <Text>Sorry, an unexpected error has occurred.</Text>
    <GapRowStyled/>
    <Text>
      <i>{error?.statusText || error?.message || (loIsString(error) ? error : 'some error')}</i>
    </Text>
  </Flex>
}

