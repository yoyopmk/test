import {
    BaseCommand,
    Command,
    Message
} from '../../Structures'

@Command('hi', {
    description: 'Says hello to the bot',
    category: 'general',
    usage: 'hi',
    aliases: ['hello'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({
            sender,
            reply
        }: Message): Promise < void > =>
        const button = [{
                buttonId: '+help',
                buttonText: {
                    displayText: 'Help'
                },
                type: 1
            },
            {
                buttonId: '+info',
                buttonText: {
                    displayText: 'Info'
                },
                type: 1
            }
        ]
    let buttonMessaged = {
        text: `Baileys Button Test ✅`,
        footer: 'Baileys',
        buttons: button,
        headerType: 1
    }
    await this.client.sendMessage(from, buttonMessaged, {
        quoted: M
    })
    void(await reply(`Hello! *${sender.username}* Darling`))
}
