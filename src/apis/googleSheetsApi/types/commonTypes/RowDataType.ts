import { CellDataType } from './CellDataType';

/** @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/sheets#RowData */
export interface RowDataType {
    values: CellDataType[]
}
