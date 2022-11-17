import { useLocation } from 'react-router-dom';
import { accessTokenFromUrlGet} from '../apis/dropbox/auth';
import { accessTokenSet } from '../apis/dropbox/accessTokenStore';

export function LoginRedirectPage() {
  const location = useLocation()
  const hashString = location.hash
  const accessToken = accessTokenFromUrlGet(hashString)
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
