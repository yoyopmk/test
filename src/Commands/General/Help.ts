import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
            let commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
@Command('help', {
    description: "Displays the bot's usable commands",
    aliases: ['h'],
    cooldown: 10,
    exp: 20,
    usage: 'help || help <command_name>',
    category: 'general'
})
run = async (M: ISimplifiedMessage): Promise<void> => {
        const n = [
            'https://telegra.ph/file/90c8d596818e948cc6a82.mp4'
        ]
        let well = n[Math.floor(Math.random() * n.length)]
        return void this.client.sendMessage(M.from, { url: well }, MessageType.video, {quoted:M.WAMessage,
            mimetype: Mimetype.gif,
            caption: `(❤️ω❤️)Konnichiwa👋 Darling I'm 𝗭𝗲𝗿𝗼𝗧𝘄𝗼!
Hllo
┌────────────┈
│  ゼロツー❤️
└────────────┈` }
        )
    }
}


