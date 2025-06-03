export interface Repository<T> {
  getAll(): T[]|undefined
  getOne(item: {id: string}): T | undefined
  create(item: T): T
  update(item: T): T | undefined
  delete(item: {id: string}): T | undefined
}