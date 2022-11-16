import { Button, Checkbox, Heading, HStack, Input } from '@chakra-ui/react';
import { isAuthorized } from '../apis/dropbox/auth';
import { GapRowStyled } from '../components/GapRowStyled';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../types';
import { useState } from 'react';
import { accessTokenGet } from '../apis/dropbox/accessTokenStore';
import { ResultCodeEnum, useFilesDownload } from '../apis/dropbox/apiWrapper/useFilesDownload/useFilesDownload';
import { ZintUtils } from '../apis/zintUtils/zintUtils';
import { useFilesUpload } from '../apis/dropbox/apiWrapper/useFilesUpload/useFilesUpload';

// путь к *п-файлу (см. понятие [221116130300])
const zintsPath = process.env.REACT_APP_FILE_DATA_PATH || ''

export function ZtyrPage() {
  const isAuth = isAuthorized()
  const navigate = useNavigate()

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
    const valNew = ev.target.value
    if (valNew && valNew.length < 5) {
      $zintCodeValSet(valNew)
    }
  }
  const handleGenerate = () => {
    const zint = ZintUtils.codeGenerate($isSmootChecked)
    $zintCodeValSet(zint)
  }

  const accessToken = accessTokenGet() || '';

  // --- загрузка *з-строки (см. понятие [221116233200])

  const {
    data: lodingZintsString,
    isDone: loadingIsDone,
    isSuccess: loadingIsSuccess,
    errorId: loadingErrorId,
    isProgress: loadingIsProgress,
    queryResultRaw: {refetch: loadingRefetch}
  } = useFilesDownload(accessToken, zintsPath)
  if (loadingIsDone && !loadingIsSuccess) {
    switch (loadingErrorId) {
      case ResultCodeEnum.PATH_NOT_FOUND:
        throw 'data file not found (err code 221116184054)'
      case ResultCodeEnum.UNAUTHORIZED:
        throw 'unauthorized (err code 221116183924)'
      default:
        throw 'other error (err code 221116181811)'
    }
  }

  // --- выгрузка *zintsString в Dropbox

  const uploadReqRes = useFilesUpload({
    enabled: false,
    accessToken,
    data: (lodingZintsString || '') + $zintCodeVal + '\n',
    filePath: zintsPath,
  })
  const {queryResultRaw: {refetch: uploadRefetch}, isProgress: uploadIsProgress} = uploadReqRes;
  console.log('!!-!!-!!  uploadReqRes {221117002905}\n', uploadReqRes); // del+

  // ---

  const handleSave = async () => {
    if (ZintUtils.codeVerify($zintCodeVal) && lodingZintsString) {
      console.log(`!!-!!-!! upload() -> :::::::::::::: () {221117001911}:${Date.now()}`); // del+
      await uploadRefetch();
      await loadingRefetch();
    } else {
      // TODO
    }
  }

  return <div>
    <Heading size={'mb'}>Ztyr</Heading>
    {
      isAuth ? <div style={{color: 'green'}}>have access token</div> : <div style={{color: 'red'}}>no access token</div>
    }
    <GapRowStyled/>
    <Input bgColor={'white'} value={$zintCodeVal} onChange={handleZintValOnChange}/>
    <GapRowStyled height={8}/>
    <HStack spacing='24px'>
      <Button onClick={handleSave}>Save</Button>
      <Button disabled={!isAuth} onClick={handleGenerate}>generate</Button>
      <Checkbox isChecked={$isSmootChecked} onChange={handleSmootCheckboxOnChange}>smooth mode</Checkbox>
    </HStack>
    {
      !isAuth && <Button onClick={handleToLoginPage}>to Login Page</Button>
    }

    {(loadingIsProgress || uploadIsProgress) && <>
			<GapRowStyled height={8}/>
			<div>Loading ...</div>
		</>}
  </div>
}
