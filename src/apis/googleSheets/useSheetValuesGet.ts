import { useRqCommonRequest } from '../../utils/useRqCommonRequest/useRqCommonRequest';
import { GetValuesParamsType, isErrorType } from './types/types';
import { URL_SPREADSHEETS } from './constants';
import { isValueRangeType } from './types/ValueRangeType';

export enum ResponseTypeEnum {
  SUCCESS = 'success',
  ERROR_INVALID_ARGUMENT = 'INVALID_ARGUMENT',
  ERROR_UNAUTHENTICATED = 'UNAUTHENTICATED',
  ERROR_SOME = 'error_some'
}

/**
 * ОСОБЕННОСТИ:
 * -- пустые хвостовые ячейки не попадают в результата, ведущие пустые ячейки попадают - как пустая строка ""
 * -- полностью пустые строки не попадают в результат
 *
 * EXAMPLE RESULT:
 * <code>
 *   {
 *   "range": "sheet1!A1:B10",
 *   "majorDimension": "ROWS",
 *   "values": [
 *     [
 *       "Ivan",
 *       "300"
 *     ],
 *     [],
 *     [
 *       "some"
 *     ],
 *     [
 *       "",
 *       "empty"
 *     ]
 *   ]
 * }
 * </code>
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
      {id: ResponseTypeEnum.ERROR_SOME, predicate: isErrorType, httpCode: 400}
    ]
  })
}
