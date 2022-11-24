import { RowDataType } from '../commonTypes/RowDataType';

/** @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#UpdateCellsRequest */
export interface UpdateCellsRequestType {
  rows: RowDataType[],
  fields: string,
  start?: any,
  range?: any
}
