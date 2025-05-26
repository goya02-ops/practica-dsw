import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { log } from 'node:console';

const PORT = 3000;
const HOST = 'localhost';
const STATIC_DIR = './static';
const LOG_FILE = './mycoolserver.log';

// Función para loguear requests
async function logRequest(method, url, statusCode, statusMessage) {
  const timestamp = new Date().toISOString();
  const logLine = `${timestamp} - ${method} ${url} - ${statusCode} ${statusMessage}\n`;

  fs.appendFile(LOG_FILE, logLine)
    .then(() => {
      return
    })
    .catch((err) => {
      console.log('Error al escribir en el log:', err.message);
      return
    });

  /*try {
    await fs.appendFile(LOG_FILE, logLine);
    //fs.appendFile(LOG_FILE, logLine);
  } catch (err) {
    console.log('No se pudo escribir en el log:', err.message);
  }*/
}

// Función para leer recursos
async function readResource(resourcePath) {
  
  const data = await fs.readFile(resourcePath, 'utf-8');
  return data;
}

// Crear el servidor
const server = http.createServer(async (req, res) => {
  const method = req.method;
  let url = req.url;

  console.log(`Request: ${method} ${url}`);

  // Verificar método permitido
  if (method !== 'GET') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
    //logRequest(method, url, 405, 'Method Not Allowed');
    logRequest(method, url, 405, 'Method Not Allowed');
    return;
  }

  // Rutas normales que redirigen a index.html
  if (
    url === '/' ||
    url === '/home' ||
    url === '/index' ||
    url === '/home.html'
  ) {
    url = 'index.html';
  }

  try {
    const content = await readResource(url);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
    logRequest(method, url, 200, 'OK');
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      await logRequest(method, url, 404, 'Not Found');
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error');
      await logRequest(method, url, 500, 'Internal Server Error');
    }
  }
});

// Iniciar servidor
server.listen(PORT, HOST, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});
