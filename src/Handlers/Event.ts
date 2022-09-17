import chalk from 'chalk'
import { delay } from '@adiwajshing/baileys'
import { Client } from '../Structures'
import { IEvent } from '../Types'
import { MessageHandler } from '.'

export class EventHandler {
    constructor(private client: Client, private handler: MessageHandler) {}

    public handleEvents = async (event: IEvent): Promise<void> => {
        let group: { subject: string; description: string } = {
            subject: '',
            description: ''
        }
        await delay(1500)
        await this.client
            .groupMetadata(event.jid)
            .then((res) => {
                group.subject = res.subject
                group.description = res.desc || 'No Description'
            })
            .catch(() => {
                group.subject = '__'
                group.description = ''
            })
        this.client.log(
            `${chalk.blueBright('EVENT')} ${chalk.green(
                `${this.client.utils.capitalize(event.action)}[${event.participants.length}]`
            )} in ${chalk.cyanBright(`$`)}`
        )
        const { events } = await this.client.DB.getGroup(event.jid)
        if (
            !events ||
            (event.action === 'remove' &&
                event.participants.includes(
                    `${(this.client.user?.id || '').split('@')[0].split(':')[0]}@s.whatsapp.net`
                ))
        )
            return void null
        const text =
            event.action === 'add'
                ? `Well, ${event.participants
                      .map((jid) => `@${jid.split('@')[0]}`)
                      .join(' ')}* it's about time you arrived!`
                : event.action === 'remove'
                ? `Goodbye *${event.participants
                      .map((jid) => `@${jid.split('@')[0]}`)
                      .join(', ')}* 👋🏻, we're probably not gonna miss you.`
                : event.action === 'demote'
                ? `Lol 😂 someone Demoted *@${event.participants[0].split('@')[0]}*`
                : `Someone Promoted *@${event.participants[0].split('@')[0]}*, as admin`
        if (event.action === 'add') {
            let imageUrl: string | undefined
            try {
                imageUrl = await this.client.profilePictureUrl(event.jid)
            } catch (error) {
                imageUrl = undefined
            }
            const image = imageUrl
                ? await this.client.utils.getBuffer(imageUrl)
                : (this.client.assets.get('404') as Buffer)
            return void (await this.client.sendMessage(event.jid, {
                image: image,
                mentions: event.participants,
                caption: text
            }))
        }
        return void (await this.client.sendMessage(event.jid, {
            text,
            mentions: event.participants
        }))
    }

    public sendMessageOnJoiningGroup = async (group: { subject: string; jid: string }): Promise<void> => {
        this.client.log(`${chalk.blueBright('JOINED')} ${chalk.cyanBright(group.subject)}`)
        this.handler.groups.push(group.jid)
        return void (await this.client.sendMessage(group.jid, {
            text: `Thanks for adding me in this group. Please use *${this.client.config.prefix}help* to get started.`
        }))
    }
}
