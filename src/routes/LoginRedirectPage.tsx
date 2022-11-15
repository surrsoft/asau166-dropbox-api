import { redirect, useLocation, useNavigate } from 'react-router-dom';
import { accessTokenFromUrlGet} from '../apis/dropbox/auth';
import { useEffect } from 'react';
import { accessTokenSet } from '../apis/dropbox/accessTokenStore';

export function LoginRedirectPage() {
  const location = useLocation()
  const navigate = useNavigate();
  console.log('!!-!!-!!  location {221115120738}\n', location); // del+
  const hashString = location.hash
  console.log('!!-!!-!!  hashString {221115140407}\n', hashString); // del+
  const accessToken = accessTokenFromUrlGet(hashString)
  console.log('!!-!!-!!  accessToken {221115140403}\n', accessToken); // del+
  if (accessToken) {
    accessTokenSet(accessToken)
  }

  return <div>
    <h1>LoginRedirect</h1>
    <div>access token: {accessToken}</div>
    {
      accessToken ? <div>токен получен и помещён в хранилище</div> : <div>токен не получен</div>
    }
  </div>
}
