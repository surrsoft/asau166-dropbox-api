import { ResultSuccessEnum } from '../enums/ResultSuccessEnum';

/**  */
export interface PredicateHandleRestultType {
  predicateSuccessMatchedId: string | null;
  predicateErrorMatchedId: string | null;
  resultStatus: ResultSuccessEnum;
}
