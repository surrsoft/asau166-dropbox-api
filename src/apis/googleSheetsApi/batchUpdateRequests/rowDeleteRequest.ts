import { SheetId } from '../types/types';
import { SHEET_PRODUCTS_INFO } from '../../../modules/appShopList/constants';

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
    }
  }
}
