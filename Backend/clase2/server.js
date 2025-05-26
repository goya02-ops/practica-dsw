import http from 'node:http'
import fs from 'node:fs/promises'

async function readResource(resourcePath) {
  // Read the file and parse it as JSON
  const data =  await fs.readFile(`.${resourcePath}`, 'utf-8')
  return data
}


// Create a local server to receive data from
const server = http.createServer(async(req, res) => {
  console.log(`Request: ${req.method} ${req.url}`)
  try{
    const htmlText = await readResource(req.url)
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(htmlText)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Resource not found')
  }
})

server.listen(3000)