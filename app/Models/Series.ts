import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Episode from 'App/Models/Episode'

export default class Series extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  @slugify({
    strategy: 'shortId',
    fields: ['name'],
  })
  public slug: string

  @column()
  public description: string

  @column()
  public logoUrl: string | null

  @column()
  public difficultyLevel: DifficultyLevel

  @column.dateTime()
  public releasedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Episode)
  public episodes: HasMany<typeof Episode>
}
