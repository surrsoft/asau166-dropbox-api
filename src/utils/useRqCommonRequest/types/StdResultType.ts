import { UseQueryResult } from '@tanstack/react-query';

import { ErrType } from './ErrType';
import { ReturnExtType } from './ReturnType';

/** тип возвращаемый {@link stdHandle} */
export interface StdResultType {
  /** результат "как есть" хука {@link useRqCommonRequest} */
  queryResultRaw: UseQueryResult<ReturnExtType, ErrType>,
  /** true если запрос выполняется сейчас */
  isProgress: boolean,
  /** true если запрос закончил выполнение (не выполняется сейчас) */
  isDone: boolean;
  /** true если запрос {@link isDone} === true, и его результат соответствует одному из предикатов успеха */
  isSuccess: boolean,
  /** true если запрос {@link isDone} === true, и его результата не соответствует ни одному из предикатов успеха */
  isError: boolean,
  /** если {@link isSuccess} is true, то тут будет идентификатор предиката успеха */
  successId: string | null,
  /** если {@link isError} is true, то тут будет либо идентификатор предиката ошибки, либо null */
  errorId: string | null,
  /** содержимое {@link queryResultRaw#data#data}, для удобства */
  data: any
}
