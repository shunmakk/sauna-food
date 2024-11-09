# サウナ飯のレビューアプリ

TypeScript やリレーショナルデータベースを用いてフルスタックに開発してみたかったから作りました。
あとは、自分がサウナとサウナ施設で飯を食べることが好きなのも理由です。

## 開発期間

2024/10~
<br>
現在も開発継続中。特にフロントエンドの部分の修正を行なっています。

## URL

※まだデプロイしてない

## 使用技術

### フロントエンド

- Next.js
- TypeScript
- Tailwind CSS

### バックエンド

- Node.js
- Express.js

### データベース,ORM

- PostgreSQL
- prisma

### その他

- 認証: Firebase Authentication
- 状態管理: React Context API
- 画像保存先:Cloud Storage for Firebase

## アプリの概要

1. **認証機能**
   - ユーザー新規登録
   - ログイン/ログアウト
2. **サウナ施設 page**
   一覧ページ
   　-新規で施設の追加(ログインユーザーのみ)
   　-検索機能
   　-ページネーション
   - 詳細ページ -施設の編集、削除(その施設を登録したユーザーのみ) -サウナ飯の追加 -その施設のサウナ飯一覧(クリックするとサウナ飯詳細ページに飛ぶ)
3. **サウナ飯 page**
   - 一覧ページ -検索機能 -ページネーション
   - 詳細ページ - レビュー追加
4. **プロフィール機能**
   - 個人情報、投稿したレビュー内容が確認できる

## データベース構造

## ER 図(by chatgpt)

![detailed_sauna_er_diagram](https://github.com/user-attachments/assets/efb47bed-fe17-4fbe-a0cf-cb1fd819e973)

## ディレクトリ

後々記載

```

```

## 工夫点

###
