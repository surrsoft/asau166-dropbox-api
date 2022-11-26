import { useBatchUpdateB } from '../../../apis/googleSheetsApi/useBatchUpdateB';
import {
  ASAU170_SPREADSHEET_ID,
  CONF_NODATA_ROWS_COUNT,
  SHEET_PRODUCTS_INFO,
  toastError,
  toastSuccess
} from '../constants';
import { SheetValuesType } from '../types/types';
import { GoogleApiTokenStore } from '../../../apis/googleApis/GoogleApiTokenStore';
import { useToast } from '@chakra-ui/react';
import { rowDeleteRequest } from '../../../apis/googleSheetsApi/batchUpdateRequests/rowDeleteRequest';

export interface ParamsType {
  // стейт списка
  valuesData: any
  // обновление стейта списка
  valuesDataSet: any
}

/**
 * Мутация удаления указанного элемента
 * @param valuesData
 * @param valuesDataSet
 */
export function useRowDelete({valuesData, valuesDataSet}: ParamsType) {
  const accessToken = GoogleApiTokenStore.tokenGet()
  const deleteMutation = useBatchUpdateB({accessToken, spreadsheetId: ASAU170_SPREADSHEET_ID})
  const toast = useToast()
  // ---
  const performDelete = ({id: deleteId}: SheetValuesType) => {
    const index = valuesData.findIndex((el: any) => el.id === deleteId)
    if (index !== -1) {
      const indexNext = index + CONF_NODATA_ROWS_COUNT
      const rowDeleteObj = rowDeleteRequest(SHEET_PRODUCTS_INFO.sheetId, indexNext)
      deleteMutation
        .mutateAsync({body: {requests: [rowDeleteObj]}})
        .then(() => {
          // --- обновление стейта списка
          valuesData.splice(index, 1)
          valuesDataSet(valuesData)
          // ---
          toast({...toastSuccess, description: 'success delete'})
        })
        .catch((err: any) => {
          toast({...toastError, description: 'error delete'})
          console.error('BR: ' + err?.message)
        })
    }
  }
  // ---
  return {perform: performDelete, mutation: deleteMutation, isProgress: deleteMutation.isLoading}
}
