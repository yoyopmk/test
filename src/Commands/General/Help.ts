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
            const ZeroTwo = "https://media.tenor.com/videos/571d88ea5d66e7b95cdbc4ef6029dd95/mp4";
            const { nsfw } = await this.client.DB.getGroup(M.from)
            if (!nsfw) commands = commands.filter(({ data }) => data.config.category !== 'nsfw')
            let text = `🎉Hi there! 👋🏻 _@${M.sender.jid.split('@')[0]}_, I'm ${
                this.client.config.name
            }\n\n prefix - "${this.client.config.prefix}"\n\n.📝 *Note:* This is my usable menu list and I'm here to to help with my menu list.`
            const categories: string[] = []
            for (const command of commands) {
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands: string[] = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*▬▬▬〖･${this.client.utils.capitalize(category)}･〗▬▬▬*\n\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `🎐${categoryCommands.join(', ')}`
        return void this.client.sendMessage(
        M.from,
        { url: zerotwo },
        MessageType.video,
        {
          quoted: M.WAMessage,
          mimetype: Mimetype.gif,
          caption: `${text} 📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
          contextInfo: { mentionedJid: [user] },
        }
      );
    }
            text += `\n\n🎉 *Note:* Use ${this.client.config.prefix}help <command_name> for more info of a specific command. Example: *${this.client.config.prefix}help hello*`
            return void (await M.reply(text, 'text', undefined, undefined, undefined, [M.sender.jid]))
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
