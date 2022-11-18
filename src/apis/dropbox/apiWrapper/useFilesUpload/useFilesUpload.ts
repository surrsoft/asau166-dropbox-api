import { DROPBOX_URL_CONTENT, DropboxMethodEnum } from '../constants';
import { useRqCommonRequest } from '../../../../utils/useRqCommonRequest/useRqCommonRequest';
import { RequestMethodEnum } from '../../../../utils/useRqCommonRequest/enums/RequestMethodEnum';
import { isErrorPathNotFoundPredicate } from '../../types';
import { isFileMetadataType, WriteModeType } from '../types';

export enum ResultCodeEnum {
  SUCCESS = 'success',
  PATH_NOT_FOUND = 'path_not_found',
  UNAUTHORIZED = 'unauthorized'
}

export interface ParamsType {
  enabled?: boolean
  accessToken: string
  filePath: string
  /** see https://www.notion.so/surr/Types-dropbox-api-3c60a8a057264a78ad50efbf6d01b269 */
  writeMode?: WriteModeType
  /** данные которые нужно записать в файл */
  data: string
}

export function useFilesUpload({enabled = true, accessToken, filePath, data, writeMode = {'.tag': 'overwrite'}}: ParamsType) {
  return useRqCommonRequest({
    queryKey: ['asau166-dropbox-api-files_upload'],
    url: `${DROPBOX_URL_CONTENT}${DropboxMethodEnum.FILES__UPLOAD}`,
    method: RequestMethodEnum.POST,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/octet-stream',
      'Dropbox-API-Arg': JSON.stringify({path: filePath, mode: writeMode}),
    },
    body: data,
    predicatesSuccess: [{id: ResultCodeEnum.SUCCESS, predicate: isFileMetadataType, httpCode: 200}],
    predicatesError: [
      {id: ResultCodeEnum.PATH_NOT_FOUND, predicate: isErrorPathNotFoundPredicate, httpCode: 409},
      {id: ResultCodeEnum.UNAUTHORIZED, predicate: () => true, httpCode: 401},
    ],
    queryOptions: {
      enabled
    }
  })
}
