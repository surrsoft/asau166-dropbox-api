/** @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/cells#CellData */
export interface CellDataType {
  userEnteredValue?: any // TODO
  effectiveValue?: any // TODO
  formattedValue?: string
  effectiveFormat?: any // TODO
  hyperlink: string,
  note: string,
  // TODO ...
}
