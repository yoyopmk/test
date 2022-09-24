import { join } from 'path'
import { BaseCommand, Command, Message } from '../../Structures'

@Command('info', {
    description: "Displays bot's info",
    usage: 'info',
    category: 'general',
    cooldown: 10,
    exp: 100
})
export default class extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        const { description, name, homepage } = require(join(__dirname, '..', '..', '..', 'package.json')) as {
            description: string
            homepage: string
            name: string
        }
        const image = this.client.assets.get('whatsapp-bot') as Buffer
        const users = this.client.DB.user.countDocuments()
        const uban =  this.client.DB.user.countDocuments({ban: true})
        const uptime = this.client.utils.formatSeconds(process.uptime())
        const text = `💠 *ZeroTwo* 💠\n\n📙 *Description: ${description}*\n\n🔰 *Commands:* ${this.handler.commands.size}\n\n💮 *Uptime:* ${uptime}\n\n⛩️ *Total Users:* ${users}\n\n🚫 *Banned Users:* ${uban}`
        return void (await reply(image, 'image', undefined, undefined, text, undefined, {
            title: this.client.utils.capitalize(name),
            thumbnail: image,
            mediaType: 1,
        }))
    }
}
