import axios from 'axios'
import fs from 'fs'

// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname
// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname%2F:pagetitle
// https://scrapbox.io/scrapboxlab/api%2Fcode%2F:projectname%2F:pagetitle%2F:filename
let api = null
let projectName = ''
let connectSid = ''

// Scrapbox の API インスタンスを作成する
// 事前に環境変数を設定する必要がある
// TODO: Public プロジェクト用に SID の設定を任意にする
const createApiInstance = (connectSid) => {
  return axios.create({
    baseURL: `https://scrapbox.io/api`,
    timeout: 10000, // 10s
    headers: { 'Cookie': `connect.sid=${connectSid};` },
  })
}

// Scrapbox のページの一覧情報を取得する
const getScrapboxPageList = async () => {
  return await api
    .get(`/pages/${projectName}`, { params: { limit: 1000 } })
    .then(response => response.data?.pages)
}

// Scrapbox のページごとに内容を取得する
const getScrapboxPages = async (pageList) => {
  return await Promise
    .all(pageList
      .filter(isDownloadTargetPage)
      .map(page => api.get(`/pages/${projectName}/${encodeURIComponent(page.title)}`))
    )
    .then(responses => {
      return responses.map(response => {
        let { id, title, lines, image, created, updated } = response.data
        lines = lines.map(line => line.text)
        return { id, title, lines, image, created, updated }
      })
    })
}

const isDownloadTargetPage = (page) => {
  if (page.title.startsWith('_')) {
    return false
  } else if (page.title === 'config') {
    return false
  } else {
    return true
  }
}

// Scrapbox のページごとに JSON ファイルを作成する
const makePageJsonFiles = (pages) => {
  pages.forEach(page => {
    const fileName = `./content/${page.id}.json`
    fs.writeFileSync(fileName, JSON.stringify(page))
  })
}

// config ページ内のコードを取得してファイルを作成する
const makeAppConfigFile = async () => {
  const fileName = './content/scrablog.config.js'
  const codeText = await api
    .get(`/code/${projectName}/config/scrablog.config.js`)
    .then(response => response.data)
  fs.writeFileSync(fileName, codeText)
}

// メイン処理
const main = async () => {
  api = createApiInstance(connectSid)
  console.log('Getting page list...')
  const pageList = await getScrapboxPageList()
  console.log('Getting pages...')
  const pages = await getScrapboxPages(pageList)
  console.log('Making files...')
  makePageJsonFiles(pages)
  await makeAppConfigFile()
  console.log('Complete!')
}

// 実行
// node index.js <ScrapboxProjectName> <ScrapboxConnectSid>
try {
  projectName = process.argv[2]
  connectSid = process.argv[3]
  await main()
} catch (error) {
  console.error(error)
}
