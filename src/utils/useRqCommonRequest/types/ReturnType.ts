import { PredicateIdType } from './PredicateIdType';
import { RequestMethodEnum } from '../enums/RequestMethodEnum';
import { ResultSuccessEnum } from '../enums/ResultSuccessEnum';

/** один из типов для поля X.data, где X - стандартный результат {@link useQuery} */
export interface ReturnType {
  /** сами данные получуенные от fetch */
  data: any;
  /**
   * HTTP-код.
   * Будет код -1 при ошибке когда реальный код считать не удаётся.
   * Код 0 может быть если у fetch указана опция `cors: "no-code"`.
   */
  httpCode: number;
  /** текстовое описание {@link httpCode} */
  httpCodeDesc: string;
  /** фактический url использовавшийся во время запроса */
  url: string;
  /** HTTP-метод использовавшийся при запросе */
  method: string | RequestMethodEnum;
  /**
   * id предикат-дескриптора ожидаемого ответа типа "успех" для которого найдено
   * соответствие с результатом запроса.
   * Будет null если соответствия найдено не было. Предикат-дексрипторы проверяются на
   * соответствия до первого найденного, слева направо из параметра {@link predicatesSuccess}
   */
  predicateSuccessMatchedId: PredicateIdType | null;
  /**
   * id предикат-дескриптора ожидаемого ответа типа "ошибка" для которого найдено соответствие
   * с результатом запроса.
   * Будет null если соответствия найдено не было. Предикат-дексрипторы проверяются на
   * соответствия до первого найденного, слева направо из параметра {@link predicatesError}
   */
  predicateErrorMatchedId: PredicateIdType | null;
  /** одна из констант обозначающих результат запроса см. {@link ResultSuccessEnum} */
  resultStatus: ResultSuccessEnum;
  /** TRUE если полученный ответ, это ответ с initialData */
  isInitialData: boolean;
}

/** тип для поля X.data, где X - стандартный результат {@link useQuery} */
export type ReturnExtType = ReturnType | null;
