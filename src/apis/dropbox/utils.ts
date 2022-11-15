import { DEFAULT_API_DOMAIN, DEFAULT_DOMAIN, TEST_DOMAIN_MAPPINGS } from './constants';

/*
взято отсюда https://github.com/dropbox/dropbox-sdk-js/blob/main/src/utils.js, не полностью
 */

function getSafeUnicode(c: any) {
  const unicode = `000${c.charCodeAt(0).toString(16)}`.slice(-4);
  return `\\u${unicode}`;
}

export const baseApiUrl = (subdomain: any, domain = DEFAULT_API_DOMAIN, domainDelimiter = '.') => {
  if (!domainDelimiter) {
    return `https://${domain}/2/`;
  }
  // @ts-ignore
  if (domain !== DEFAULT_API_DOMAIN && TEST_DOMAIN_MAPPINGS[subdomain] !== undefined) {
    // @ts-ignore
    subdomain = TEST_DOMAIN_MAPPINGS[subdomain];
    domainDelimiter = '-';
  }
  return `https://${subdomain}${domainDelimiter}${domain}/2/`;
};

export const OAuth2AuthorizationUrl = (domain = DEFAULT_DOMAIN) => {
  if (domain !== DEFAULT_DOMAIN) {
    domain = `meta-${domain}`;
  }
  return `https://${domain}/oauth2/authorize`;
};

export const OAuth2TokenUrl = (domain = DEFAULT_API_DOMAIN, domainDelimiter = '.') => {
  let subdomain = 'api';
  if (domain !== DEFAULT_API_DOMAIN) {
    // @ts-ignore
    subdomain = TEST_DOMAIN_MAPPINGS[subdomain];
    domainDelimiter = '-';
  }
  return `https://${subdomain}${domainDelimiter}${domain}/oauth2/token`;
};

// source https://www.dropboxforum.com/t5/API-support/HTTP-header-quot-Dropbox-API-Arg-quot-could-not-decode-input-as/m-p/173823/highlight/true#M6786
export function httpHeaderSafeJson(args: any) {
  return JSON.stringify(args).replace(/[\u007f-\uffff]/g, getSafeUnicode);
}

export function getTokenExpiresAtDate(expiresIn: number) {
  return new Date(Date.now() + (expiresIn * 1000));
}

export function isBrowserEnv() {
  return typeof window !== 'undefined';
}

export function createBrowserSafeString(toBeConverted: any) {
  const convertedString = toBeConverted.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
  return convertedString;
}
