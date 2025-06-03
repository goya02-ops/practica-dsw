import express, { Request, Response, NextFunction } from 'express'
import { Character } from './character/charactersEntity.js'
import { CharacterRepository } from './character/character.repository.js'
import { characterRouter } from './character/character.routes.js'

const app = express()
app.use(express.json()) //middleware to parse JSON bodies
// Sample data

const repository = new CharacterRepository()

app.use('/api/characters', characterRouter)

/*
//get one
app.get('/api/characters/:id', (req, res) => {
  const character = repository.getOne({id: req.params.id})
  //const character = characters.find(c => c.id === req.params.id)
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

  const character = repository.create(newCharacter)

  res.status(201).json({data: character})
})

//modifies partial data
app.patch('/api/characters/:id', sanitizeCharacterInput, (req, res) => {

  req.body.sanitizeInput.id = req.params.id // Ensure the ID is set for the update
  const character = repository.update(req.body.sanitizeInput)

  if (!character) {
    res.status(404).json({ error: 'Character not found' })
    return
  }

  //characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizeInput }
  //Object.assign(characters[characterIdx], req.body.sanitizeInput)
  // This will update only the properties that are present in req.body.sanitizeInput

  res.status(200).json({message: 'Character Updated' , data: character})
})

//modifies full data
app.put('/api/characters/:id', sanitizeCharacterInput, (req, res) => {
  req.body.sanitizeInput.id = req.params.id // Ensure the ID is set for the update
  const character = repository.update(req.body.sanitizeInput)

  if (!character) {
    res.status(404).json({ error: 'Character not found' })
    return
  }

  //characters[characterIdx] = { ...characters[characterIdx], ...req.body.sanitizeInput }

  res.status(200).json({message: 'Character Updated' , data: character})
})

app.delete('/api/characters/:id', (req, res) => {
  const character = repository.delete({id: req.params.id})
  //const characterIdx = characters.findIndex(c => c.id === req.params.id)
  if (!character) {
    res.status(404).send({ error: 'Character not found' })
    return
  }
  res.status(200).send({message: 'Character Deleted'})
})*/

app.use((_, res) =>{
  res.status(404).json({ message: 'Resource not Found' })
  return
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})