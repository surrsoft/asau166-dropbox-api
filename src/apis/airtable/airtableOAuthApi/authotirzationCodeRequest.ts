import { createSearchParams } from 'react-router-dom';
import { code_verifier, redirect_uri } from './configs';

const URL = 'https://airtable.com/oauth2/v1/authorize'
const client_id = process.env.REACT_APP_AIRTABLE_CLIENT_ID || '';
/** случайная строка, длиной 16-1024 символов */
const state = '25a3af3e-ca5c-430d-b584-e82f54fb7322';
const scope = 'data.records:read data.records:write schema.bases:read schema.bases:write';
/**
 * эту сущность рекомендуется получать путём преобразования {@link code_verifier} (делать хэш sha256 и затем base64),
 * но можно и просто использовать напрямую {@link code_verifier} (что менее безопасно),
 * см. https://www.oauth.com/oauth2-servers/pkce/authorization-request/ */
export const code_challenge = code_verifier

/**
 * Выполнение обращения в результате которого Airtable сделает редирект из которого можно извлечь авторизационный-код
 */
export function authotirzationCodeRequest(): void {
  const urlQueryPart = createSearchParams({
    client_id,
    redirect_uri,
    response_type: 'code',
    state,
    code_challenge,
    code_challenge_method: 'S256',
    scope
  }).toString()
  // ---
  const url = `${URL}?${urlQueryPart}`;
  // ---
  window.location.href = url;
}

