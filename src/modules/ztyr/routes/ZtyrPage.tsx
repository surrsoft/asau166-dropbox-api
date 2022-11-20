import { Button, Checkbox, Heading, HStack, Input, Text, Spinner, Box, Stack } from '@chakra-ui/react';
import { handleAuthorize, isAuthorized } from '../../../apis/dropbox/auth';
import { GapRowStyled } from '../../../components/common/GapRowStyled';
import { useNavigate } from 'react-router-dom';
import { RoutesEnum } from '../../../types';
import { useEffect, useMemo, useState } from 'react';
import { accessTokenGet } from '../../../apis/dropbox/accessTokenStore';
import { ResultCodeEnum, useFilesDownload } from '../../../apis/dropbox/apiWrapper/useFilesDownload/useFilesDownload';
import { ZintUtils } from '../../../apis/zintUtils/zintUtils';
import { useFilesUpload } from '../../../apis/dropbox/apiWrapper/useFilesUpload/useFilesUpload';
import { LastCodes } from '../../root/components/LastCodes';

// путь к *п-файлу (см. понятие [221116130300])
const zintsPath = process.env.REACT_APP_FILE_DATA_PATH || ''

const CONFIG_LAST_CODES_SHOW_COUNT = 10;

export function ZtyrPage() {
  const isAuth = isAuthorized()
  const navigate = useNavigate()

  // --- $inputValidIs

  const [$inputValidIs, $inputValidIsSet] = useState(true);
  const [$inputErrText, $inputErrTextSet] = useState('');

  const inputErrRemove = () => {
    $inputValidIsSet(true)
    $inputErrTextSet('')
  }

  // ---

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

  // --- download; загрузка *з-строки (см. понятие [221116233200]) т.е. содержимого
  // *п-файла (см. понятие [221116130300])
  const {
    data: loadingZintsString,
    isProgress: loadingIsProgress,
    queryResultRaw: {refetch: loadingRefetch, data: loadingInData},
    errorId: loadingErrorId,
    isDone: loadingIsDone
  } = useFilesDownload({accessToken, filePath: zintsPath, enabled: isAuth})

  // для случая когда у пользователя ещё нет *п-файла (см. понятие [221116130300])
  const {isProgress: initialIsProgress} = useFilesUpload({
    enabled: loadingIsDone && loadingErrorId === ResultCodeEnum.PATH_NOT_FOUND,
    accessToken,
    data: '',
    filePath: zintsPath,
  })

  // --- zintsList, zintsListLast

  const {zintsList, zintsListLast} = useMemo(() => {
    const zintsList = ZintUtils.zintsStringToList(loadingZintsString)
    let zintsListLast: string[] = []
    if (zintsList && zintsList.length > 0) {
      zintsListLast = zintsList.slice(CONFIG_LAST_CODES_SHOW_COUNT * -1).reverse()
    }
    return {zintsList, zintsListLast}
  }, [loadingZintsString]);

  // --- выгрузка *zintsString в Dropbox

  const obj = {
    enabled: false,
    accessToken,
    data: (loadingZintsString || '') + $zintCodeVal + '\n',
    filePath: zintsPath,
  }
  const uploadReqRes = useFilesUpload(obj)
  const {queryResultRaw: {refetch: uploadRefetch}, isProgress: uploadIsProgress} = uploadReqRes;

  // --- handleSave
  // чтобы у спиннера не была "дёргания" в момент когда заканчивается "download" и начинается "upload"
  const [isSavingProgress, isSavingProgressSet] = useState(false);
  const handleSave = async () => {
    if (!ZintUtils.codeVerify($zintCodeVal)) {
      $inputValidIsSet(false)
      return;
    }
    if (ZintUtils.zintAlreadyExistsIs(loadingZintsString, $zintCodeVal)) {
      $inputValidIsSet(false)
      $inputErrTextSet('value already exists')
      return;
    }
    // ---
    isSavingProgressSet(true)
    // это нужно потому, что пока на текущем устройстве был простой, на другом устройстве файл с кодами мог быть уже
    // изменён
    await loadingRefetch();
    // без setTimeout полученные данные не успеют попасть в хук аплоада
    setTimeout(async () => {
      await uploadRefetch();
      await loadingRefetch();
      isSavingProgressSet(false)
    }, 0);
  }

  const isProgress = loadingIsProgress || uploadIsProgress || initialIsProgress || isSavingProgress;

  // ---

  return <div>
    <Heading size={'mb'}>Ztyr</Heading>
    <GapRowStyled/>
    {!isAuth && <Button onClick={handleAuthorize}>go to authorize</Button>}
    {isAuth && <>
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
			<Stack direction={{base: 'column', lg: 'row'}} spacing='8px'>
				<Box display='flex' columnGap='8px'>
					<Button disabled={isProgress} onClick={handleGenerate} flexGrow={1}>generate</Button>
					<Button onClick={handleSave} disabled={isProgress || !$inputValidIs} flexGrow={1}>save</Button>
				</Box>
				<Checkbox
					isChecked={$isSmootChecked}
					onChange={handleSmootCheckboxOnChange}
					disabled={isProgress}
				>
					smooth mode
				</Checkbox>
        {!isProgress && <Box display='flex' alignItems='center'>
					<Box>элементов всего: {zintsList.length}</Box>
				</Box>}
			</Stack>
      {(isProgress) && <>
				<GapRowStyled height={8}/>
				<Spinner/>
			</>}
      {!isProgress && <>
				<GapRowStyled height={16}/>
				<LastCodes zintCodes={zintsListLast}/>
			</>
      }
		</>}
  </div>
}
