import { DimensionEnum } from '../enums/DimensionEnum';

/**
 * Диапазон для одной области на листе. Все индексы являются zero-based. Индексы являются полуоткрытыми:
 * начальный индекс является инклюзивным, а конечный - эксклюзивным. Отсутствующие индексы указывают на то,
 * что диапазон не ограничен с этой стороны.
 * @see https://developers.google.com/sheets/api/reference/rest/v4/DimensionRange
 */
export interface DimensionRangeType {
  /** индекс *листа на котором находится область */
  sheetId: number,
  /** определяет о рядах или столбцах идёт речь */
  dimension: DimensionEnum,
  /** стартовый индекс (включительно) */
  startIndex: number,
  /** конечный индекс (исключительно) */
  endIndex: number
}
