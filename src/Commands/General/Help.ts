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
            }\nMy prefix is - "${this.client.config.prefix}"\n\nThe usable commands are listed below.

         Hello ye
           
`}
        )
    }
}
