import { useBatchUpdate, VariablesType } from '../../../apis/googleSheetsApi/useBatchUpdate';
import { ASAU170_SPREADSHEET_ID } from '../configs';
import { BatchUpdateRequestBodyType } from '../../../apis/googleSheetsApi/types/BatchUpdateRequestBodyType';
import { DimensionEnum } from '../../../apis/googleSheetsApi/enums/DimensionEnum';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { useToast } from '@chakra-ui/react';

/**
 * Вставка пустого ряда
 */
export function useRowInsert() {
  const accessToken = GoogleApiTokenStore.tokenGet()
  const toast = useToast()

  const insertMutation = useBatchUpdate({
    accessToken,
    spreadsheetId: ASAU170_SPREADSHEET_ID,
    predicates: {
      predicatesSuccess: [{id: 'success', predicate: () => true, httpCode: 200}],
      predicatesError: [
        {id: 'err1', predicate: () => true, httpCode: 400}
      ]
    }
  })
  console.log('!!-!!-!! 0000- insertMutation {221122230441}\n', insertMutation); // del+

  const {
    resultRaw: {
      reset: insertReset,
      mutate: insertMutate,
      isLoading: insertIsProgress
    },
    resultExtended: {
      isDone: insertIsDone,
      isSuccess: insertIsSuccessExtended
    }
  } = insertMutation;

  if (insertIsDone) {
    console.log('!!-!!-!! 0000- insertMutation.resultExtended {221123000041}\n', insertMutation.resultExtended); // del+
    if (insertIsSuccessExtended) {
      toast({status: 'success', title: 'success', position: 'top', duration: 1000})
    } else {
      toast({status: 'error', title: 'error', description: 'error at entry addition', position: 'top'})
    }
    insertReset()
  }

  const onHandle = async () => {
    const updateBody: BatchUpdateRequestBodyType = {
      requests: [{
        insertDimension: {
          range: {
            dimension: DimensionEnum.ROWS,
            sheetId: 0,
            startIndex: 1,
            endIndex: 2
          },
          inheritFromBefore: false
        }
      }],
    }
    // ---
    await insertMutate({body: updateBody} as VariablesType)
  }

  return {onHandle, insertIsProgress}
}
