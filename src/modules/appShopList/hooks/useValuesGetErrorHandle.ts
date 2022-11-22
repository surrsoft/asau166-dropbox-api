import { ResponseTypeEnum } from '../../../apis/googleSheetsApi/useSheetValuesGet';
import { gotoAuth } from '../../../apis/googleApis/googleApis';

export interface ParamsType {
  enabled?: boolean
  errorId?: ResponseTypeEnum | string | null
}

export function useValuesGetErrorHandle({enabled = false, errorId}: ParamsType) {
  // перебрасываем на роут авторизации если ошибка авторизации
  if (enabled && errorId === ResponseTypeEnum.ERROR_UNAUTHENTICATED) {
    gotoAuth()
  }
}
