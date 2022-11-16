import { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { PredicateDescriptor } from './PredicateDescriptor';
import { RequestMethodEnum } from '../enums/RequestMethodEnum';
import { TestFlavorEnum } from '../enums/TestFlavorEnum';

/** входные параметры хука */
export interface ParamsType {
  /** URL, см. {@link isAxiosMode} */
  url: string;
  /** query key для запроса */
  queryKey: string | QueryKey;
  /** тело, для запросов которым оно требуется. Если truthy то будет передано в запрос */
  body?: any;
  /**
   * Если нужно переопределить useQuery-опции.
   * По умолчанию хук {@link useRqCommonRequst} использует
   * опции отличающиеся от дефолта React Query { refetchOnWindowFocus: false, retry: 3, enabled: true }
   * SYNC [[221024143236]]
   */
  queryOptions?: Partial<UseQueryOptions>;
  /** HTTP-метод. По умолчанию GET */
  method?: string | RequestMethodEnum;
  /** предикат-дескрипторы ожидаемых ответов вида "успех". Порядок элментов имеет значение - проверка идёт от начала
   * к концу */
  predicatesSuccess?: PredicateDescriptor[];
  /** предикат-дескриптоы ожидаемых ответов вида "ошибка" */
  predicatesError?: PredicateDescriptor[];
  /** используется если указана опция initialData, при сверке initialData с предикат-дексрипторами */
  initialDataHttpCode?: number;
  /**
   * TRUE по умолчанию.
   * Если TRUE то {@link url} должен быть вида используемого с {@link ajaxMsa},
   * например `/msa/api-gw/private/dbts/dbts-templates/v2/templates/1616534`; в этом случае используется библиотека
   * axios.
   * Если FALSE то {@link url} должен быть полным URL, например `https://jsonplaceholder.typicode.com/posts`;
   * в этом случае используется стандартный fetch
   * */
  isAxiosMode?: boolean;
  /** см. {@link TestFlavorEnum} */
  testFlavor?: TestFlavorEnum;
  /** искуственная задержка перед началом выполнения запроса в милисекундах */
  pauseMsc?: number;
  /** если запрос будет длится дольше этого времени (не считая задержку {@link pauseMsc}),
   * то он будет искуственно прерван с ошибкой */
  timeoutMsc?: number;
  /** заголовки */
  headers?: Record<string, string>
}
