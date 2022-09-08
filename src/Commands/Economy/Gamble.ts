import { Sticker } from 'wa-sticker-formatter'
import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('gamble', {
    description: '',
    usage: '',
    category: 'economy',
    cooldown: 25,
    exp: 20,
    casino: true
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { args }: IArgs): Promise<void> => {
        const directions = ['left', 'right'] as TGamblingDirections[]
        if (M.numbers.length < 1 || args.length < 1)
            return void M.reply(`Invalid usage! Example: *${this.client.config.prefix}gamble right 500*`)
        const amount = M.numbers[0]
        const { wallet } = await this.client.DB.getUser(M.sender.jid)
        if ((wallet - amount) < 0)return void M.reply(`Check your wallet`)
        const direction = args[1]
        const direction = directions[Math.floor(Math.random() * directions.length)];
    let gif!: string;
    if (direction === "left") {
      gif = "https://bestanimations.com/media/left/365059883left-arrow-18.gif";
    } else if (direction === "right") {
      gif =
        "https://p14cdn4static.sharpschool.com/UserFiles/Servers/Server_1584893/Image/Buttons/right-arrow-31.gif";
    }
        const buttons = [
            {
                buttonId: 'id1',
                buttonText: { displayText: `${this.client.config.prefix}wallet` },
                type: 1
            }
        ]
        const result = directions[Math.floor(Math.random() * directions.length)]
        await this.client.DB.setGold(M.sender.jid, result === direction ? amount : -amount)
        const sticker = await new Sticker(this.client.assets.get(result) as Buffer, {
            pack: 'Eternity',
            author: `Eternity-001`,
            quality: 90,
            type: 'full'
        }).build()
        await M.reply(sticker, 'sticker')
        const buttonMessage = {
            text: result === direction ? `You won ${amount}` : `You lost ${amount}`,
            footer: '',
            buttons: buttons,
            headerType: 1
        }
        return void (await this.client.sendMessage(M.from, buttonMessage, {
            quoted: M.message
        }))
    }
}

type TGamblingDirections = 'left' | 'right'
