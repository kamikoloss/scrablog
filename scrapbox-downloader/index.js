import axios from 'axios'
import fs from 'fs'

// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname
// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname%2F:pagetitle
let api = null

// Scrapbox の API インスタンスを作成する
// 事前に環境変数を設定する必要がある
const createApiInstance = (projectName, connectSid) => {
  return axios.create({
    baseURL: `https://scrapbox.io/api/pages/${projectName}`,
    timeout: 10000, // 10s
    headers: { 'Cookie': `connect.sid=${connectSid};` },
  })
}

// Scrapbox のページの一覧情報を取得する
const getScrapboxPageList = async () => {
  return await api
    .get('', { params: { limit: 1000 } })
    .then(response => response.data?.pages)
}

// Scrapbox のページごとに内容を取得する
const getScrapboxPages = async (pageList) => {
  return await Promise
    .all(pageList
      .filter(page => !page.title.startsWith('_'))
      .map(page => api.get(`/${encodeURIComponent(page.title)}`))
    )
    .then(responses => {
      return responses.map(response => {
        let { title, lines, created, updated } = response.data
        lines = lines.map(line => line.text) 
        return { title, lines, created, updated }
      })
    })
}

// Scrapbox のページごとに JSON ファイルを作成する
// '/' だけパーセントエンコーディングする
const makePageJsonFiles = (pages) => {
  pages.forEach(page => {
    const fileName = `./content/${page.title.replace('/', '%2F')}.json`
    fs.writeFileSync(fileName, JSON.stringify(page))
  })
}

// 引数を取得する
const projectName = process.argv[2]
const connectSid = process.argv[3]

// メイン処理
// node index.js <ScrapboxProjectName> [ScrapboxConnectSid]
try {
  api = createApiInstance(projectName, connectSid)
  const pageList = await getScrapboxPageList()
  console.log(`Succeed to get page list (${pageList.length})`)
  const pages = await getScrapboxPages(pageList)
  console.log(`Succeed to get pages`)
  makePageJsonFiles(pages)
  console.log(`Complete!`)
} catch (error) {
  console.error(error)
}
