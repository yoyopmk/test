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
            let text = `👋🏻 (💙ω💙) Konichiwa! *@${M.sender.jid.split('@')[0]}*, I'm ${
                this.client.config.name
            }\nMy prefix is - "${this.client.config.prefix}"\n\nThe usable commands are listed below.`
            const categories: string[] = []
            for (const command of commands) {
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands: string[] = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*━━━❰ ${this.client.utils.capitalize(category)} ❱━━━*\n\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `\`\`\`${categoryCommands.join(', ')}\`\`\``
            }
const sections: proto.ISection[] = []
            let text = '🍁 *Available Features*'
            for (const feature of features) {
                const rows: proto.IRow[] = []
                rows.push(
                    {
                        title: `Enable ${this.client.utils.capitalize(category)}`,
                        rowId: `${this.client.config.prefix}set --${feature}=true`
                    },
                    {
                        title: `Disable ${this.client.utils.capitalize(category)}`,
                        rowId: `${this.client.config.prefix}help`
                    }
                )
                sections.push({ title: this.client.utils.capitalize(category)}, rows })
                text += `\n\n ${this.client.utils.capitalize(category)}\n ${
                    Commands list[feature]
                }`
            }
            text += `\n\n📕 *Note:* Use ${this.client.config.prefix}help <command_name> for more info of a specific command. Example: *${this.client.config.prefix}help hello*`
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
                }\n🔗 *Category:* ${this.client.utils.capitalize(command.config.category)}\n⏰ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n🎗 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.client.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 *Description:* ${command.config.description}`
            )
        }
    }
}
