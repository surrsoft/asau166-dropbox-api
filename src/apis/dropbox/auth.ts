import { QueStringKeysEnum } from './constants';
import { accessTokenGet } from './accessTokenStore';
import { ClientIdType, RedirectUriType } from './types';

export function isAuthorized(): boolean {
  return !!accessTokenGet();
}

/**
 * Извлекает *access-token из {@param queString}
 * @param queString - *к-строка (см. понятие [221114213500])
 */
export function accessTokenFromUrlGet(queString: string): string | null {
  if (!queString) return null;
  const queStringNext = queString.slice(1);
  if (!queStringNext) return null;
  const usp = new URLSearchParams(queStringNext);
  const accessToken = usp.get(QueStringKeysEnum.ACCESS_TOKEN);
  if (!accessToken) return null;
  return accessToken;
}

/** формирует и возвращает *dropbox-auth-url (см. понятие [221115175000]) */
export function authUrlCook(clientId: ClientIdType, redirectUri: RedirectUriType) {
  const encodedUri = encodeURIComponent(redirectUri)
  return `https://www.dropbox.com/oauth2/authorize`
    + `?response_type=token`
    + `&client_id=${clientId}`
    + `&redirect_uri=${encodedUri}`
    + `&token_access_type=online`
}
