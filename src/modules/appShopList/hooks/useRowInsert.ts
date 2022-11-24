import { useToast } from '@chakra-ui/react';
import { ASAU170_SPREADSHEET_ID, SHEET_PRODUCTS_INFO } from '../constants';
import { isErrorType } from '../../../apis/googleSheetsApi/types/types';
import { DimensionEnum } from '../../../apis/googleSheetsApi/enums/DimensionEnum';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { useBatchUpdate, VariablesType } from '../../../apis/googleSheetsApi/useBatchUpdate';
import { Schema$BatchUpdateSpreadsheetRequest } from '../../../apis/googleSheetsApi/types/sheetsV4types/sheetsV4types';

export enum ResultCodeEnum {
  SUCCESS = 'SUCCESS',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT'
}

interface ReturnType {
  /** инициирует работу по вставке ряда */
  perform: () => void,
  insertIsProgress: boolean
}

/**
 * Вставка пустого ряда на лист 'products' и заполнение его значением ...
 */
export function useRowInsert(): ReturnType {
  const accessToken = GoogleApiTokenStore.tokenGet()
  const toast = useToast()

  const insertMutation = useBatchUpdate({
    accessToken,
    spreadsheetId: ASAU170_SPREADSHEET_ID,
    predicates: {
      predicatesSuccess: [{id: ResultCodeEnum.SUCCESS, predicate: () => true, httpCode: 200}],
      predicatesError: [
        {
          id: ResultCodeEnum.INVALID_ARGUMENT, predicate: (data: any) => {
            console.log('!!-!!-!!  data {221123214344}\n', data); // del+
            return isErrorType(data) && data?.error?.status === 'INVALID_ARGUMENT'
          }, httpCode: 400
        },
      ]
    }
  })

  const {
    resultRaw: {
      reset: insertReset,
      mutate: insertMutate,
      isLoading: insertIsProgress
    },
    resultExtended: {
      isDone: insertIsDone,
      isSuccess: insertIsSuccessExt,
      errMessage: insertErrMessageExt
    }
  } = insertMutation;

  if (insertIsDone) {
    if (insertIsSuccessExt) {
      toast({status: 'success', title: 'success', position: 'top', duration: 1000})
    } else {
      toast({status: 'error', title: 'error', description: 'error to add entry', position: 'top'})
      console.log('!!-!!-!!  insertMutation.resultExtended {221123214312}\n', insertMutation.resultExtended); // del+
      console.error('BR: ' + insertErrMessageExt)
    }
    insertReset()
  }

  const onPerform = async () => {
    const updateBody: Schema$BatchUpdateSpreadsheetRequest = {
      requests: [{
        insertDimension: {
          range: {
            dimension: DimensionEnum.ROWS,
            sheetId: SHEET_PRODUCTS_INFO.sheetId,
            startIndex: 1,
            endIndex: 2
          },
          inheritFromBefore: false
        }
      }, {
        updateCells: {
          rows: [
            {
              values: [
                {userEnteredValue: {stringValue: 'hello'}},
              ]
            }
          ],
          range: {
            sheetId: SHEET_PRODUCTS_INFO.sheetId,
            startRowIndex: 1,
            endRowIndex: 2
          },
          fields: '*'
        }
      }],
    }
    // ---
    await insertMutate({body: updateBody} as VariablesType)
  }

  return {perform: onPerform, insertIsProgress}
}
