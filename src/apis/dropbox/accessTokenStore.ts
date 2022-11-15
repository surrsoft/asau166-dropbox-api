export enum LSKeysEnum {
  ACCESS_TOKEN = 'asau166_accessToken'
}

export function accessTokenGet(): string | null {
  return localStorage.getItem(LSKeysEnum.ACCESS_TOKEN) || null;
}

export function accessTokenSet(accessToken: string): void {
  localStorage.setItem(LSKeysEnum.ACCESS_TOKEN, accessToken);
}
