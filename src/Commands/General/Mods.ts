import { Message, Command, BaseCommand } from '../../Structures'

@Command('mods', {
    description: "Displays the bot's moderators",
    exp: 20,
    cooldown: 5,
    dm: true,
    category: 'general',
    usage: 'mods',
    aliases: ['mod', 'owner', 'moderators']
})
export default class extends BaseCommand {
    public override execute = async ({ reply }: Message): Promise<void> => {
        if (!this.client.config.mods.length) return void reply('*[UNMODERATED]*')
        let text =" *🧧「ZISHIRO MODS」🧧*\n\n"

this.client.config.mods.map((x)=>{
text+= `*❯ @${this.client.contact.getContact(x).username}*\n`
})

        return void (await reply(text))
    }
}
