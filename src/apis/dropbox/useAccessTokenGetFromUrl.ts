import { useLocation } from 'react-router-dom';
import { accessTokenFromUrlGet } from './auth';
import { accessTokenSet } from './accessTokenStore';

/**
 * Извлекает access token из тегкущего location. Если извлечь токен удалось, записывает его в хранилище.
 * Возвращает TRUE если извлечь токен удалось удалось, иначе FALSE
 */
export function useAccessTokenGetFromUrl(): boolean {
  const location = useLocation()
  const hashString = location.hash
  const accessToken = accessTokenFromUrlGet(hashString)
  if (accessToken) {
    accessTokenSet(accessToken)
    return true;
  }
  return false;
}
