/** константы представляющие возможные результы запроса для случая когда запрос
 * вернул результат (результат useQuery() имеет status: 'success') */
export enum ResultSuccessEnum {
  /**
   * запрос вернул результат который является ожидаемым результатом вида "упех".
   * Например "список продуктов", "информацию о пользователе" и т.п.
   */
  SUCCESS = 'success_expected',

  /** запрос вернул ожидаемый результат вида "ошибка", то есть вернул ошибку
   * присутствующую в списке ожидаемых возможных ошибок.
   * Например бэкенд информирует что не нашёл сущность по указанному ID и т.п. */
  ERROR_EXPECTED = 'error_expected',

  /** если запрос вернул результат который нельзя отнести ни к {@link SUCCESS}
   * ни к {@link ERROR_EXPECTED} */
  ERROR_UNEXPECTED = 'error_unexpected'
}
