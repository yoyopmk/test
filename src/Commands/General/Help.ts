import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('help', {
    description: "Displays bot's info",
    aliases: 'h'
    usage: 'help || help <command_name>',
    cooldown: 10,
    exp: 20
    category: 'general'
})
export default class extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        const { description, name, homepage } = require(join(__dirname, '..', '..', '..', 'package.json')) as {
            description: string
            homepage: string
            name: string
        }
        const image = this.client.assets.get('whatsapp-bot') as Buffer
        const uptime = this.client.utils.formatSeconds(process.uptime())
        const text = `konnichiwa
*━━━━━『•Fun•』━━━━━*

⌬ ${this.client.config.prefix}friendship
⌬ ${this.client.config.prefix}reaction
⌬ ${this.client.config.prefix}ship
⌬ ${this.client.config.prefix}simp
⌬ ${this.client.config.prefix}triggered

*━━━━━『•General•』━━━━━*

⌬ ${this.client.config.prefix}help
⌬ ${this.client.config.prefix}hi
⌬ ${this.client.config.prefix}info
⌬ ${this.client.config.prefix}mods
⌬ ${this.client.config.prefix}profile
⌬ ${this.client.config.prefix}rank

*━━━━━『•Media•』━━━━━*

⌬ ${this.client.config.prefix}lurics
⌬ ${this.client.config.prefix}play
⌬ ${this.client.config.prefix}spotify
⌬ ${this.client.config.prefix}yta
⌬ ${this.client.config.prefix}yts
⌬ ${this.client.config.prefix}ytv

*━━━━━『•Moderation•』━━━━━*

⌬ ${this.client.config.prefix}ping
⌬ ${this.client.config.prefix}set

*━━━━━『•Utils•』━━━━━*

⌬ ${this.client.config.prefix}prettier
⌬ ${this.client.config.prefix}react
⌬ ${this.client.config.prefix}retrieve
⌬ ${this.client.config.prefix}sticker

*━━━━━『•Weeb•』━━━━━*

⌬ ${this.client.config.prefix}anime
⌬ ${this.client.config.prefix}character
⌬ ${this.client.config.prefix}kitsune
⌬ ${this.client.config.prefix}manga
⌬ ${this.client.config.prefix}neko
⌬ ${this.client.config.prefix}waifu
`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
        }))
    }
}
