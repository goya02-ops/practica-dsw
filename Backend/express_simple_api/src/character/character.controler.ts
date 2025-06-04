import { Request, Response, NextFunction } from 'express';
import { CharacterRepository } from './character.repository.js';
import { Character } from './charactersEntity.js';

const repository = new CharacterRepository();

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

function getAll(req:Request, res:Response){
  res.json({data: repository.getAll()})
  //res.json({data: characters})
}

function getOne(req:Request, res:Response){
  const character = repository.getOne({id: req.params.id})
  //const character = characters.find(c => c.id === req.params.id)
  if (!character) {
    res.status(404).json({ error: 'Character not found' })
    return
  }
  res.json({data: character})
}

function create(req: Request, res: Response){

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
}

function update(req: Request, res: Response){

  req.body.sanitizeInput.id = req.params.id // Ensure the ID is set for the update
  const character = repository.update(req.body.sanitizeInput)

  if (!character) {
    res.status(404).json({ error: 'Character not found' })
    return
  }

  res.status(200).json({message: 'Character Updated' , data: character})
}

function remove(req: Request, res: Response){
  const character = repository.delete({id: req.params.id})
  //const characterIdx = characters.findIndex(c => c.id === req.params.id)
  if (!character) {
    res.status(404).send({ error: 'Character not found' })
    return
  }
  res.status(200).send({message: 'Character Deleted'})
}

export const controler = {
  sanitizeCharacterInput,
  getAll,
  getOne,
  create,
  update,
  remove
}

