import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('help', {
    description: "Displays the bot's usable commands",
    aliases: ['h'],
    cooldown: 10,
    exp: 20,
    usage: 'help || help <command_name>',
    category: 'general'
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
            let commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            })).filter((command) => command.data.config.category !== 'dev')
            const { nsfw } = await this.client.DB.getGroup(M.from)
            if (!nsfw) commands = commands.filter(({ data }) => data.config.category !== 'nsfw')
            const buffer = await this.client.utils.getBuffer('https://telegra.ph/file/bd0f718f51e806ea1584e.mp4')
            let text = `🎉 Hi there! 👋🏻 *@${M.sender.jid.split('@')[0]}*, I'm ${
                this.client.config.name
            }\n\n💠 *prefix:* "${this.client.config.prefix}"\n\n🔰 *Commands:* ${this.handler.commands.size}\n\n⛩️ *Categories:* 10`
                text += `Hi`
            }
            text += `\n\n📔 *Note:* Use ${this.client.config.prefix}help <command_name> for more info of a specific command\n\n⭐ *Example:* *${this.client.config.prefix}help hello*`
            return void (await M.reply(buffer, 'video', true, undefined, text, [M.sender.jid]))
        } else {
            const cmd = context.trim().toLowerCase()
            const command = this.handler.commands.get(cmd) || this.handler.aliases.get(cmd)
            if (!command) return void M.reply(`No command found | *"${context.trim()}"*`)
            return void M.reply(
                `🎐 *Command:* ${this.client.utils.capitalize(command.name)}\n🎴 *Aliases:* ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.client.utils.capitalize(alias)).join(', ')
                }\n🀄 *Category:* ${this.client.utils.capitalize(command.config.category)}\n⏰ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n💮 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.client.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 *Description:* ${command.config.description}`
            )
        } 
    }
}
