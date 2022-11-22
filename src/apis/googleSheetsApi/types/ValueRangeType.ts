import { ListValueType } from './types';
import { DimensionEnum } from '../enums/DimensionEnum';

/**
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values#resource-valuerange
 */
export interface ValueRangeType {
  /**
   * например "'имя листа'!A1:B10"
   */
  range: string,
  majorDimension: DimensionEnum,
  values: ListValueType[]
}

export function isValueRangeType(data: any): data is ValueRangeType {
  if (!data) return false;
  return !!data.range && !!data.majorDimension && !!data.values
}
