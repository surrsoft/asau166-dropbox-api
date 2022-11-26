import { ResponseTypeEnum } from '../../../apis/googleSheetsApi/useSheetValuesGet';

export interface ParamsType {
  enabled?: boolean
  errorId?: ResponseTypeEnum | string | null
}

export function useValuesGetErrorHandle({enabled = false, errorId}: ParamsType) {
  console.log('!!-!!-!!  errorId {221126153926}\n', errorId); // del+
  return !!(
    enabled
    && (errorId === ResponseTypeEnum.ERROR_UNAUTHENTICATED || errorId === ResponseTypeEnum.PERMISSION_DENIED)
  );
}
