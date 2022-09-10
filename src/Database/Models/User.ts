import { prop, getModelForClass, modelOptions, Severity } from '@typegoose/typegoose'
import { Document } from 'mongoose'
import { ICharacter, ICharacter as WaifuResponse } from '@shineiichijo/marika'

export class Pokemon {
    @prop({ type: String, required: true })
    public name!: string

    @prop({ type: String, required: true })
    public image!: string

    @prop({ type: Number, required: true })
    public id!: number

    @prop({ type: Number, required: true })
    public level!: number
}

export class Card {
    @prop({ type: String, required: true })
    public name!: string

    @prop({ type: String, required: true })
    public image!: string

    @prop({ type: Number, required: true })
    public tier!: number

}

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
class Haigusha {
    @prop({ type: Boolean, required: true, default: false })
    public married!: boolean

    @prop({ type: Object, required: true, default: () => ({}) })
    public data!: WaifuResponse
}

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
class Gallery implements ICharacter {
    @prop({ required: true })
    public mal_id!: ICharacter['mal_id']

    @prop({ type: String, required: true })
    public url!: string

    @prop({ type: Object, required: true })
    public images!: ICharacter['images']

    @prop({ type: String, required: true })
    public name!: string

    @prop({ type: () => [String], required: true, default: [] })
    public nicknames!: string[]

    @prop({ type: String, required: true })
    public about!: string

    @prop({ required: true })
    public favorites!: number
}

@modelOptions({
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User {
    @prop({ type: String, required: true, unique: true })
    public jid!: string

    @prop({ type: Number, required: true, default: 0 })
    public experience!: number

    @prop({ type: Number, required: true, default: 0 })
    public wallet!: number

    @prop({ type: Number, required: true, default: 0 })
    public bank!: number

    @prop({ type: Number, required: true, default: 0 })
    public quizWins!: number

    @prop({ type: Number, required: true, default: 0 })
    public lastDaily!: number

    @prop({ type: Number, required: true, default: 0 })
    public lastRob!: number

    @prop({ type: Boolean, required: true, default: false })
    public banned!: boolean

    @prop({ type: Number, required: true, default: 1 })
    public level!: number

    @prop({ type: String, required: true })
    public tag!: string

    @prop({ type: () => Pokemon, required: true, default: [] })
    public party!: Pokemon[]

    @prop({ type: () => Pokemon, required: true, default: [] })
    public pc!: Pokemon[]

    @prop({ type: () => Haigusha, required: true, default: () => ({ married: false, data: {} }) })
    public haigusha!: Haigusha

    @prop({ type: () => Gallery, required: true, default: [] })
    public gallery!: Gallery[]

    @prop({ type: () => Card, required: true, default: [] })
    public collection!: Card[]
}

export type TUserModel = User & Document

export const userSchema = getModelForClass(User)
