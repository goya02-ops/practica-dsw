import express, { Request, Response, NextFunction } from 'express'
import { Character } from './character/characters.js'

const app = express()
app.use(express.json()) //middleware to parse JSON bodies
// Sample data

const characters = [
  new Character('Aragorn', 'Ranger', 10, 100, 50, 20, ['Sword', 'Shield'],'8219f65d-2e15-46ab-af2f-0809454b2603'),
  new Character('Gandalf', 'Wizard', 20, 80, 100, 15, ['Staff', 'Robe'], 'b2c1f5d3-4e8a-4c9b-8f0d-6c7e1f2a3b4c'),
]

function sanitizeCharacterInput(req: Request,res: Response, next: NextFunction){

  // an other middleware to sanitize the input
  req.body.sanitizeInput = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    attack: req.body.attack,
    items: req.body.items
  }
  // You can add more sanitization logic here if needed

  // Remove undefined properties from the method Patch
  Object.keys(req.body.sanitizeInput).forEach(key => {
    if (req.body.sanitizeInput[key] === undefined) delete req.body.sanitizeInput[key]
  })

  next()
}

//get all
app.get('/api/characters', (req, res) => {
  res.json({data: characters})
})

//get one
app.get('/api/characters/:id', (req, res) => {
  const character = characters.find(c => c.id === req.params.id)
  if (!character) {
    res.status(404).json({ error: 'Character not found' })
    return
  }
  res.json({data: character})
})

//register
app.post('/api/characters', sanitizeCharacterInput, (req, res) => {

  const input = req.body.sanitizeInput

  const newCharacter = new Character(
    input.name, 
    input.characterClass, 
    input.level, 
    input.hp, 
    input.mana, 
    input.attack, 
    input.items
  )

  characters.push(newCharacter)


  res.status(201).json({data: newCharacter})
})

//modifies partial data
app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {

  const characterIdx = characters.findIndex(c => c.id === req.params.id)

  if (characterIdx === -1) {
    res.status(404).json({ error: 'Character not found' })
    return
  }

  //characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizeInput }
  Object.assign(characters[characterIdx], req.body.sanitizeInput)
  // This will update only the properties that are present in req.body.sanitizeInput

  res.status(200).json({message: 'Character Updated' , data: characters[characterIdx]})
})

//modifies full data
app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {

  const characterIdx = characters.findIndex(c => c.id === req.params.id)

  if (characterIdx === -1) {
    res.status(404).json({ error: 'Character not found' })
    return
  }

  //characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizeInput }
  Object.assign(characters[characterIdx], req.body.sanitizeInput)

  res.status(200).json({message: 'Character Updated' , data: characters[characterIdx]})
})

app.delete('/api/characters/:id', (req, res) => {
  const characterIdx = characters.findIndex(c => c.id === req.params.id)
  if (characterIdx === -1) {
    res.status(404).send({ error: 'Character not found' })
    return
  }
  characters.splice(characterIdx, 1)
  res.status(200).send({message: 'Character Deleted'})
})

app.use((_, res) =>{
  res.status(404).json({ message: 'Resource not Found' })
  return
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})