/*
-- TElemModel - тип *модели
-- TRetModel - тип модели со стороны *использующего
 */

export enum CreateResultCodeEnum {
  SOME = 'some',
  DATA_IS_NO_VALID = 'data_is_no_valid'
}

/** идентификатор *е-сущности */
export type AoswElemId = string

/** представление *е-сущности */
export interface AoswElem<TElemModel> {
  id: AoswElemId
  /** модель *элемента. Можеть быть полезной */
  model: TElemModel
}

export interface AoswPart<TElemModel> {
  /** коллекция *е-сущностей */
  elems: AoswElem<TElemModel>[]
  /** здесь должно быть TRUE если в *источнике есть ещё *элементы, которые можно получить с очерденой *партией.
   * Иначе здесь должно быть FALSE */
  hasMore: boolean
}

/**
 * {@link uispu использующий} запрашивает {@link upartu партию} с помощью {@link elemsNext} и затем для каждого
 * элемента *партии вызывает {@link jsxByElem}, чтобы получить JSX элемента для отрисовки
 */
export interface AoswMain<TElemModel, TRetModel> {
  /**
   * Должен вернуть очередную {@link upartu партию} по её индексу {@link partIndex}.
   * Если {@link partSizeMax} is number то количество элементов в *партии должно быть меньше-или-равно этому значению.
   * Если {@link partSizeMax} is null то количество элементов в партии - на усмотрение {@link urealu реализующего}.
   * @param partIndex нумерация с нуля
   * @param partSizeMax
   */
  elemsNext(partIndex: number, partSizeMax: number | null): Promise<AoswPart<TElemModel>>

  /** {@link urealu реализующий} должен вернуть JSX для элемента {@param elem} */
  jsxByElem(elem: AoswElem<TElemModel>): JSX.Element

  /**
   * {@link urealu реализующий} должен создать новый *элемент поместив его в конец списка *источника.
   * Если создание прошло успешно, то этот метод должен вернуть объект созданного *элемента, иначе - код проблемы.
   * @param data данные на базе которых должен быть создан элемент
   */
  elemCreateNew(data: TRetModel): Promise<AoswElem<TElemModel> | CreateResultCodeEnum>

}
