import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Episodes extends BaseSchema {
  protected tableName = 'episodes'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.integer('duration').unsigned().nullable()
      table.string('video_url').nullable()
      table.text('description').notNullable()
      table.integer('difficulty_level').unsigned().notNullable()
      table.dateTime('released_at').nullable()

      table.integer('series_id').unsigned().nullable().references('id').inTable('series')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
