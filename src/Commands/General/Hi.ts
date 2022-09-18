import { BaseCommand, Command, Message } from '../../Structures'

@Command('hi', {
    description: 'Says hello to the bot',
    category: 'general',
    usage: 'hi',
    aliases: ['hello'],
    exp: 25,
    cooldown: 5
})
export default class extends BaseCommand {
    public override execute = async ({ sender, reply }: Message): Promise<void> =>
                  const buttons = [
                                {
                                    buttonId: `${this.client.config.prefix}help`,
                                    buttonText: { displayText: `${this.client.config.prefix}help` },
                                    type: 1
                                }
                            ]
                            const buttonMessage = {
                                caption: `Baileys Button Test ✅`,
                                footer: '🤖 Baileys',
                                buttons: buttons,
                                headerType: 4
                            }
                          void (await this.client.sendMessage(from, buttonMessage))
                        })
       //void (await reply(`Hello! *${sender.username}* Darling`))
}
