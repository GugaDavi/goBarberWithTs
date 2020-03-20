import express from 'express'
import cors from 'cors'
import path from 'path'

import Routes from './routes'

import './database'

class App {
  public express: express.Application;

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use('/files', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')))
  }

  routes (): void {
    this.express.use(Routes)
  }
}

export default new App().express
