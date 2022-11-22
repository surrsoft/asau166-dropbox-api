import { URL_SPREADSHEETS } from './constants';
import { SpreadsheetId } from './types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UpdateRequestBodyType } from './types/UpdateRequestBodyType';
import { AsyncModeEnum, mutationHandle } from '../../utils/useRqCommonRequest/mutationHandle';
import { PredicateDescriptor } from '../../utils/useRqCommonRequest/types/PredicateDescriptor';

export interface ParamsType {
  accessToken: string;
  spreadsheetId: SpreadsheetId;
  predicates?: PredicatesType
}

export interface VariablesType {
  body: any,
}

export interface PredicatesType {
  predicatesSuccess?: PredicateDescriptor[],
  predicatesError?: PredicateDescriptor[]
}

/**
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 *
 * ID [[221123015635]] rev 1 1.0.0 2022-11-23
 *
 * @param accessToken
 * @param spreadsheetId
 * @param predicates
 */
export function useBatchUpdate({accessToken, spreadsheetId, predicates}: ParamsType) {
  const url = `${URL_SPREADSHEETS}/${spreadsheetId}:batchUpdate`

  const result = useMutation<UpdateRequestBodyType, any, VariablesType>((variables: VariablesType) => {
    return axios.post(url, variables.body, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  })

  const resultNext = mutationHandle({
    mutationResult: result,
    asyncMode: AsyncModeEnum.AXIOS,
    predicatesSuccess: predicates?.predicatesSuccess || [],
    predicatesError: predicates?.predicatesError || []
  })

  return {
    resultRaw: result,
    resultExtended: resultNext
  };
}
