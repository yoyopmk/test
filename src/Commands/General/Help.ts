import { proto } from '@adiwajshing/baileys'
import { Message, BaseCommand, Command } from '../../Structures'
import { IArgs, GroupFeatures } from '../../Types'

@Command('help', {
    description: 'Enables/Disables a certain group feature',
    usage: 'help',
    cooldown: 1,
    category: 'moderation',
    exp: 25,
    aliases: ['feature']
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { flags }: IArgs): Promise<void> => {
        const features = Object.keys(GroupFeatures) as (keyof typeof GroupFeatures)[]
        if (!flags.length) {
            const sections: proto.ISection[] = []
            let text = '☘️ *Hii there 🎉* ☘️'
            for (const feature of features) {
                const rows: proto.IRow[] = []
                rows.push(
                    {
                        title: `Help`,
                        rowId: `${this.client.config.prefix}help`
                    },
                    {
                        title: `Info`,
                        rowId: `${this.client.config.prefix}info`
                    }
                )
                sections.push({ title: this.client.utils.capitalize(category)} rows })
                text += ``\`\`\`${categoryCommands.join(', ')}\`\`\```
            }
            return void M.reply(
                text,
                'text',
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                undefined,
                {
                    sections,
                    buttonText: 'Group Features'
                }
            )
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
