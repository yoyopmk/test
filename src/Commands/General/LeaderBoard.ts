import { Command, BaseCommand, Message } from '../../Structures'
import { IArgs, IGroup } from '../../Types'
import { getStats } from '../../lib'
import sortArray from 'sort-array'

@Command('leaderboard', {
    description: '',
    category: 'core',
    usage: 'leaderboard',
    exp: 10,
    cooldown: 25,
    aliases: ['lb']
})
export default class extends BaseCommand {
    override execute = async (M: Message, { flags }: IArgs): Promise<void> => {
        let users = await this.client.DB.user.find({})
        if (flags.includes('--group')) {
            if (!M.groupMetadata)
                return void setTimeout(async () => await this.execute(M, { flags, context: '', args: [] }), 3000)
            users = []
            const { participants } = M.groupMetadata as IGroup
            for (const participant of participants) (users as any).push(await this.client.DB.getUser(participant.id))
            flags.splice(flags.indexOf('--group'), 1)
        }
               sortArray(users, {
                    by: 'experience',
                    order: 'desc'
                })
        let text = `🧧 *GLOBAL LEADERBOARD* 🧧\n`
        const n = users.length < 10 ? users.length : 10
        for (let i = 0; i < n; i++) {
            let { username } = this.client.contact.getContact(users[i].jid)
            text += `\n*#${i + 1}*\n*🏮Username:* ${username}#${users[i].tag}\n*⭐Experience:* ${
                users[i].experience
            }\n*🏅Rank:* ${getStats(users[i].level).rank}\n*🏦Money:* ${users[i].wallet + users[i].bank}\n*🀄Pokemon:* ${
                users[i].party.length + users[i].pc.length
            }\n`
        }
        return void M.reply(text)
    }
}
