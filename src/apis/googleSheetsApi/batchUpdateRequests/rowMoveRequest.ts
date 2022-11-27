import { Schema$MoveDimensionRequest } from '../types/sheetsV4types/sheetsV4types';
import { SheetId } from '../types/types';

/**
 * перемещение ряда с индекса {@param rowFromIndex} на индекс {@param rowToIndex} листа {@param sheetId}
 */
export function rowMoveRequest(sheetId: SheetId, rowFromIndex: number, rowToIndex: number) {
  return {
    moveDimension: {
      source: {
        sheetId,
        dimension: 'ROWS',
        startIndex: rowFromIndex,
        endIndex: rowFromIndex + 1
      },
      destinationIndex: rowToIndex
    } as Schema$MoveDimensionRequest
  }
}
