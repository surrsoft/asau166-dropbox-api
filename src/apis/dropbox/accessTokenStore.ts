export enum LSKeysEnum {
  /** SYNC [[221118183453]] */
  ACCESS_TOKEN = 'asau166_accessToken'
}

export function accessTokenGet(): string | null {
  return localStorage.getItem(LSKeysEnum.ACCESS_TOKEN) || null;
}

export function accessTokenSet(accessToken: string): void {
  localStorage.setItem(LSKeysEnum.ACCESS_TOKEN, accessToken);
}

export function accessTokenRemove(): void {
  localStorage.removeItem(LSKeysEnum.ACCESS_TOKEN)
}
