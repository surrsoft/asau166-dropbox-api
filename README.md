- приложение в Dropbox Console - `asau164`, [link](https://www.dropbox.com/developers/apps/info/7zprmzwuj93k5gg)
- содержимое `.env.local`
  ```
  PORT=<номер порта на котором будет работать текущее приложение, например 22133>
  REACT_APP_PORT=$PORT
  REACT_APP_DROPBOX_CLIENT_ID=<указать здесь *cliendId (см. понятие [221115174400])>
  # тут часть `login-redirect` is SYNC [221115183353]
  REACT_APP_REDIRECT_URI=http://localhost:$PORT/login-redirect
  ```

# Понятия
- *dropbox-auth-url, *д-линк [[221115175000]]
  - URL на который *клиент делает запрос, чтобы запустить процесс авторизации в Dropbox
- *auth-url, *authUrl, *аурл-строка, [[221115173800]]
  - URL который возвращает *сервер-авторизации, после того как пользователь дал согласие
  - имеет следующий формат `R/#H`, где 
    - `R` - это *redirect-url (например `http://localhost:22133`), 
    - `H` - это *к-строка
  - см. пример [221114212500]
- *auth-server, *авт-сервер, *сервер-авторизации, [[221115174404]] - сервер авторизации
- *client, *клиент, [[221115174403]] - это текущее приложение. Если более абстрактно, то это сущность которая ходит за ресурсами от имени пользователя
- *redirect-url, [[221115174402]] 
  - это URL (URI) который *клиент отправляет *серверу-авторизации, указывая его в query-параметре `redirect_uri` *д-линка 
  - программные сущности: [221115174653]
- *к-строка, *qstring, *queString, [[221114213500]]
  - это часть *аурл-строки
  - представляет собой "query-строку" с авторизационными данными (с *токеном-доступа и др.)
  - начинается с символа `#`
  - примеры 
    - 1 `#access_token=111&token_type=222` 
    - 2 
      ```
      #access_token=sl.BTLxISmDXJt2tOQE-vlPtgJE1ST9GZWfI_4YUTu-cINCGZz_6WR656KdrRXyNPhrCjmYQRGEKERCgcpIrP1Kk3dkk0z5a4J-YleTo2LF_IKj7kSRelC8Yk2HcvkUTjia-GXuhbs&token_type=bearer&expires_in=14400&scope=account_info.read&uid=7182663&account_id=dbid%3AAABjnmL2fEo_nz7ofGYhefI3a7IiLvZrhE4&state=auth_token%2Ffrom_oauth1%21k2m%2FicDpJsdVq1h4SvUhsJ5b
      ```
  - связанный программный код: 
    - [221114212902] - enum ключей
- *токен-доступа, *access-token, access token, [[221115174401]] - 
- *clientId, [[221115174400]] 
  - в Dropbox API это идентификатор приложения, называется там `App key`. В терминологии OAuth 2.0 это `client id`
  - программные сущности: [221115174629]
