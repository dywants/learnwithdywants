import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { DifficultyLevel } from 'App/Enums/DifficultyLevel'
import { slugify } from '@ioc:Adonis/Addons/LucidSlugify'
import Series from 'App/Models/Series'

export default class Episode extends BaseModel {
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
  public videoUrl: string | null

  @column()
  public duration: number | null

  @column()
  public difficultyLevel: DifficultyLevel

  @column()
  public order: number[]

  @column()
  public seriesId: number

  @column.dateTime()
  public releasedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Series)
  public series: BelongsTo<typeof Series>
}
