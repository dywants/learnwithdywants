import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserRole } from 'App/Enums/UserRole'
import { UserStatus } from 'App/Enums/UserStatus'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username', 80).notNullable().unique()
      table.string('email', 255).notNullable().unique()
      table.string('password', 180).nullable()
      table.integer('status').unsigned().notNullable().defaultTo(UserStatus.Pending)
      table.integer('role').unsigned().notNullable().defaultTo(UserRole.Member)
      table.string('oauth_provider_id').nullable()
      table.string('oauth_provider_name').nullable()
      table.string('remember_me_token').nullable()
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
