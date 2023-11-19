const [ INDEX_TYPE_FULL, INDEX_TYPE_CARD ] = [ 1, 2 ]

export default defineAppConfig({
  // ブログのタイトル
  blogTitle: 'Scrablog Sample',
  // ブログのヘッダーの文章 (省略可能)
  headerText: 'Scrablog の動作サンプルと使い方です。',
  // ブログのフッターの文章 (省略可能)
  footerText: 'Blog footer text sample',

  // 1ページあたり記事をいくつ表示するか
  indexPerPage: 3,
  // 記事をどのような形式で表示するか (INDEX_TYPE_FULL or INDEX_TYPE_CARD)
  indexType: INDEX_TYPE_FULL,
  // 記事のタイトルの下の作成日時と更新日時の時間部分 (12:34) を表示するか
  showTime: true,
  // 記事のタイトルの下に作成日時を表示するか
  showCreated: true,
  // 記事のタイトルの下に更新日時を表示するか
  showUpdated: true,

  // 文字色
  textColor: 'gray-900',
  // 薄い文字色 (引用, フッターの文章)
  lightTextColor: 'gray-500',
  // リンクの文字色
  linkTextColor: 'blue-500',
  // ブログ全体の背景色
  backgroundColor: 'gray-200',
  // 記事部分の背景色
  articleBackgroundColor: 'white',
  // 記事内の薄い背景色 (引用, コードブロック, テーブルのヘッダー)
  lightBackgroundColor: 'gray-100',
})
