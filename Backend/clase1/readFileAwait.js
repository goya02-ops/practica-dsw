import fs from 'node:fs/promises'


const data= await fs.readFile('./data.csv', {encoding:'utf8'})
console.log(`Data:\n${data}`)
