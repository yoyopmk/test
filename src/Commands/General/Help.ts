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
            let text = `👋🏻 Kønnīçhiwã!(❤️W❤️) @${M.sender.jid.split('@')[0]}, I'm ${this.client.config.name}
🧨My prefix is: "${this.client.config.prefix}"\n\n🌀My Command List🌀.
            
            
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


📕 Note: Use ${this.client.config.prefix}help <command_name> for more info of a specific command. Example: *${this.client.config.prefix}help hello*`
            return void (await M.reply(text, 'text', undefined, undefined, undefined, [M.sender.jid]))
        } else {
            const cmd = context.trim().toLowerCase()
            const command = this.handler.commands.get(cmd) || this.handler.aliases.get(cmd)
            if (!command) return void M.reply(`No command found | "${context.trim()}"`)
            return void M.reply(
                `🎐 Command: ${this.client.utils.capitalize(command.name)}\n🌀 Aliases: ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.client.utils.capitalize(alias)).join(', ')
                }\n🏮 Category: ${this.client.utils.capitalize(command.config.category)}\n⏰ Cooldown: ${
                    command.config.cooldown ?? 3
                }s\n💡 Usage: ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.client.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 Description: ${command.config.description}`
            )
        }
    }
}
