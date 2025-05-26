import fs from 'node:fs/promises'


fs.readFile('./data.csv', {encoding:'utf8'})
.then(
    (data) => {console.log(`Data1:\n${data}`)}
)
.catch(
    //(err)=> console.log(err)
    console.log
)
console.log(`Fin`)