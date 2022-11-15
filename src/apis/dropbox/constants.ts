/*
изначально взято отсюда https://github.com/dropbox/dropbox-sdk-js/blob/main/src/constants.js
 */

export const RPC = 'rpc';
export const UPLOAD = 'upload';
export const DOWNLOAD = 'download';

export const APP_AUTH = 'app';
export const USER_AUTH = 'user';
export const TEAM_AUTH = 'team';
export const NO_AUTH = 'noauth';
export const COOKIE = 'cookie';

export const DEFAULT_API_DOMAIN = 'dropboxapi.com';
export const DEFAULT_DOMAIN = 'dropbox.com';

export const TEST_DOMAIN_MAPPINGS = {
  api: 'api',
  notify: 'bolt',
  content: 'api-content',
};

/** [[221114212902]] ключи *к-строки */
export enum QueStringKeysEnum {
  ACCESS_TOKEN = "access_token",
  STATE = "state",
  ACCOUNT_ID = "account_id",
  UID = "uid",
  EXPIRES_IN = "expires_in",
  TOKEN_TYPE = "token_type"
}
