import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Appointement extends Model {
  readonly id!: number;
  user_id!: string;
  provider_id!: string;
  date!: Date
  canceled_at?: Date
  readonly created_at!: Date;
  readonly updated_at!: Date;

  static init (sequelize) {
    super.init({
      date: Sequelize.DATE,
      canceled_at: Sequelize.DATE
    }, { sequelize, tableName: 'appointments' })

    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' })
  }
}

export default Appointement
