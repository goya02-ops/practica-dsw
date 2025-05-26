import fs from 'node:fs'


const data=fs.readFileSync('./data.csv', {encoding:'utf8'})
console.log(data)