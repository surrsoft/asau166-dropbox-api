/**
 * см. {@link uoveupackindexu}
 */
export type OveuPackIndexType = number;

/**
 * см. {@link uoveupacksizeu}
 */
export type OveuPackSizeType = number;

/**
 * Идентификатор элемента. Должен быть строкой большей нуля, не содержащей пробелов/переносов.
 */
export type OveuElemIdType = string;

/**
 * Индекс элемента.
 * Число 0+
 */
export type OveuElemIndexType = number;

export interface OveuElem<TModel> {
  id: OveuElemIdType;
  model: TModel
}

export interface OveuPackRetType<TModel> {
  elems: OveuElem<TModel>[]
  hasMore: boolean
}

export enum OveuAddPlaceEnum {
  /**
   * Добавить в начало
   */
  START = 'start',
  /**
   * Добавить в конец
   */
  END = 'end',
  /**
   * Добавить по индексу
   */
  BY_INDEX = 'by_index'
}

export interface OveuElemAddRetType {
  id: OveuElemIdType
}

/**
 * Сначала должен быть вызван {@link init} для начальной настройки.
 */
export interface OveuTableInterface<TModel> {
  /**
   *
   * @param packSizeMax размер пакета (*п-размер {@link uoveupacksizeu})
   */
  init(packSizeMax: OveuPackSizeType): void;

  /**
   * Должен вернуть {@link uoveupacku *пакет} по индексу ({@link uoveupackindexu}).
   * При проблеме должен вернуть null.
   * @param packIndex
   */
  packGet(packIndex: OveuPackIndexType): Promise<OveuPackRetType<TModel> | null>

  elemAdd(elem: any, index: OveuElemIndexType): Promise<OveuElemAddRetType | null>

}
