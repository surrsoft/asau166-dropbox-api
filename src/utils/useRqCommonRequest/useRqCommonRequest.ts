import loIsString from 'lodash/isString';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';

import { HTTP_CODE_UNDEF } from './constants';
import { ErrCodeEnum } from './enums/ErrCodeEnum';
import { RequestMethodEnum } from './enums/RequestMethodEnum';
import { TestFlavorEnum } from './enums/TestFlavorEnum';
import { YesNoMayEnum } from './enums/YesNoMayEnum';
import { ErrType } from './types/ErrType';
import { ParamsType } from './types/ParamsType';
import { ReturnExtType, ReturnType } from './types/ReturnType';
import { StdResultType } from './types/StdResultType';
import { isBodyHttpMethod } from './utils/isBodyHttpMethod';
import { predicatesHandle } from './utils/predicatesHandle';
import { stdHandle } from './utils/stdHandle';
import { wait } from './utils/utils';

/**
 * Инкапсулирует react-query useQuery() запрос на указанный {@link url}.
 * Имеет дополнительные возможности, такие как прекращение запроса по таймауту, искуственная задержка запроса и др.
 * Возвращает в поле {@link StdResultType#queryResultRaw} стандартный результат {@link useQuery},
 * с особенностями в части полей `data` и `error`.
 *
 * Сами данные (результат запроса) будут располагаться в поле `X.data.data`,
 * где X - стандартный результат из поля {@link StdResultType#queryResultRaw}
 *
 * Если результат содержит `status: "success"` то поле `data` результата будет содержать
 * объект {@link ReturnExtType}, который помимо самих результатов запроса (поле `data`) будет
 * содержать дополнительную информацию о запросе - HTTP код ответа, URL запроса и др.
 *
 * Если результат содержит `status: "error"` то в поле `error` результата будет содержаться
 * сериализованный тип {@link ErrType}, содержащий помимо текста ошибки (поле `message`) дополнительную
 * информацию о запросе. Эту строку можно десериализовать чтобы извлечть нужные данные.
 *
 * ID [[221116112255]] rev.1.0.0 2022-10-24
 */
