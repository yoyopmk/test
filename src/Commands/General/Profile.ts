import { BaseCommand, Command, Message } from '../../Structures'
import { getStats } from '../../lib'

@Command('profile', {
    description: '',
    category: 'general',
    exp: 25,
    cooldown: 15,
    aliases: ['p'],
    usage: ''
})
export default class command extends BaseCommand {
    override execute = async ({ mentioned, quoted, sender, reply, groupMetadata }: Message): Promise<void> => {
        const users = mentioned
        if (quoted && !users.includes(quoted.sender.jid)) users.push(quoted.sender.jid)
        while (users.length < 1) users.push(sender.jid)
        let pfp!: Buffer
        try {
            pfp = await this.client.utils.getBuffer((await this.client.profilePictureUrl(users[0], 'image')) || '')
        } catch (error) {
            pfp = this.client.assets.get('404') as Buffer
        }
        const info = await this.client.DB.getUser(users[0])
        let username: string = this.client.contact.getContact(users[0]).username
        if (users[0] === sender.jid) username = sender.username
        const haigusha = info.haigusha.married ? info.haigusha.data.name : 'None'
        const admin = this.client.utils.capitalize(`${groupMetadata?.admins?.includes(users[0]) || false}`)
        const ban = !info.banned || info.banned === null ? 'False' : 'True'
        const { rank } = getStats(info.level)
        let bio!: string
        try {
            bio = (await this.client.fetchStatus(users[0]))?.status || ''
        } catch (error) {
            bio = ''
        }
        const text = `🀄 *Username:* ${username}#${info.tag}\n\n🔰*Bio:* ${bio}\n\n🏮*XP:* ${
            info.experience || 0
        }\n\n⚡*Rank:* ${rank}\n\n🌀*Haigusha:* ${haigusha}\n\n💮*Pokemon:* ${
            info.party.length + info.pc.length
        }\n\n*Quiz Wins:* ${info.quizWins}\n\n*Admin:* ${admin}\n\n*Banned:* ${ban || 'False'}`
        return void (await reply(pfp, 'image', undefined, undefined, text))
    }
}
