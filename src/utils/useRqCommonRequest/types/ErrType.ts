import { ErrCodeEnum } from '../enums/ErrCodeEnum';
import { RequestMethodEnum } from '../enums/RequestMethodEnum';

/** тип для поля X.error, где X - стандартный результат {@link useQuery} */
export interface ErrType {
  /** err.message */
  message: string;
  /** err.code, см. также https://developer.mozilla.org/en-US/docs/Web/API/DOMException */
  code: string;
  /** err.name, см. также https://developer.mozilla.org/en-US/docs/Web/API/DOMException */
  name: string;
  /** специальный код */
  codeSpc: ErrCodeEnum;
  /** URL для которого произошла ошибка */
  url: string;
  /** HTTP-метод использовавшийся при запросе */
  method: string | RequestMethodEnum;
  /** HTTP-код. -1 если код определить нет возможности */
  httpCode: number;
}
