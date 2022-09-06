const Command = require('../../Structures/Command')
const Message = require('../../Structures/Message')
const { description, homepage, name } = require('../../../package.json')

module.exports = class command extends Command {
    constructor() {
        super('info', {
            description: "Displays bot's info",
            aliases: ['bot'],
            category: 'general',
            exp: 100,
            usage: 'info',
            cooldown: 10
        })
    }

    /**
     * @param {Message} M
     * @returns {Promise<void>}
     */

    execute = async (M) => {
        const image = this.helper.assets.get('whatsapp-bot')
        const pad = (s) => (s < 10 ? '0' : '') + s
        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / (60 * 60))
            const minutes = Math.floor((seconds % (60 * 60)) / 60)
            const secs = Math.floor(seconds % 60)
            return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`
        }
        const uptime = formatTime(process.uptime())
        const text = `🏮 *ZeroTwo* 🏮\n\n📙 *Description: This bot is in under construction The all game features will be released after 1 month*\n\n🔗 *Commands:* ${
            Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            })).length
        }\n\n🚦 *Uptime:* ${uptime}`
        return void (await this.client.sendMessage(
            M.from,
            {
                image,
                caption: Code 002,
                contextInfo: {
                    externalAdReply: {
                        title: ZeroTwo_Test,
                        mediaType: 1,
                        thumbnail: image,
                    }
                }
            },
            {
                quoted: M.message
            }
        ))
    }
}
