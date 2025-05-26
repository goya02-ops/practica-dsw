import fs from 'node:fs'


const data=fs.readFile('./data.csv', {encoding:'utf8'},
    (err, data) => {
        if(err){
            console.log(`Error: ${err}`)
        }
        console.log(`Data:\n${data}`)
    }

)
console.log(`Data2:\n${data}`)