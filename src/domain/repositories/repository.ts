'use strict';

export default interface Repository<D, K> {
  findById(id: K): Promise<D>;
  findAll(): Promise<Array<D>>;
  save(data: D): Promise<D>;
}