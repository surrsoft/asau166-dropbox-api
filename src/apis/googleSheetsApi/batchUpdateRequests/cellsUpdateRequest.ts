import { SheetId } from '../types/types';
import {
  Schema$CellData,
  Schema$ExtendedValue,
  Schema$UpdateCellsRequest
} from '../types/sheetsV4types/sheetsV4types';
import loIsString from 'lodash/isString';
import loIsNumber from 'lodash/isNumber';

export interface ParamsType {
  sheetId: SheetId,
  values: any[],
  rowIndex: number,
  columnIndex: number
}

/**
 *
 */
export function cellsUpdateRequest({sheetId, values, columnIndex, rowIndex}: ParamsType) {
  // --- valuesNext
  const valuesNext: Schema$CellData[] = values.map(el => {
    let obj: Schema$ExtendedValue
    if (loIsNumber(el)) {
      obj = {numberValue: el}
    } else if (loIsString(el)) {
      obj = {stringValue: el}
    } else {
      obj = {stringValue: JSON.stringify(el)}
    }
    return {userEnteredValue: obj};
  })

  // ---
  return {
    updateCells: {
      // записываемые данные
      rows: [{values: valuesNext}],
      fields: '*',
      start: {
        sheetId,
        rowIndex,
        columnIndex
      }
    } as Schema$UpdateCellsRequest
  }
}
