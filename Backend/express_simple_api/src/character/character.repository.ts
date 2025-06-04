import { Repository } from '../shared/repository.js';
import { Character } from './charactersEntity.js';

const characters: Character[] = [
  new Character('Aragorn', 'Ranger', 10, 100, 50, 20, ['Sword', 'Shield'],'8219f65d-2e15-46ab-af2f-0809454b2603'),
]
export class CharacterRepository implements Repository<Character> {

  public getAll(): Character[] | undefined {
    return characters;
  }

  public getOne(item: { id: string }): Character | undefined {
    return characters.find(character => character.id === item.id);
  }

  public create(item: Character): Character {
    characters.push(item);
    return item;
  }

  public update(item: Character): Character | undefined {
    const index = characters.findIndex(character => character.id === item.id);
    if (index !== -1) {
      characters[index] = {...characters[index], ...item};
    }
    return characters[index];
  }

  public delete(item: { id: string }): Character | undefined {
    const index = characters.findIndex(character => character.id === item.id);
    if (index !== -1) {
      const deletedCharacter = characters[index];
      characters.splice(index, 1);
      return deletedCharacter
    };
  }
}