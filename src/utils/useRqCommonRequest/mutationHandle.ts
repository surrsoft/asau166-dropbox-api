import { PredicateDescriptor } from './types/PredicateDescriptor';
import { predicatesHandle } from './utils/predicatesHandle';
import { ResultSuccessEnum } from './enums/ResultSuccessEnum';

export enum AsyncModeEnum {
  /** default. Если queryFunction это axios-вызов */
  AXIOS = 'axios'
}

export interface MutationHandleReturnType {
  /** HTTP-код ответа */
  httpCode: number;
  /** */
  errMessage?: string;
  /** id предиката успеха */
  predicateSuccessMatchedId: string | null;
  /** id предиката ошибки */
  predicateErrorMatchedId: string | null;
  /** */
  resultStatus: ResultSuccessEnum;
  /**
   * Здесь должно быть TRUE если isSuccess === true или isError === true.
   * Как интерпретировать - если здесь TRUE то значит только что выполнялся реальный интернет-запрос,
   * иначе это данные из кэша
   */
  isDone: boolean
  /** здесь должно быть TRUE если было совпадение с одним из {@link predicateSuccessMatchedId} предикатов */
  isSuccess: boolean
}

export interface ParamsType {
  /** то что возвращает хук useMutation() */
  mutationResult: any,
  /**
   * определяет то как подходить к обработке результата, например откуда брать HTTP-код результата и т.п.
   */
  asyncMode?: AsyncModeEnum,
  /** предикат-дескрипторы ожидаемых ответов вида "успех". Порядок элментов имеет значение - проверка идёт от начала
   * к концу */
  predicatesSuccess?: PredicateDescriptor[];
  /** предикат-дескрипторы ожидаемых ответов вида "ошибка" */
  predicatesError?: PredicateDescriptor[];
}


/**
 * Обрабатывает результат {@param mutationResult}, чтобы на выходе получить слудующую информацию:
 * - HTTP-код результата
 * - текст ошибки
 * - какому предикату успеха соответствует {@param mutationResult}
 * - какому предикату ошибки соответствует {@param mutationResult}
 *
 * Как интерпретировать: если {@link MutationHandleReturnType#isDone} === TRUE то проверяем что
 * в {@link MutationHandleReturnType#isSuccess} - если TRUE то значит ответ успешный, иначе ответ с ошибкой; в любом
 * случае после успеха или ошибки, следует сделать reset() мутации
 *
 * ID [[221122231801]] rev 1 1.0.0 2022-11-22
 *
 * @param asyncMode
 * @param mutationResult результат хука useMutation()
 * @param predicatesSuccess
 * @param predicatesError
 */
export function mutationHandle(
  {
    asyncMode = AsyncModeEnum.AXIOS,
    mutationResult,
    predicatesSuccess = [],
    predicatesError = []
  }: ParamsType
): MutationHandleReturnType {
  // --- ret initial
  let ret = {
    httpCode: -2,
    predicateSuccessMatchedId: null,
    predicateErrorMatchedId: null,
    resultStatus: ResultSuccessEnum.ERROR_UNEXPECTED,
    isDone: false,
    isSuccess: false
  } as MutationHandleReturnType;
  // ---
  if (mutationResult.isError) {
    ret.httpCode = mutationResult.error?.response?.status ?? -1
    ret.errMessage = JSON.stringify({
      message: mutationResult.error?.message,
      code: mutationResult.error?.code,
      name: mutationResult.error?.name,
    })
    ret.isDone = true;
  }
  if (mutationResult.isSuccess) {
    ret.httpCode = mutationResult.data?.status ?? -1
    ret.resultStatus = ResultSuccessEnum.SUCCESS
    ret.isDone = true;
  }
  // ---
  console.log('!!-!!-!!  mutationResult {221123214442}\n', mutationResult); // del+
  const {predicateSuccessMatchedId, predicateErrorMatchedId, resultStatus} = predicatesHandle(
    mutationResult.isSuccess ? mutationResult.data : mutationResult.error?.response?.data,
    predicatesSuccess,
    predicatesError,
    ret.httpCode
  );
  ret.predicateSuccessMatchedId = predicateSuccessMatchedId
  ret.predicateErrorMatchedId = predicateErrorMatchedId
  ret.resultStatus = resultStatus
  if (resultStatus === ResultSuccessEnum.SUCCESS) {
    ret.isSuccess = true
  }
  // ---
  return ret;
}
