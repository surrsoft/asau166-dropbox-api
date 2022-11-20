import { Box } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { tokenCreationRequest } from '../../../apis/airtable/airtableOAuthApi/tokenCreationRequest';

/**
 * @param urlSearch -- строка вида '#code=...'
 */
const codeFromHash = (urlSearch: string): { code: string | null, errMsg: string | null } => {
  if (urlSearch && urlSearch.length > 2) {
    const code = new URLSearchParams(urlSearch).get('code')
    return {code, errMsg: null}
  }
  return {code: null, errMsg: `BR: wrong urlSearch; err-[[221119193244]]; urlSearch [${urlSearch}]`}
}

export function RedirectAirtablePage() {
  const location = useLocation()
  const hashString = location.search
  const {code, errMsg} = codeFromHash(hashString)

  useEffect(() => {
    if (code) {
      tokenCreationRequest(code)
    } else {
      throw new Error(errMsg || '')
    }
  }, []);

  return <Box>
    RedirectAirtablePage
  </Box>
}
