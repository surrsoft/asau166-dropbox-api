export const AIRTABLE_ACCESS_TOKEN_STORE_KEY = 'asau166_airtable_key'

/**
 * представление хранилища Airtable access token
 */
export class AirtableAccessTokenStoreCls {
  static tokenPut(value: string) {
    localStorage.setItem(AIRTABLE_ACCESS_TOKEN_STORE_KEY, value)
  }

  static tokenGet(): string {
    return localStorage.getItem(AIRTABLE_ACCESS_TOKEN_STORE_KEY) || ''
  }

  static tokenRemove(): void {
    localStorage.removeItem(AIRTABLE_ACCESS_TOKEN_STORE_KEY)
  }
}
