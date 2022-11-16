import { useRqCommonRequest } from '../../../../utils/useRqCommonRequest/useRqCommonRequest';
import { DROPBOX_URL_API, DropboxMethodEnum } from '../constants';
import { RequestMethodEnum } from '../../../../utils/useRqCommonRequest/enums/RequestMethodEnum';
import { isErrorPathNotFoundPredicate } from '../../types';
import { isFileMetadataType } from '../types';

export enum ResultIdsEnum {
  SUCCESS = 'success',
  PATH_NOT_FOUND = 'path_not_found'
}

/**
 * получение метаинформации о сущности {@param entryPath} (файл, папка)
 * @param accessToken
 */
export function useFilesGetMetadata(accessToken: string, entryPath: string) {
  return useRqCommonRequest({
    queryKey: ['asau166-dropbox-api-files_get_metadata'],
    url: `${DROPBOX_URL_API}${DropboxMethodEnum.FILES__GET_METADATA}`,
    method: RequestMethodEnum.POST,
    body: {
      path: entryPath
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    predicatesSuccess: [{id: ResultIdsEnum.SUCCESS, predicate: isFileMetadataType, httpCode: 200}],
    predicatesError: [{id: ResultIdsEnum.PATH_NOT_FOUND, predicate: isErrorPathNotFoundPredicate, httpCode: 409}]
  })
}
