import loIsNumber from 'lodash/isNumber';
import loIsString from 'lodash/isString';

/** идентификатор *книги */
export type SpreadsheetId = string;

/** идентификатор *листа */
export type SheetId = number;

/** массив значений */
export type ListValueType = any[]

/** */
export interface ErrorType {
  error: {
    code: number,
    message: string,
    status: string
  }
}

/** */
export function isErrorType(data: any): data is ErrorType {
  if (!data) return false;
  if (!data.error) return false;
  return loIsNumber(data.error.code) && loIsString(data.error.message) && loIsString(data.error.status)
}

/** */
export interface GetValuesParamsType {
  accessToken: string,
  spreadsheetId: string,
  /** например 'temp1' */
  sheetName: string,
  /** например: 'A1:B10' */
  diap: string
}

