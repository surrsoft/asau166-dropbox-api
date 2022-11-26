import { useToast, UseToastOptions } from '@chakra-ui/react';
import { ASAU170_SPREADSHEET_ID, SHEET_PRODUCTS_INFO, toastError, toastSuccess } from '../constants';
import { isErrorType } from '../../../apis/googleSheetsApi/types/types';
import { DimensionEnum } from '../../../apis/googleSheetsApi/enums/DimensionEnum';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { useBatchUpdate, VariablesType } from '../../../apis/googleSheetsApi/useBatchUpdate';
import { Schema$BatchUpdateSpreadsheetRequest } from '../../../apis/googleSheetsApi/types/sheetsV4types/sheetsV4types';
import { SheetValuesType } from '../types/types';

export enum ResultCodeEnum {
  SUCCESS = 'SUCCESS',
  INVALID_ARGUMENT = 'INVALID_ARGUMENT'
}

interface ReturnType {
  /** инициирует работу по вставке ряда */
  perform: (value: SheetValuesType) => void,
  insertIsProgress: boolean
}

export interface PropsType {
  onSuccess?: () => void
  onError?: () => void
}

/**
 * Вставка пустого ряда на лист 'products' и заполнение его значением ...
 */
export function useRowInsert({onSuccess, onError}: PropsType): ReturnType {
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
      toast({...toastSuccess, description: 'success add'})
      onSuccess?.()
    } else {
      toast({...toastError, description: 'error to add entry'})
      console.error('BR: ' + insertErrMessageExt)
      onError?.()
    }
    insertReset()
  }

  const onPerform = async (value: SheetValuesType) => {
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
                {userEnteredValue: {stringValue: value.name}},
                {userEnteredValue: {stringValue: value.isChecked ? '1' : ''}},
                {userEnteredValue: {stringValue: value.id}},
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
