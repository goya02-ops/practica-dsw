export interface Repository<T> {
  getAll(): T[]|undefined
  getById(item: {id: string}): T | undefined
  create(item: T): T
  update(item: T): T | undefined
  delete(item: {id: string}): T | undefined
}