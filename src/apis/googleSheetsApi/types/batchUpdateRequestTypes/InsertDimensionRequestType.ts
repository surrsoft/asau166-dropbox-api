import { DimensionRangeType } from '../DimensionRangeType';

/**
 * @see https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/request#InsertDimensionRequest
 */
export interface InsertDimensionRequestType {
  /** Размеры для вставки. Индексы начала и конца должны быть определены. */
  range: DimensionRangeType,
  /**
   * Должны ли свойства области распространяться на области до или после новых вставленных областей. True для
   * наследования от областей до (в этом случае начальный индекс должен быть больше 0), и false для наследования
   * от областей после.
   *
   * Например, если индекс ряда 0 имеет красный фон, а индекс ряда 1 - зеленый, то вставка 2 рядов по индексу 1 может
   * наследовать либо зеленый, либо красный фон. Если значение inheritFromBefore равно true, то два новых ряда будут
   * красными (потому что ряд до точки вставки был красным), а если значение inheritFromBefore равно false, то два
   * новых ряда будут зелеными (потому что ряд после точки вставки был зеленым).
   */
  inheritFromBefore: boolean;
}
