import http from 'node:http'
import fs from 'node:fs/promises'
//import fss from 'node:fs'


async function readResource(resourcePath) {
  // Read the file and parse it as JSON
//  const data =  fss.readFileSync(`.${resourcePath}`, 'utf-8')
  const data = await fs.readFile(`.${resourcePath}`, 'utf-8')
  return data
}

async function writeLog(message) {
  const timestamp = new Date().toISOString()
  const fullMessage = `[${timestamp}] ${message}\n`
  try{
    await fs.appendFile('mycoolserver.log', fullMessage)
  } catch (error) {
    console.error(`Error writing to log file: ${error.message}`)
  }
}

// Create a local server to receive data from
const server = http.createServer(async(req, res) => {

  if (req.url === '/' 
    || req.url === '/home' 
    || req.url === '/index' 
    || req.url === '/home.html') {
    req.url = '/index.html'
  }

  await writeLog(`Request: ${req.method} ${req.url}`)

  if (req.method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' })
    res.end('Method Not Allowed')
    await writeLog(`405 Method Not Allowed`)
    return
  }

  try{
    const htmlText = await readResource(req.url)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlText)
    await writeLog(`200 OK - ${req.url}`)
  } catch (error) {
    await writeLog(`Error: ${error.message}`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Resource not found')
  }

})

server.listen(3000,() => {writeLog('Server is running on http://localhost:3000')})