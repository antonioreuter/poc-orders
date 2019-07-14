'use strict';

import config from 'config';
import { ILogger } from '../domain/interfaces/iLogger';
import { injectable } from 'inversify';
import bunyan from 'bunyan';

@injectable()
export default class Logger implements ILogger {

  private _logger = bunyan.createLogger({
    name: config.get('app.name'),
    level: config.get('logger.level'),
    stream: process.stdout
  });

  debug(message: string): void {
    this._logger.debug(`[DEBUG]: ${message}`);
  }

  info(message: string): void {
    this._logger.info(`[INFO]: ${message}`);
  }

  error(message: string, error: Error): void {
    this._logger.error(error, `[ERROR] ${message}: ${error.message}`);
  }
}