'use strict';

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from  'cookie-parser';
import compression from 'compression';
import cors from 'cors'
import helmet from 'helmet';

import AppContainer from './appContainer'
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';

class Application {
  public appContainer: AppContainer;

  constructor() {
    this.appContainer = new AppContainer(new Container());
  }

  public createApp() {
    const server = new InversifyExpressServer(this.appContainer.container);
    server.setConfig(app => this.config(app));

    return server.build();
  }

  private config(app: any): void {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(compression());
    app.use(cors({ credentials: true, origin: true }));
    app.use(helmet());
  }
}

export default new Application();