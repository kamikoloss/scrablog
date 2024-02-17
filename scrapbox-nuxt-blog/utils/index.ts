import { appConfig } from '~/scrablog.config'

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

// 記事のタイトルをエスケープする
export const escapeArticleTitle = (title: string): string => {
  return title.replace(/ /g, '_').replace(/\//g, '%2F')
}

// 記事のタイトルをアンエスケープする
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

// queryContent の where not を配列に対応させたもの (title 専用)
export const whereNotInTitle = (query: any) => {
  const systemValueList = ['profile']
  const valueList = [...appConfig.excludeTitles, ...systemValueList]
  return whereNotIn(query, 'title', valueList)
}
