import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs } from '../../Types'
import { Pokemon } from '../../Database'

@Command('catch', {
    description: '',
    category: 'pokemon',
    usage: '',
    cooldown: 25,
    exp: 25,
    aliases: ['c']
})
export default class command extends BaseCommand {
    override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!this.handler.pokemonResponse.has(M.from)) return void M.reply('There is no pokemons to catch')
        const data = this.handler.pokemonResponse.get(M.from) as Pokemon
        if (!context) return void M.reply('name?')
        const pokemon = context.trim().toLowerCase().split(' ')[0].trim()
        if (pokemon !== data.name) return void M.reply('Wrong')
        this.handler.pokemonResponse.delete(M.from)
        let flag = false
        let { party, pc } = await this.client.DB.getUser(M.sender.jid)
        const Text = `Congratulations 🎉 caught a Level ${data.level} ${this.client.utils.capitalize(data.name)}. ${
            party.length >= 6 ? 'it has been transferred to your dex' : ''
        }`
        party.length >= 6 ? pc.push(data) : party.push(data)
        await this.client.DB.user.updateOne({ jid: M.sender.jid }, { $set: { party, pc } })
        const buttons = [
            {
                buttonId: 'id1',
                buttonText: { displayText: `${this.client.config.prefix}pokemon ${data.id}` },
                type: 1
            }
        ]
        const buttonMessage = {
            text: Text,
            footer: 'Zerotwo 2022',
            buttons: buttons,
            headerType: 1
        }
        return void (await this.client.sendMessage(M.from, buttonMessage, {
            quoted: M.message
        }))
    }
}
