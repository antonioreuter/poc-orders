'use strict';

import { ILogger } from '../domain/interfaces/iLogger';
import { injectable } from 'inversify';

@injectable()
export default class Logger implements ILogger {
  debug(message: string): void {
    console.log(`[DEBUG]: ${message}`);
  }

  info(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  error(message: string, error: Error): void {
    console.log(`[ERROR] ${message}: ${error.message}`);
    console.error(error);
  }
}