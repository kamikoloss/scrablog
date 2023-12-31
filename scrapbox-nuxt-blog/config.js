const constants = {
  INDEX_TYPE_FULL: 1,
  INDEX_TYPE_CARD: 2,
}

const appConfig = {
  // ブログのタイトル
  blogTitle: 'Scrablog Sample',
  // ブログのヘッダーの文章 (省略可能)
  headerText: 'Scrablog の動作サンプルと使い方です。',
  // ブログのフッターの文章 (省略可能)
  footerText: 'Blog footer text sample',
  // 1ページあたり記事をいくつ表示するか
  indexPerPage: 3,
  // 記事をどのような形式で表示するか
  // INDEX_TYPE_FULL or INDEX_TYPE_CARD
  indexType: constants.INDEX_TYPE_CARD,
  // 記事のタイトルの下の作成日時と更新日時の時間部分 (12:34) を表示するか
  showTime: true,
  // 記事のタイトルの下に作成日時を表示するか
  showCreated: true,
  // 記事のタイトルの下に更新日時を表示するか
  showUpdated: true,
}

const colorConfig = {
  // 全体の文字色
  'text-base': '#111827',
  // 薄い文字色
  // (引用, フッターの文章)
  'text-light': '#6b7280',
  // リンクの文字色
  'text-link': '#3b82f6',
  // 全体の背景色
  'bg-base': '#e5e7eb',
  // コンテンツ部分の背景色
  // (記事, ヘッダー)
  'bg-content': '#ffffff',
  // 記事内の薄い部分の背景色
  // (引用, コードブロック, テーブルのヘッダー)
  'bg-light': '#f3f4f6',
}

export { constants, appConfig, colorConfig }
