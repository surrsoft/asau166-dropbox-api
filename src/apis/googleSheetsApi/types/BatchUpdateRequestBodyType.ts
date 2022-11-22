import { UpdateRequestBodyType } from './UpdateRequestBodyType';

/**
 * @see https://www.notion.so/surr/Overview-google-sheets-api-327eeb9c0c2b4549b339aa809378d6a8
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/batchUpdate
 */
export interface BatchUpdateRequestBodyType {
  requests: UpdateRequestBodyType[],
  includeSpreadsheetInResponse?: boolean,
  /**
   * Ограничивает диапазоны, включаемые в ответную книгу. Имеет смысл, только если includeSpreadsheetInResponse
   * имеет значение 'true'
   */
  responseRanges?: string[],
  /** Истина, если должны быть возвращены данные сетки. Имеет смысл, только если includeSpreadsheetInResponse
   * имеет значение 'true'. Этот параметр игнорируется, если в запросе была задана маска поля. */
  responseIncludeGridData?: boolean
}
