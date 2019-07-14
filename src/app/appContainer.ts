'use strict';

import 'reflect-metadata';

import { Container } from 'inversify';
import TYPES from './types';

import { ILogger } from '../domain/interfaces/iLogger';
import Logger from '../logger/logger';

import OrderRepository from '../domain/repositories/orderRepository';
import OrderRepositoryImpl from '../repositories/orderRepositoryImpl';

import '../controllers/api/v1/orderController';

export default class AppContainer {
  public container: Container;
  constructor(container: Container) {
    this.container = container;
    this.container.bind<ILogger>(TYPES.Logger).to(Logger).inRequestScope();
    this.container.bind<OrderRepository>(TYPES.OrderRepository).to(OrderRepositoryImpl).inSingletonScope();
  }
}
