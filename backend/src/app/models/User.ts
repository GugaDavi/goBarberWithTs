import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
  readonly id!: number;
  name!: string;
  email!: string;
  password?: string;
  provider!: boolean;
  password_hash!: string;
  readonly created_at!: Date;
  readonly updated_at!: Date;

  static init (sequelize: Sequelize.Sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      password_hash: Sequelize.STRING,
      provider: Sequelize.BOOLEAN
    }, { sequelize, tableName: 'users' })

    this.addHook('beforeSave', async (user: User) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  static associate (models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' })
  }

  async checkPassword (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default User
