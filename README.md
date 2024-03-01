# Scrablog

![Scrablog Icon](docs/scrablog_logo.png)

Scrablog は [Scrapbox](https://scrapbox.io/product) をブログ形式で GitHub Pages に公開するツールです。

- scrapbox-downloader
    - Scrapbox のページを一括ダウンロードする
    - JavaScript
- scrapbox-nuxt-blog
    - 静的ウェブサイトを生成する
    - Nuxt + Nuxt Content

## サンプル

- https://gloxi.net/scrablog/
    - https://scrapbox.io/scrablog/ をブログ化したもの
- https://gloxi.net/blog/
    - 制作者が実際に使っている様子

## URL

| ページの種類 | URL | URL 例 |
|:---|:---|:---|
| 記事一覧 (トップ) | `/` | - |
| 特定の記事 | `/[id]` | `/659e26d0525a20002549cac2` |
| 記事一覧 (過去) | `/history/[number]` | `/history/2` |
| 記事一覧 (リンク) | `/links/[link]` | `/links/Scrapbox` |
| 記事一覧 (年) | `/year/[year]` | `/year/2024` |
| 記事一覧 (月) | `/month/[month]` | `/month/2024-03` |
| 全記事一覧 | `/articles` | - |
| 全タグ一覧 | `/tags` | - |
| 全画像一覧 | `/images` | - |

## 使い方

### ブログを公開する

Scrapbox

- ブログとして公開する Scrapbox プロジェクト を作成する
- Scrapbox に `config` ページを作成して https://scrapbox.io/scrablog/config の内容をコピペする
    - 自分のブログに合わせて内容を変更する
- Scrapbox の Cookie の `connect.sid` を控えておく

GitHub

- このリポジトリを fork または clone + push する
- GitHub Actionsを有効にする
- Repository Secrets に以下を設定する
	- `SCRAPBOX_CONNECT_SID`
        - 先ほどの手順で控えておいた `connect.sid` の値
        - 一定期間 (通常3ヵ月ほど) ごとに更新する必要がある
	- `SCRAPBOX_PROJECT_NAME`
        - Scrapbox のプロジェクト名
        - `https://scrapbox.io/scrablog/` の `scrablog` の部分
- ブログを更新することでブログが公開される

### ブログを更新する

- GitHub Actions の `Deploy Nuxt site to Pages` workflow を手動で実行する
