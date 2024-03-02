import { appConfig } from '~/scrablog.config'
import { headerNavTypes, sidebarTypes } from '~/scrablog.const'

// Unix Time を日時の文字列に変換する
export const getDateString = (unixTime: number, showTime: boolean): string => {
  const date = new Date(unixTime * 1000)
  // 2023-12-31 23:59:59
  const dateString = date.toLocaleString('sv-SE', { timeZone: appConfig.timeZone })

  if (showTime) {
    // 年月日 + 時間
    return dateString.slice(0, 16)
  } else {
    // 年月日のみ
    return dateString.slice(0, 10)
  }
}

// 記事を年別と月別に振り分ける
export const getArticlesGroupByYearMonth = (articles: any[]) => {
  const articlesByYear: { [key: string]: any } = {}
  const articlesByMonth: { [key: string]: any } = {}

  articles.forEach(article => {
    const dateString = getDateString(article.created, false) // '2023-01-23'

    const year = dateString.slice(0, 4) // '2023'
    if (!articlesByYear[year]) {
      articlesByYear[year] = [] 
    }
    articlesByYear[year].push(article)

    const month = dateString.slice(0, 7) // '2023-01'
    if (!articlesByMonth[month]) {
      articlesByMonth[month] = [] 
    }
    articlesByMonth[month].push(article)
  })

  return { year: articlesByYear, month: articlesByMonth }
}

// リンク (記事のタイトル) をエスケープする
export const escapeArticleTitle = (title: string): string => {
  return title.replace(/ /g, '_').replace(/\//g, '%2F')
}

// リンク (記事のタイトル) をアンエスケープする
export const unescapeArticleTitle = (title: string): string => {
  return title.replace(/_/g, ' ').replace(/%2F/g, '/')
}

// queryContent の where not を配列に対応させたもの
export const whereNotIn = (query: any, key: string, valueList: string[]) => {
  for (const notElement of valueList) {
    query = query.where({ [key]: { $not: notElement } })
  }
  return query
}

// queryContent の where not を配列に対応させたもの (記事の title 専用)
export const whereNotInTitle = (query: any) => {
  const headerNavTitles = appConfig.headerNavContents
    .filter(c => c.type === headerNavTypes.ARTICLE)
    .map(c => c.title || '')
  const sidebarTitles = appConfig.sidebarContents
    .filter(c => c.type === sidebarTypes.ARTICLE)
    .map(c => c.title || '')
  
  const valueList = [
    ...appConfig.excludeTitles,
    ...headerNavTitles,
    ...sidebarTitles,
  ]
  return whereNotIn(query, 'title', valueList)
}
