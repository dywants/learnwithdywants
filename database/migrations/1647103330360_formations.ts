import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Formations extends BaseSchema {
  protected tableName = 'formations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.text('description').notNullable()
      table.string('introduction_url').nullable()
      table.string('logo_url').nullable()
      table.json('order').notNullable().defaultTo('[]')
      table.timestamp('released_at', { useTz: true }).nullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
