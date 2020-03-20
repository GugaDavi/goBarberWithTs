import { Sequelize } from 'sequelize'
import mongoose from 'mongoose'

import User from '../app/models/User'
import File from '../app/models/File'
import Appointment from '../app/models/Appointment'

import dbConfig from '../config/database'

const models: (typeof User | typeof File | typeof Appointment)[] = [User, File, Appointment]

class Database {
  public connection!: Sequelize
  public mongooseConnection!: Promise<mongoose>
  constructor () {
    this.init()
    this.mongo()
  }

  init () {
    this.connection = new Sequelize(dbConfig)
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo () {
    this.mongooseConnection = mongoose.connect('mongodb://localhost:27017/gobarber', {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    })
  }
}

export default new Database().connection
