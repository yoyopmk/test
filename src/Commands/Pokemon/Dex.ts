import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('pokedex', {
    description: 'dex',
    aliases: ['dex'],
    exp: 20,
    cooldown: 15,
    usage: '',
    category: 'pokemon'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const { party, pc } = await this.client.DB.getUser(M.sender.jid)
        const image = this.client.assets.get('pokemons.png') as Buffer
        const buffer = await this.client.utils.getBuffer('https://telegra.ph/file/b9f15bbf3150c4cc5a6f4.jpg')
        const pokemons = [...party, ...pc]
        if (pokemons.length < 1) return void M.reply('no pokemon')
        let text = `*〖🔰Pokedex🔰〗*\n\n⛩️ *Info:* users Pokè-Dex\n\n` 
        pokemons.forEach((x) => (text += `\n*❯ ${this.client.utils.capitalize(x.name)}*`))
        return void (await M.reply(buffer, 'image', true, undefined, text, [M.sender.jid]))
    }
}
