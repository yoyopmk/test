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
    public override execute = async (M: Message): Promise<void> => {
        if (!this.client.config.mods.length) return void reply('*[UNMODERATED]*')
        let text =" *▬▬▬〖･BOT MODS･〗▬▬▬*\n\n"
let mentions:string[] = []
this.client.config.mods.map((x)=>{
text+= `*❯ @${this.client.contact.getContact(x).jid.split('@')[0]}*\n`
mentions.push(this.client.contact.getContact(x).jid)
})

        return void this.client.sendMessage(M.from,{text:text, mentions:mentions})
    }
}
