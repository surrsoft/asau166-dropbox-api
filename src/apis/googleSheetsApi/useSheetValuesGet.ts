import { useRqCommonRequest } from '../../utils/useRqCommonRequest/useRqCommonRequest';
import { GetValuesParamsType, isErrorType } from './types/types';
import { URL_SPREADSHEETS } from './constants';
import { isValueRangeType } from './types/ValueRangeType';

export enum ResponseTypeEnum {
  SUCCESS = 'success',
  ERROR_INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  ERROR_UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR_SOME = 'error_some',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
}

/**
 * @see про метод get - https://www.notion.so/surr/spreadsheets-values-get-google-sheets-api-d93b185976e3412fab87aa365d8cb008
 */
export function useSheetValuesGet(
  enabled: boolean,
  {
    accessToken,
    spreadsheetId,
    sheetName,
    diap
  }: GetValuesParamsType
) {
  const url = `${URL_SPREADSHEETS}/${spreadsheetId}/values/${sheetName}!${diap}`;
  return useRqCommonRequest({
    queryKey: ['useSheetValuesGet', spreadsheetId, sheetName, diap],
    url,
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    queryOptions: {
      enabled: enabled
    },
    predicatesSuccess: [
      {id: ResponseTypeEnum.SUCCESS, predicate: isValueRangeType, httpCode: 200}
    ],
    predicatesError: [
      {
        id: ResponseTypeEnum.ERROR_INVALID_ARGUMENT,
        predicate: (data: any) => isErrorType(data) && data.error.status === 'INVALID_ARGUMENT',
        httpCode: 400
      },
      {
        id: ResponseTypeEnum.ERROR_UNAUTHENTICATED,
        predicate: (data: any) => isErrorType(data) && data.error.status === 'UNAUTHENTICATED',
        httpCode: 401
      },
      {
        id: ResponseTypeEnum.PERMISSION_DENIED,
        predicate: (data: any) => isErrorType(data) && data.error.status === 'PERMISSION_DENIED',
        httpCode: 403
      },
      {id: ResponseTypeEnum.ERROR_SOME, predicate: isErrorType, httpCode: 400}
    ]
  })
}
