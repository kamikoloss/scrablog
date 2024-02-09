// 記事のタイトルをエスケープする
export const escapeArticleTitle = (title: string): string => {
  return title.replace(/ /g, '_').replace(/\//g, '%2F')
}

// 記事のタイトルをアンエスケープする
export const unescapeArticleTitle = (title: string): string => {
  return title.replace(/_/g, ' ').replace(/%2F/g, '/')
}