import loIsString from 'lodash/isString'

export function isSuccessPredicate(data: any): boolean {
  return loIsString(data)
}
