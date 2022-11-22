import { InsertDimensionType } from './InsertDimensionType';

/**
 * type Request
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#Request
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 */
export type UpdateRequestBodyType = InsertDimensionType | Record<string, any>
