## プロジェクトの概要
プロテインのECサイト。
商品の在庫に制限なし。


## 使用方法、インストール方法、実行方法
- パッケージインストール
```
npm init
# or
yarn
```

- インストールするライブラリ
```
"@emotion/react": "^11.10.5",
"@emotion/styled": "^11.10.5",
"@hookform/error-message": "^2.0.1",
"@material-ui/core": "^4.12.4",
"@mui/icons-material": "^5.11.0",
"@mui/material": "^5.11.5",
"@reduxjs/toolkit": "^1.9.1",
"@stripe/stripe-js": "^1.45.0",
"@supabase/supabase-js": "^2.2.2",
"@types/node": "18.11.9",
"@types/react": "18.0.25",
"@types/react-dom": "18.0.9",
"dotenv": "^16.0.3",
"eslint": "8.28.0",
"eslint-config-next": "13.0.4",
"next": "^13.0.6",
"pg": "^8.8.0",
"randomstring": "^1.2.3",
"react": "18.2.0",
"react-anchor-link-smooth-scroll": "^1.0.12",
"react-dom": "18.2.0",
"react-native": "^0.71.0",
"react-redux": "^8.0.5",
"react-simple-chatbot": "^0.6.1",
"redux": "^4.2.0",
"redux-persist": "^6.0.0",
"sharp": "^0.31.2",
"stripe": "^11.1.0",
"styled-components": "^5.3.6",
"swr": "^1.3.0",
"typescript": "4.9.3"
```

- サーバー起動
```
npm run dev
# or
yarn dev
```

```
# and
yarn mock-api
```

- テストログイン
```
メールアドレス:test@example.com
パスワード:rakutein
```

## ダミー決済の入力情報について
- カード番号
> 4242 4242 4242 4242
- 有効期限
> 未来日付ならいつでも良い
- セキュリティコード
> 3桁何でもよい
