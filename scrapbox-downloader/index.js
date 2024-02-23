import axios from 'axios'
import fs from 'fs'

// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname
// https://scrapbox.io/scrapboxlab/api%2Fpages%2F:projectname%2F:pagetitle
// https://scrapbox.io/scrapboxlab/api%2Fcode%2F:projectname%2F:pagetitle%2F:filename
let api = null
let projectName = ''
let connectSid = ''

// API インスタンスを作成する
const createApiInstance = (connectSid) => {
  return axios.create({
    baseURL: `https://scrapbox.io/api`,
    timeout: 10000, // 10s
    headers: { 'Cookie': `connect.sid=${connectSid};` },
  })
}

// ページの一覧を取得する
const getPageList = async () => {
  return await api
    .get(`/pages/${projectName}`, { params: { limit: 1000 } })
    .then(response => response.data?.pages)
}

// ページの内容を一括取得する
const getPages = async (pageList) => {
  return await Promise
    .all(pageList
      .filter(isTargetPage)
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

const isTargetPage = (page) => {
  if (page.title.startsWith('_')) {
    return false
  } else if (page.title === 'config') {
    return false
  } else {
    return true
  }
}

// ページの JSON ファイルを一括作成する
const makePageFiles = (pages) => {
  pages.forEach(page => {
    const fileName = `./content/${page.id}.json`
    fs.writeFileSync(fileName, JSON.stringify(page))
  })
}

// config ページ内のコードを取得してファイルを作成する
const makeConfigFile = async () => {
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
  const pageList = await getPageList()

  console.log('Getting pages...')
  const pages = await getPages(pageList)

  console.log('Making files...')
  makePageFiles(pages)
  await makeConfigFile()

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
