import { DROPBOX_URL_API, DropboxMethodEnum } from './constants';

// del+ mass

/**
 *
 * @param accessToken --
 * @param filePath -- например '/tmp1.txt'
 */
export async function entryMetadataGet(accessToken: string, filePath: string) {
  if (!accessToken) throw 'BR: wrong access token; [[221116102307]]'
  const options = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      path: filePath
    })
  }
  const res = await fetch(`${DROPBOX_URL_API}${DropboxMethodEnum.FILES__GET_METADATA}`, options)
  return await res.json()
}

