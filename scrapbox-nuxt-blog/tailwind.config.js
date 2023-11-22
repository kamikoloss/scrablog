/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
    colors: {
      // 全体の文字色
      'base-text': '#111827',
      // 薄い文字色 (引用, フッターの文章)
      'light-text': '#6b7280',
      // リンクの文字色
      'link-text': '#3b82f6',
      // 全体の背景色
      'base-bg': '#e5e7eb',
      // コンテンツ部分 (記事, ヘッダー) の背景色
      'content-bg': '#ffffff',
      // 記事内の薄い部分 (引用, コードブロック, テーブルのヘッダー) の背景色
      'light-bg': '#f3f4f6',
    },
  },
  plugins: [],
}
