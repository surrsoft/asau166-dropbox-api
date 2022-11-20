import { code_verifier, redirect_uri } from './configs';

const URL = 'https://airtable.com/oauth2/v1/token'

/**
 *
 * @param authCode -- авторизационный код
 *
 * @see https://airtable.com/developers/web/api/oauth-reference#token-creation-request
 */
export async function tokenCreationRequest(authCode: string) {
  if (authCode) {
    const body = {
      code: authCode,
      redirect_uri: encodeURIComponent(redirect_uri),
      grant_type: 'authorization_code',
      code_verifier,
      code_challenge_method: 'S256'
    }
    const result = await fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(body)
    })
    console.log('!!-!!-!! 1953 result {221119201633}\n', result); // del+
    const data = await result.json()
    console.log('!!-!!-!! 1953- data {221119195205}\n', data); // del+
  }
}
