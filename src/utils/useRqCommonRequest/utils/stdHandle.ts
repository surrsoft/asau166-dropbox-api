import { UseQueryResult } from '@tanstack/react-query';

import { ErrType } from '../types/ErrType';
import { ReturnExtType } from '../types/ReturnType';
import { StdResultType } from '../types/StdResultType';

/** промежуточный обработчик ответа useQuery() */
export function stdHandle(queryResultRaw: UseQueryResult<ReturnExtType, ErrType>): StdResultType {
  const ret = {
    queryResultRaw,
    isProgress: false,
    isDone: false,
    isSuccess: false,
    isError: false,
    successId: null,
    errorId: null,
    data: null,
  } as StdResultType;
  const { isFetching, isFetched, data: info } = queryResultRaw;
  ret.isProgress = isFetching;
  ret.isDone = isFetched && !isFetching;
  if (ret.isDone) {
    if (info?.predicateSuccessMatchedId) {
      ret.isSuccess = true;
      ret.successId = info.predicateSuccessMatchedId || null;
      ret.data = info.data;
    } else {
      ret.isError = true;
      ret.errorId = info?.predicateErrorMatchedId || null;
    }
  }

  return ret;
}
