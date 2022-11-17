import { Button, Checkbox, Heading, HStack, Input, useToast, Text, Spinner, Box } from '@chakra-ui/react';
import { isAuthorized } from '../apis/dropbox/auth';
import { GapRowStyled } from '../components/GapRowStyled';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../types';
import { useMemo, useState } from 'react';
import { accessTokenGet } from '../apis/dropbox/accessTokenStore';
import { useFilesDownload } from '../apis/dropbox/apiWrapper/useFilesDownload/useFilesDownload';
import { ZintUtils } from '../apis/zintUtils/zintUtils';
import { useFilesUpload } from '../apis/dropbox/apiWrapper/useFilesUpload/useFilesUpload';
import { LastCodes } from '../components/LastCodes';

// путь к *п-файлу (см. понятие [221116130300])
const zintsPath = process.env.REACT_APP_FILE_DATA_PATH || ''

const CONFIG_LAST_CODES_SHOW_COUNT = 10;

export function ZtyrPage() {
  const isAuth = isAuthorized()
  const navigate = useNavigate()

  const toast = useToast()

  // --- $inputValidIs

  const [$inputValidIs, $inputValidIsSet] = useState(true);
  const [$inputErrText, $inputErrTextSet] = useState('');

  const inputErrRemove = () => {
    $inputValidIsSet(true)
    $inputErrTextSet('')
  }

  // ---

  const handleToLoginPage = () => {
    navigate('/' + RoutesEnum.LOGIN)
  }

  const [$isSmootChecked, $isSmootCheckedSet] = useState(false);
  const handleSmootCheckboxOnChange = (ev: any) => {
    const stateNew = ev.target.checked;
    $isSmootCheckedSet(stateNew)
  }

  const [$zintCodeVal, $zintCodeValSet] = useState('');
  const handleZintValOnChange = (ev: any) => {
    inputErrRemove()
    const valNew = ev.target.value
    if (valNew && valNew.length < 5) {
      $zintCodeValSet(valNew)
    }
  }
  const handleGenerate = () => {
    inputErrRemove()
    const zint = ZintUtils.codeGenerate($isSmootChecked)
    $zintCodeValSet(zint)
  }

  const accessToken = accessTokenGet() || '';

  // --- загрузка *з-строки (см. понятие [221116233200])

  const {
    data: loadingZintsString,
    isProgress: loadingIsProgress,
    queryResultRaw: {refetch: loadingRefetch}
  } = useFilesDownload(accessToken, zintsPath)

  // --- zintsList, zintsListLast

  const {zintsList, zintsListLast} = useMemo(() => {
    const zintsList = ZintUtils.zintsStringToList(loadingZintsString)
    let zintsListLast: string[] = []
    if (zintsList && zintsList.length > 0) {
      zintsListLast = zintsList.slice(CONFIG_LAST_CODES_SHOW_COUNT * -1).reverse()
    }
    return {zintsList, zintsListLast}
  }, [loadingZintsString]);
  console.log('!!-!!-!!  zintsList {221117115256}\n', zintsList); // del+


  // --- выгрузка *zintsString в Dropbox

  const uploadReqRes = useFilesUpload({
    enabled: false,
    accessToken,
    data: (loadingZintsString || '') + $zintCodeVal + '\n',
    filePath: zintsPath,
  })
  const {queryResultRaw: {refetch: uploadRefetch}, isProgress: uploadIsProgress} = uploadReqRes;
  console.log('!!-!!-!!  uploadReqRes {221117002905}\n', uploadReqRes); // del+

  // --- handleSave

  const handleSave = async () => {
    if (!(ZintUtils.codeVerify($zintCodeVal) && loadingZintsString)) {
      $inputValidIsSet(false)
      return;
    }
    if (ZintUtils.zintAlreadyExistsIs(loadingZintsString, $zintCodeVal)) {
      $inputValidIsSet(false)
      $inputErrTextSet('value already exists')
      return;
    }
    await uploadRefetch();
    await loadingRefetch();
  }

  const isProgress = loadingIsProgress || uploadIsProgress

  // ---

  return <div>
    <Heading size={'mb'}>Ztyr</Heading>
    {
      isAuth ? <div style={{color: 'green'}}>have access token</div> : <div style={{color: 'red'}}>no access token</div>
    }
    <GapRowStyled/>
    <Input
      bgColor={'white'}
      value={$zintCodeVal}
      onChange={handleZintValOnChange}
      isInvalid={!$inputValidIs}
      disabled={isProgress}
    />
    {!$inputValidIs && <Text
			fontSize={'xs'}
			color={'#b42460'}
			paddingLeft={2}
		>
      {'invalid value' + ($inputErrText ? `; ${$inputErrText}` : '')}
		</Text>}
    <GapRowStyled height={8}/>
    <HStack spacing='24px'>
      <Button onClick={handleSave} disabled={isProgress || !$inputValidIs}>Save</Button>
      <Button disabled={isProgress} onClick={handleGenerate}>generate</Button>
      <Checkbox
        isChecked={$isSmootChecked}
        onChange={handleSmootCheckboxOnChange}
        disabled={isProgress}
      >smooth mode</Checkbox>
      {!isProgress && <Box paddingLeft={8}>
				<Box>элементов всего: {zintsList.length}</Box>
			</Box>}
    </HStack>
    {
      !isAuth && <Button onClick={handleToLoginPage}>to Login Page</Button>
    }
    {isProgress && <>
			<GapRowStyled height={8}/>
			<Spinner/>
		</>}
    {!isProgress && <>
			<GapRowStyled height={16}/>
			<LastCodes zintCodes={zintsListLast}/>
		</>
    }
  </div>
}
