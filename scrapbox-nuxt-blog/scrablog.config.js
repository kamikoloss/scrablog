import {
  indexTypes,
  headerNavTypes,
  sidebarPositions,
  sidebarTypes,
} from './scrablog.const'

const appConfig = {
  // GitHub のリポジトリ名
  repositoryName: 'blog',

  // ブログのタイトル
  blogTitle: 'Scrablog Sample',
  // ブログのヘッダーの文章 (空白にすると省略)
  headerText: 'Scrablog の動作サンプルと使い方です。',
  // ブログのフッターの文章 (空白にすると省略)
  footerText: 'Blog footer text sample',
  // ブログのヘッダーに検索フォームを表示するか
  showSearch: true,
  // ブログのフッターに "Generated by..." を表示するか
  showGeneratedBy: true,

  // 記事一覧から除外する記事のタイトルのリスト
  // headerNavContents と sidebarContents の ARTICLE は自動的にここに含まれる
  excludeTitles: ['kamikoloss'],
  // 記事一覧をどのような形式で表示するか
  indexType: indexTypes.BLOG_FULL,
  // 記事一覧の記事を1ページあたりいくつ表示するか
  articlesPerPage: 3,

  // 作成日時と更新日時のタイムゾーン
  timeZone: 'Asia/Tokyo',
  // 記事に作成日時を表示するか
  showCreated: true,
  // 記事に更新日時を表示するか
  showUpdated: true,
  // 記事に作成日時と更新日時の時間部分 (12:34) を表示するか
  showTime: true,
  // 特定の記事の下部に周辺記事 (1つ新しい/1つ古い) を表示するか
  showSurround: true,

  // ヘッダーナビゲーションを表示するか
  showHeaderNav: true,
  // ヘッダーナビゲーションの内容と表示順
  headerNavContents: [
    { type: headerNavTypes.ARTICLE, label: 'このブログについて', title: 'このブログについて' },
    { type: headerNavTypes.INTERNAL_LINK, label: '2023年の記事', to: '/years/2023' },
    { type: headerNavTypes.EXTERNAL_LINK, label: 'GitHub', to: 'https://github.com/kamikoloss' },
    { type: headerNavTypes.ALL_ARTICLES, label: '全記事一覧' },
    { type: headerNavTypes.ALL_IMAGES, label: '全画像一覧' },
    //{ type: headerNavTypes.ALL_TAGS, label: '全タグ一覧' },
  ],

  // サイドバーを表示するか
  showSidebar: true,
  // サイドバーの位置
  sidebarPosition: sidebarPositions.RIGHT,
  // サイドバーの内容と表示順
  sidebarContents: [
    { type: sidebarTypes.ARTICLE, label: 'プロフィール', title: 'profile' },
    //{ type: sidebarTypes.SEARCH, label: '検索' },
    { type: sidebarTypes.RECENT_ARTICLES, label: '最近の記事', max: 5 },
    { type: sidebarTypes.ALL_ARTICLES_YEAR, label: '年別'},
    { type: sidebarTypes.ALL_ARTICLES_MONTH, label: '月別'},
    { type: sidebarTypes.ALL_ARTICLES_YEAR_MONTH, label: '年月別'},
    //{ type: sidebarTypes.POPULAR_TAGS, label: 'タグ', max: 30},
  ],
}

const colorConfig = {
  // 全体の文字色
  'text-base': '#111827',
  // 薄い文字色 (引用, フッターの文章)
  'text-light': '#6b7280',
  // リンクの文字色
  'text-link': '#3b82f6',
  // 全体の背景色
  'bg-base': '#e5e7eb',
  // コンテンツ部分の背景色 (記事, ヘッダー)
  'bg-content': '#ffffff',
  // 記事内の薄い背景色 (引用, テーブルのヘッダー)
  'bg-light': '#f3f4f6',
}

export { appConfig, colorConfig }
