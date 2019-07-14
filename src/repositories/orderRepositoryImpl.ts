'use strict';

import Order from '../domain/models/order';
import OrderRepository from '../domain/repositories/orderRepository';
import { injectable, inject } from 'inversify';
import { prisma } from '../../generated/prisma-client';

import { ILogger } from '../domain/interfaces/iLogger';
import { TYPES } from '../config/types';


@injectable()
export default class OrderRepositoryImpl implements OrderRepository {

  private logger: ILogger;

  constructor(@inject(TYPES.Logger) logger: ILogger) {
    this.logger = logger;
  }

  async findById(id: number): Promise<Order> {    
    const order = await prisma.order({ id });
    return new Order(order);
  }

  async findAll(): Promise<Array<Order>> {
    const orders = await prisma.orders();
    return orders.map(order => new Order(order));
  }

  async save(order: Order): Promise<Order> {
    this.logger.debug(`[OrderRepository] Save: ${JSON.stringify(order)}`);
    
    const newOrder = await prisma.createOrder(order);
    return new Order(newOrder);
  }
}