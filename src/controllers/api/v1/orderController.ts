'use strict';

import express from 'express';
import { response, request, requestParam, controller, httpGet, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';

import { ILogger } from '../../../domain/interfaces/iLogger';
import { TYPES } from '../../../config/types';
import OrderRepository from '../../../domain/repositories/orderRepository';
import Order from '../../../domain/models/order';

@controller('/api/v1/orders')
export default class OrderController {
  private _logger: ILogger;
  private _orderRepository: OrderRepository;

  constructor(@inject(TYPES.Logger) logger: ILogger, 
              @inject(TYPES.OrderRepository) orderRepository: OrderRepository) {
    this._logger = logger;
    this._orderRepository = orderRepository;
  }

  @httpGet('/')
  public async get(@request() req: express.Request, @response() resp: express.Response) {
    try {
      this._logger.debug('Listing all orders...');
      return this._orderRepository.findAll();
    } catch (err) {
      this._logger.error('Error to get the orders.', err);
      resp.status(500).json([]);
    }
  }

  @httpGet('/:orderId')
  public async getById(
    @requestParam('orderId') orderId: number, 
    @request() req: express.Request, 
    @response() resp: express.Response) {

    try {
      this._logger.debug(`Finding order by id: ${orderId}`);
      return this._orderRepository.findById(orderId);
    } catch (err) {
      this._logger.error(`Error to get the order by id: ${orderId}`, err);
      resp.status(500).json([]);
    }
  }

  @httpPost('/')
  public async save(@request() req: express.Request,
    @response() resp: express.Response) {
      try {
        const order = new Order(req.body);
        this._logger.debug(`Saving order: ${JSON.stringify(order)}`);
        
        const result = await this._orderRepository.save(order);
        resp.status(201).json(order);
      } catch (err) {
        this._logger.error('Error while trying to save the order', err);
        resp.sendStatus(400).json({ error: err.message });
      }
  }
}