import { PredicateIdType } from './PredicateIdType';
import { PredicateType } from './PredicateType';

/** предикат-декскриптор */
export interface PredicateDescriptor {
  /**  */
  id: PredicateIdType;
  /** -1 означает что при сверке результата с предикатом HTTP-код сверять не нужно */
  httpCode: number;
  /**  */
  predicate: PredicateType;
}
