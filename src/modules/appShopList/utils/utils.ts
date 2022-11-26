import loIsArray from 'lodash/isArray';
import { SheetValuesType } from '../types/types';

export function mapData(values: any[]): SheetValuesType[] {
  if (loIsArray(values) && values.length > 0) {
    const ret: SheetValuesType[] = []
    values.map((el: any, ix: number) => {
      // ряд с заголовками игнорируем
      if (ix > 0) {
        ret.push({
          id: el[2],
          name: el[0],
          isChecked: !!el[1]
        })
      }
    })
    return ret;
  }
  return []
}

export function idGen(): string {
  return `${Date.now()}`
}

