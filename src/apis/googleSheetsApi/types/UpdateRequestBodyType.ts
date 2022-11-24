import { InsertDimensionType } from './batchUpdateTopTypes/InsertDimensionType';
import { UpdateCellsType } from './batchUpdateTopTypes/UpdateCellsType';

/**
 * type Request
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#Request
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 */
export type UpdateRequestBodyType =
  InsertDimensionType
  | UpdateCellsType
  | Record<string, any>
