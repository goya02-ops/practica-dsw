import { Router } from 'express';
import { controler } from './character.controler.js';

export const characterRouter = Router();

characterRouter.get('/', controler.getAll);
characterRouter.get('/:id', controler.getOne);
characterRouter.post('/',controler.sanitizeCharacterInput,controler.create);
characterRouter.put('/:id',controler.sanitizeCharacterInput,controler.update);
characterRouter.patch('/:id',controler.sanitizeCharacterInput,controler.update);
characterRouter.delete('/:id',controler.remove);