export function useRqCommonRequest(
  {
    url,
    queryKey,
    queryOptions = {},
    body,
    method = RequestMethodEnum.GET,
    predicatesSuccess = [],
    predicatesError = [],
    initialDataHttpCode = -1,
    pauseMsc = 0,
    timeoutMsc = 0,
    testFlavor = TestFlavorEnum.UNDEF,
    isAxiosMode = true,
    headers
  }: ParamsType,
): StdResultType {
  // --- queryOptionsNext
  let initialDataObj: any = {};
  if (queryOptions.initialData) {
    initialDataObj = {
      initialData: {
        data: queryOptions.initialData,
      },
    };
  }
  // SYNC [221024143236]
  const queryOptionsNext = {
    refetchOnWindowFocus: false,
    retry: 3,
    enabled: true,
    ...queryOptions,
    ...initialDataObj,
  };
  // ---
  const queryKeyNext = loIsString(queryKey) ? [queryKey] : queryKey;
  // --- urlNext
  let urlNext = '';
  // -- urlObj
  let urlObj: URL;
  try {
    urlObj = new URL(url);
  } catch (err: any) {
    throw JSON.stringify({
      message: err?.message,
      code: `${err?.code}`,
      name: `${err?.name}`,
      codeSpc: ErrCodeEnum.URL,
      url,
      method,
      httpCode: HTTP_CODE_UNDEF,
    } as ErrType);
  }
  // --
  urlNext = urlObj.href;
  // ---
  const result: UseQueryResult<ReturnExtType, ErrType> = useQuery(
    queryKeyNext,
    async () => {
      if (pauseMsc > 0) {
        await wait(pauseMsc);
      }
      // ---
      if (testFlavor === TestFlavorEnum.F3) {
        throw JSON.stringify({
          message: 'is forced error',
          code: '',
          name: '',
          codeSpc: ErrCodeEnum.FORCED,
          url,
          method,
          httpCode: HTTP_CODE_UNDEF,
        } as ErrType);
      }
      // --- signal; прерываем запрос если он длится дольше чем {@link timeoutMsc}
      let signal; // не нужен для axios, т.к. у него встроенный механизм
      if (!isAxiosMode) {
        const abort = new AbortController();
        setTimeout(() => {
          abort.abort();
        }, timeoutMsc);
        signal = timeoutMsc > 0 ? abort.signal : undefined;
      }
      // --- reqMethod
      let reqMethod = {};
      // для GET и HEAD явно указывать метод не нужно
      if (method !== RequestMethodEnum.GET && method !== RequestMethodEnum.HEAD) {
        reqMethod = {method};
      }
      // --- bodyNext
      const isBodyMethod = isBodyHttpMethod(method) !== YesNoMayEnum.NO;
      const bodyNext = body && isBodyMethod
        ?
        isAxiosMode ? {data: body} : {body}
        : {};
      // --- headersNext
      const headersNext = headers ? {headers} : {}
      // --- fetchResponse
      let fetchResponse: any = null;
      try {
        // <=== <=== <=== FETCH
        if (!isAxiosMode) {
          const fetchOptions = {signal, ...reqMethod, ...bodyNext, ...headersNext};
          fetchResponse = await fetch(urlNext, fetchOptions);
        } else {
          const axiosOptions = {
            url: urlNext,
            ...reqMethod,
            ...bodyNext,
            timeout: timeoutMsc,
            // чтобы не бросало исключение если HTTP-код меньше 200 или больше 299
            validateStatus: () => true,
            ...headersNext
          };
          fetchResponse = await axios.request(axiosOptions);
        }
      } catch (err: any) {
        throw JSON.stringify({
          message: err?.message,
          code: `${err?.code}`,
          name: `${err?.name}`,
          codeSpc:
            err?.name === 'AbortError'
              ? ErrCodeEnum.TIMEOUTE
              : ErrCodeEnum.FETCH,
          url: urlNext,
          method,
          httpCode: HTTP_CODE_UNDEF,
        } as ErrType);
      }
      const httpCode = fetchResponse?.status ?? HTTP_CODE_UNDEF;
      // ---
      let data = null;
      try {
        if (!isAxiosMode) {
          data = await fetchResponse.json();
        } else {
          data = fetchResponse?.data;
        }
      } catch (err: any) {
        // если данные в результате fetch не похожи на json
        throw JSON.stringify({
          message: err?.message,
          code: `${err?.code}`,
          name: `${err?.name}`,
          codeSpc: ErrCodeEnum.JSON,
          url: urlNext,
          method,
          httpCode,
        } as ErrType);
      }
      // --- предикаты
      const predicateHandlerResult = predicatesHandle(data, predicatesSuccess, predicatesError, httpCode);

      // --- результат
      return {
        data,
        httpCode: fetchResponse?.status ?? HTTP_CODE_UNDEF,
        httpCodeDesc: fetchResponse?.statusText ?? '',
        url: urlNext,
        method,
        isInitialData: false,
        ...predicateHandlerResult,
      } as ReturnType;
    },
    queryOptionsNext,
  );

  // ---
  if (queryOptions.initialData && !result.isFetched && result.data) {
    // --- предикаты
    const {
      predicateSuccessMatchedId,
      predicateErrorMatchedId,
      resultStatus,
    } = predicatesHandle(queryOptions.initialData, predicatesSuccess, predicatesError, initialDataHttpCode);
    // ---
    result.data.httpCode = initialDataHttpCode;
    result.data.httpCodeDesc = 'initial data';
    result.data.url = urlNext;
    result.data.method = method;
    result.data.predicateSuccessMatchedId = predicateSuccessMatchedId;
    result.data.predicateErrorMatchedId = predicateErrorMatchedId;
    result.data.resultStatus = resultStatus;
    result.data.isInitialData = true;
  }

  // ---
  return stdHandle(result);
}
