import { useBatchUpdateB } from '../../../apis/googleSheetsApi/useBatchUpdateB';
import {
  ASAU170_SPREADSHEET_ID,
  CONF_NODATA_ROWS_COUNT, SHEET_PRODUCTS_CHECK_COLUMN,
  SHEET_PRODUCTS_INFO,
  toastError,
  toastSuccess
} from '../constants';
import { SheetValuesType } from '../types/types';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { useToast } from '@chakra-ui/react';
import { rowMoveRequest } from '../../../apis/googleSheetsApi/batchUpdateRequests/rowMoveRequest';
import { cellsUpdateRequest } from '../../../apis/googleSheetsApi/batchUpdateRequests/cellsUpdateRequest';

export interface PerformType {
  itemFrom: SheetValuesType,
  /** если тут FALSY то значит ряд нужно переместить в самый конец */
  itemTo?: SheetValuesType
  isChecked: boolean
  resolve: (value: (PromiseLike<boolean> | boolean)) => void
}

export interface ParamsType {
  // стейт списка
  valuesData: any
  // обновление стейта списка
  valuesDataSet: any
}

/**
 * Мутация удаления указанного элемента
 */
export function useRowMove({valuesData, valuesDataSet}: ParamsType) {
  const accessToken = GoogleApiTokenStore.tokenGet()
  const moveMutation = useBatchUpdateB({accessToken, spreadsheetId: ASAU170_SPREADSHEET_ID})
  const toast = useToast()

  // ---
  const performMove = ({itemFrom, itemTo, isChecked, resolve}: PerformType) => {
    // --- indexFrom
    const indexFrom = valuesData.findIndex((el: any) => el.id === itemFrom.id)
    // --- indexTo
    let indexTo: number;
    if (itemTo) {
      indexTo = valuesData.findIndex((el: any) => el.id === itemTo.id)
    } else {
      indexTo = valuesData.length
    }
    // ---
    if (indexFrom !== -1 && indexTo !== -1) {
      const indexFromNext = indexFrom + CONF_NODATA_ROWS_COUNT
      const indexToNext = indexTo + CONF_NODATA_ROWS_COUNT
      const rowMoveReq = rowMoveRequest(SHEET_PRODUCTS_INFO.sheetId, indexFromNext, indexToNext);
      const cellsUpdateReq = cellsUpdateRequest({
        sheetId: SHEET_PRODUCTS_INFO.sheetId,
        rowIndex: isChecked ? indexToNext - 1 : CONF_NODATA_ROWS_COUNT,
        columnIndex: SHEET_PRODUCTS_CHECK_COLUMN.columnIndex,
        values: isChecked ? ['1'] : ['']
      })
      // --- requests
      let requests = []
      if (indexFrom === indexTo) {
        requests.push(cellsUpdateReq)
      } else {
        requests.push(rowMoveReq, cellsUpdateReq)
      }
      // ---
      moveMutation
        .mutateAsync({body: {requests}})
        .then(() => {
          // --- обновление стейта списка
          const removeCount = 1;
          const moving = valuesData.splice(indexFrom, removeCount)[0]
          console.log('!!-!!-!!  moving {221127123018}\n', moving); // del+
          moving.isChecked = isChecked;
          if (isChecked) {
            valuesData.splice(indexTo - removeCount, 0, moving)
          } else {
            valuesData.splice(CONF_NODATA_ROWS_COUNT - 1, 0, moving)
          }
          valuesDataSet(valuesData)
          // ---
          toast({...toastSuccess, description: 'success move'})
          resolve(true)
        })
        .catch((err: any) => {
          toast({...toastError, description: 'error move'})
          console.error('BR: ' + err?.message)
          resolve(false)
        })
    }
  }
  // ---
  return {perform: performMove, mutation: moveMutation, isProgress: moveMutation.isLoading}
}
