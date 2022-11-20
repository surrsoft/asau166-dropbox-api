import loIsNumber from 'lodash/isNumber';
import loIsString from 'lodash/isString';

export interface ErrorType {
  error: {
    code: number,
    message: string,
    status: string
  }
}

export function isErrorType(data: any): data is ErrorType {
  if (!data) return false;
  if (!data.error) return false;
  return loIsNumber(data.error.code) && loIsString(data.error.message) && loIsString(data.error.status)
}

export interface GetValuesParamsType {
  accessToken: string,
  spreadsheetId: string,
  /** например 'temp1' */
  sheetName: string,
  /** например: 'A1:B10' */
  diap: string
}

/**
 * @see https://developers.google.com/sheets/api/reference/rest/v4/Dimension
 */
export enum DimensionEnum {
  DIMENSION_UNSPECIFIED = 'DIMENSION_UNSPECIFIED',
  ROWS = 'ROWS',
  COLUMNS = 'COLUMNS'
}

/** массив значений */
export type ListValueType = any[]
