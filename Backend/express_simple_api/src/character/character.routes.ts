import { Router } from 'express';
import { sanitizeCharacterInput,getAll,getOne } from './character.controler.js';

export const characterRouter = Router();

characterRouter.get('/', getAll);
characterRouter.get('/:id', getAll);