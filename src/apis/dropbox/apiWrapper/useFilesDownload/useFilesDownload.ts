import { useRqCommonRequest } from '../../../../utils/useRqCommonRequest/useRqCommonRequest';
import { DROPBOX_URL_CONTENT, DropboxMethodEnum } from '../constants';
import { RequestMethodEnum } from '../../../../utils/useRqCommonRequest/enums/RequestMethodEnum';
import { isSuccessPredicate } from './types';
import { isErrorPathNotFoundPredicate } from '../../types';

export enum ResultCodeEnum {
  SUCCESS = 'success',
  PATH_NOT_FOUND = 'path_not_found',
  UNAUTHORIZED = 'unauthorized'
}

export interface ParamsType {
  accessToken: string
  filePath: string
  enabled?: boolean
}

/**
 * получение содержимого файла {@param filePath}
 * @param accessToken
 */
export function useFilesDownload({accessToken, filePath, enabled = true}: ParamsType) {
  const result = useRqCommonRequest({
    queryKey: ['asau166-dropbox-api-files_download'],
    url: `${DROPBOX_URL_CONTENT}${DropboxMethodEnum.FILES__DOWNLOAD}`,
    method: RequestMethodEnum.POST,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Dropbox-API-Arg': JSON.stringify({path: filePath})
    },
    predicatesSuccess: [{id: ResultCodeEnum.SUCCESS, predicate: isSuccessPredicate, httpCode: 200}],
    predicatesError: [
      {id: ResultCodeEnum.PATH_NOT_FOUND, predicate: isErrorPathNotFoundPredicate, httpCode: 409},
      {id: ResultCodeEnum.UNAUTHORIZED, predicate: () => true, httpCode: 401},
    ],
    queryOptions: {
      enabled
    }
  })

  const {isDone, isSuccess, errorId, queryResultRaw} = result;

  console.log('!!-!!-!!  queryResultRaw {221117165146}\n', queryResultRaw); // del+

  if (isDone && !isSuccess) {
    switch (errorId) {
      case ResultCodeEnum.PATH_NOT_FOUND:
        throw 'data file not found (err code 221116184054)'
      case ResultCodeEnum.UNAUTHORIZED:
        throw 'unauthorized (err code 221116183924)'
      default:
        throw `other error (err code 221116181811); ${JSON.stringify(queryResultRaw || '')}`
    }
  }

  return result;
}
