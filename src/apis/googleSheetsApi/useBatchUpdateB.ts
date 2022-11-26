import { URL_SPREADSHEETS } from './constants';
import { SpreadsheetId } from './types/types';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { MutationHandleReturnType } from '../../utils/useRqCommonRequest/mutationHandle';
import { PredicateDescriptor } from '../../utils/useRqCommonRequest/types/PredicateDescriptor';
import { Schema$BatchUpdateSpreadsheetRequest } from './types/sheetsV4types/sheetsV4types';

export interface VariablesType {
  body: Schema$BatchUpdateSpreadsheetRequest,
}

export interface PredicatesType {
  predicatesSuccess?: PredicateDescriptor[],
  predicatesError?: PredicateDescriptor[]
}

export interface ReturnType {
  resultRaw: any
  resultExtended: MutationHandleReturnType
}

export interface ParamsType {
  accessToken: string;
  spreadsheetId: SpreadsheetId;
}

/**
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 *
 * ID [[221126235510]] rev 1 1.0.0 2022-11-26
 */
export function useBatchUpdateB({accessToken, spreadsheetId}: ParamsType) {
  const url = `${URL_SPREADSHEETS}/${spreadsheetId}:batchUpdate` // back
  try {
    return useMutation<any, any, VariablesType>((variables: VariablesType) => {
      return axios.post(url, variables.body, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    });
  } catch (err: any) {
    throw err;
  }
}
