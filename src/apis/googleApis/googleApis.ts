import keys from './keys.json' // TODO секреты нужно скрыть

const scope = 'https://www.googleapis.com/auth/spreadsheets';
// случайная строка
const state = '4a2bd1c6-a672-4b26-8b1c-70ef8460a279'
const responseType = {
  // сначала приходит authorization code
  code: 'code',
  // сразу приходит access token
  token: 'token'
}

/**
 * Формирует URL на получение access token.
 * Заствляет браузер перейти на этот URL.
 *
 * @see https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
 */
export function gotoAuth() {
  const redirectUriIndex = process.env.NODE_ENV === 'development' ? 0 : 1;
  const url = `https://accounts.google.com/o/oauth2/v2/auth
    ?client_id=${keys.web.client_id}
    &response_type=${responseType.token}
    &state=${state}
    &scope=${scope}
    &redirect_uri=${encodeURIComponent(keys.web.redirect_uris[redirectUriIndex])}
    &prompt=consent
    &include_granted_scopes=true
  `;
  const urlNext = url.replace(/\r\n|\s+/g, '');
  // ---
  window.location.href = urlNext;
}
