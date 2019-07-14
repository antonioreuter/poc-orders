'use strict';

import Order from '../models/order'
import Repository from './repository';

export default interface OrderRepository extends Repository<Order, number> {
  
}