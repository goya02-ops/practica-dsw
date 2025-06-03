import { Request, Response, NextFunction } from 'express';
//   res.json({data: character})
import { CharacterRepository } from './character.repository.js';

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



export { sanitizeCharacterInput, getAll, getOne };