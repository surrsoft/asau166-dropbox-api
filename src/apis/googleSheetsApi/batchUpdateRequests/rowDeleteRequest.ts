import { SheetId } from '../types/types';
import { SHEET_PRODUCTS_INFO } from '../../../modules/appShopList/constants';
import { Schema$DeleteRangeRequest } from '../types/sheetsV4types/sheetsV4types';

/**
 * Удаление ряда индекса {@param rowIndex} листа {@param sheetId}
 */
export function rowDeleteRequest(sheetId: SheetId, rowIndex: number) {
  return {
    deleteRange: {
      range: {
        sheetId: SHEET_PRODUCTS_INFO.sheetId,
        startRowIndex: rowIndex,
        endRowIndex: rowIndex + 1
      },
      shiftDimension: 'ROWS'
    } as Schema$DeleteRangeRequest
  }
}
