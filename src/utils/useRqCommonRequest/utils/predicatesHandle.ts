import { PredicateDescriptor } from '../types/PredicateDescriptor';
import { PredicateHandleRestultType } from '../types/PredicateHandleRestultType';
import { ResultSuccessEnum } from '../enums/ResultSuccessEnum';

/**
 * ID [[221122233158]] rev 1 1.0.0 2022-11-22
 */
export function predicatesHandle(
  data: any,
  predicatesSuccess: PredicateDescriptor[],
  predicatesError: PredicateDescriptor[],
  httpCode: number,
): PredicateHandleRestultType {
  const predicateSuccessMatchedId =
    predicatesSuccess.find((predicateObj) => {
      return (
        predicateObj.predicate(data) &&
        (predicateObj.httpCode === -1 || predicateObj.httpCode === httpCode)
      );
    })?.id || null;
  // --
  let predicateErrorMatchedId = null;
  if (!predicateSuccessMatchedId) {
    predicateErrorMatchedId =
      predicatesError.find((predicateObj) => {
        return (
          predicateObj.predicate(data) &&
          (predicateObj.httpCode === -1 || predicateObj.httpCode === httpCode)
        );
      })?.id || null;
  }
  // --- resultStatus
  let resultStatus: ResultSuccessEnum;
  if (predicateSuccessMatchedId) {
    resultStatus = ResultSuccessEnum.SUCCESS;
  } else {
    resultStatus = predicateErrorMatchedId
      ? ResultSuccessEnum.ERROR_EXPECTED
      : ResultSuccessEnum.ERROR_UNEXPECTED;
  }

  // ---
  return {predicateSuccessMatchedId, predicateErrorMatchedId, resultStatus};
}
