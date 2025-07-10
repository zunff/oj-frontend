# oj-frontend

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

npx openapi-typescript-codegen -i /Users/zunf/Downloads/default_OpenAPI.json --output ./generated --client axios

export const OpenAPI: OpenAPIConfig = {
// BASE: 'http://47.107.29.192:80',
BASE: 'http://localhost:8000',
VERSION: '1.0',
WITH_CREDENTIALS: true,
CREDENTIALS: 'include',
TOKEN: undefined,
USERNAME: undefined,
PASSWORD: undefined,
HEADERS: undefined,
ENCODE_PATH: undefined,
};

6.29:
查询用户次数逻辑独立封装接口
