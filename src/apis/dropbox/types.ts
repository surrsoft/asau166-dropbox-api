/**
 * *clientId (см. понятие [221115174400])
 * ID [[221115174629]]
 */
export type ClientIdType = string;

/**
 * *redirect-url, см. понятие [221115174402].
 * Пример: `http://localhost:22133/login-redirect`
 * ID [[221115174653]]
 */
export type RedirectUriType = string;

/**
 *
 * @param data
 */
export function isErrorPathNotFoundPredicate(data: any): boolean {
  if (!data) return false;
  return data.error?.path?.['.tag'] === 'not_found'
}
