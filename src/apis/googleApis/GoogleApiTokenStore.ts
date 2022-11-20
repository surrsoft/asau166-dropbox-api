export const TOKEN_KEY = 'asau166_google_api_token_key'

/**
 * представление хранилища Google API access token
 */
export class GoogleApiTokenStore {
  static tokenPut(value: string) {
    localStorage.setItem(TOKEN_KEY, value)
  }

  static tokenGet(): string {
    return localStorage.getItem(TOKEN_KEY) || ''
  }

  static tokenRemove(): void {
    localStorage.removeItem(TOKEN_KEY)
  }
}
