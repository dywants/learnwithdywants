import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserRole } from 'App/Enums/UserRole'
import User from 'App/Models/User'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.create({
      username: 'dywants',
      email: 'dywatscm@gmail.com',
      password: 'password',
      role: UserRole.Admin,
    })
    await UserFactory.createMany(100)
  }
}
