import { join } from 'path'
import { readdirSync } from 'fs-extra'
import chalk from 'chalk'
import { Message, Client, BaseCommand } from '../Structures'
import { getStats } from '../lib'
import { ICommand, IArgs } from '../Types'

export class MessageHandler {
    constructor(private client: Client) {}

    public handleMessage = async (M: Message): Promise<void> => {
        const { prefix } = this.client.config
        const args = M.content.split(' ')
        const title = M.chat === 'group' ? M.groupMetadata?.subject || 'Group' : 'DM'
        await this.moderate(M)
        if (!args[0] || !args[0].startsWith(prefix))
            return void this.client.log(
                `${chalk.cyanBright('Message')} from ${chalk.yellowBright(M.sender.username)} in ${chalk.blueBright(
                    title
                )}`
            )
        this.client.log(
            `${chalk.cyanBright(`Command ${args[0]}[${args.length - 1}]`)} from ${chalk.yellowBright(
                M.sender.username
            )} in ${chalk.blueBright(`${title}`)}`
        )
        const { banned, tag } = await this.client.DB.getUser(M.sender.jid)
        if (banned) return void M.reply('You are banned from using commands')
        if (!tag)
            await this.client.DB.updateUser(M.sender.jid, 'tag', 'set', this.client.utils.generateRandomUniqueTag())
        const cmd = args[0].toLowerCase().slice(prefix.length)
        const command = this.commands.get(cmd) || this.aliases.get(cmd)
        if (!command) return void M.reply('No such command, Baka!')
        const disabledCommands = await this.client.DB.getDisabledCommands()
        const index = disabledCommands.findIndex((CMD) => CMD.command === command.name)
        if (index >= 0)
            return void M.reply(
                `*${this.client.utils.capitalize(cmd)}* is currently disabled by *${
                    disabledCommands[index].disabledBy
                }* in *${disabledCommands[index].time} (GMT)*. ❓ *Reason:* ${disabledCommands[index].reason}`
            )
        if (command.config.category === 'dev' && !this.client.config.mods.includes(M.sender.jid))
            return void M.reply('This command can only be used by the MODS')
        if (M.chat === 'dm' && !command.config.dm) return void M.reply('This command can only be used in groups')
        if (command.config.category === 'moderation' && !M.sender.isAdmin)
            return void M.reply('This command can only be used by the group admins')
        const { nsfw } = await this.client.DB.getGroup(M.from)
        if (command.config.category === 'nsfw' && !nsfw)
            return void M.reply('This command can only be used in NSFW enabled groups')
        const cooldownAmount = (command.config.cooldown ?? 3) * 1000
        const time = cooldownAmount + Date.now()
        if (this.cooldowns.has(`${M.sender.jid}${command.name}`)) {
            const cd = this.cooldowns.get(`${M.sender.jid}${command.name}`)
            const remainingTime = this.client.utils.convertMs((cd as number) - Date.now())
            return void M.reply(
                `You are on a cooldown. Wait *${remainingTime}* ${
                    remainingTime > 1 ? 'seconds' : 'second'
                } before using this command again`
            )
        } else this.cooldowns.set(`${M.sender.jid}${command.name}`, time)
        setTimeout(() => this.cooldowns.delete(`${M.sender.jid}${command.name}`), cooldownAmount)
        await this.client.DB.setExp(M.sender.jid, command.config.exp || 10)
        await this.handleUserStats(M)
        try {
            await command.execute(M, this.formatArgs(args))
        } catch (error) {
            this.client.log((error as any).message, true)
        }
    }

    private moderate = async (M: Message): Promise<void> => {
        if (M.chat !== 'group') return void null
        const { mods } = await this.client.DB.getGroup(M.from)
        const isAdmin = M.groupMetadata?.admins?.includes(this.client.correctJid(this.client.user?.id || ''))
        if (!mods || M.sender.isAdmin || !isAdmin) return void null
        const urls = this.client.utils.extractUrls(M.content)
        if (urls.length > 0) {
            const groupinvites = urls.filter((url) => url.includes('chat.whatsapp.com'))
            if (groupinvites.length > 0) {
                groupinvites.forEach(async (invite) => {
                    const code = await this.client.groupInviteCode(M.from)
                    const inviteSplit = invite.split('/')
                    if (inviteSplit[inviteSplit.length - 1] !== code) {
                        this.client.log(
                            `${chalk.blueBright('MOD')} ${chalk.green('Group Invite')} by ${chalk.yellow(
                                M.sender.username
                            )} in ${chalk.cyanBright(M.groupMetadata?.subject || 'Group')}`
                        )
                        return void (await this.client.groupParticipantsUpdate(M.from, [M.sender.jid], 'remove'))
                    }
                })
            }
        }
    }

    private formatArgs = (args: string[]): IArgs => {
        args.splice(0, 1)
        return {
            args,
            context: args.join(' ').trim(),
            flags: args.filter((arg) => arg.startsWith('--'))
        }
    }

    public loadCommands = (): void => {
        this.client.log('Loading Commands...')
        const files = readdirSync(join(...this.path)).filter((file) => !file.startsWith('_'))
        for (const file of files) {
            this.path.push(file)
            const Commands = readdirSync(join(...this.path))
            for (const Command of Commands) {
                this.path.push(Command)
                const command: BaseCommand = new (require(join(...this.path)).default)()
                command.client = this.client
                command.handler = this
                this.commands.set(command.name, command)
                if (command.config.aliases) command.config.aliases.forEach((alias) => this.aliases.set(alias, command))
                this.client.log(
                    `Loaded: ${chalk.yellowBright(command.name)} from ${chalk.cyanBright(command.config.category)}`
                )
                this.path.splice(this.path.indexOf(Command), 1)
            }
            this.path.splice(this.path.indexOf(file), 1)
        }
        return this.client.log(
            `Successfully loaded ${chalk.cyanBright(this.commands.size)} ${
                this.commands.size > 1 ? 'commands' : 'command'
            } with ${chalk.yellowBright(this.aliases.size)} ${this.aliases.size > 1 ? 'aliases' : 'alias'}`
        )
    }
spawnPokemon = async (): Promise<void> => {
    cron.schedule("*/2 * * * *", async () => {
      const Data = await await this.client.getFeatures("pokemon");
      if (Data.id === "000") return void null;
      const p = Math.floor(Math.random() * Data.jids.length);
      const q = await this.client.getGroupData(Data.jids[p]);
      if (!q.wild || q.bot !== this.client.user.name) return void null;
      const i = Math.floor(Math.random() * 898);
      const y = Math.floor(Math.random() * 100);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${i}`
      );
      const buffer = await this.client.getBuffer(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
      );
      await this.client.DB.group.updateMany(
        { jid: Data.jids[p] },
        {
          $set: {
            catchable: true,
            lastPokemon: data.name,
            pId: data.id,
            pLevel: y,
            pImage: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
          },
        }
      );
      await this.client.sendMessage(Data.jids[p], buffer, MessageType.image, {
        caption: `A wild pokemon appeared! Use ${this.client.config.prefix}catch to catch this pokemon.`,
      });
      setTimeout(async () => {
        await this.client.DB.group.updateOne(
          { jid: Data.jids[p] },
          { $set: { catchable: false } }
        );
      }, 500000);
    });
  };

  summonChara = async (): Promise<void> => {
    cron.schedule("*/3 * * * *", async () => {
      const data = await this.client.getFeatures("chara");
      const p = Math.floor(Math.random() * data.jids.length);
      const q = await this.client.getGroupData(data.jids[p]);
      if (!q.chara || q.bot !== this.client.user.name) return void null;
      const chara = await marika.getRandomCharacter();
      const i = await this.client.getBuffer(chara.images.jpg.image_url);
      const source = await marika.getCharacterAnime(chara.mal_id);
      const price = Math.floor(Math.random() * (50000 - 25000) + 25000);
      await this.client.DB.group.updateMany(
        { jid: data.jids[p] },
        {
          $set: {
            "charaResponse.id": chara.mal_id,
            "charaResponse.name": chara.name,
            "charaResponse.image": chara.images.jpg.image_url,
            "charaResponse.about": chara.about,
            "charaResponse.source": source[0].anime.title,
            "charaResponse.claimable": true,
            "charaResponse.price": price,
          },
        }
      );
      const media = await this.client.prepareMessage(
        data.jids[p],
        i,
        MessageType.image
      );
      const buttons = [
        {
          buttonId: "claim",
          buttonText: { displayText: `${this.client.config.prefix}claim` },
          type: 1,
        },
      ];
      const buttonMessage: any = {
        contentText: `*A claimable character Appeared!*\n\n🎀 *Name: ${chara.name}*\n\n💬 *About:* ${chara.about}\n\n📛 *Source: ${source[0].anime.title}*\n\n💰 *Price: ${price}*\n\n*[Use ${this.client.config.prefix}claim to have this character in your gallery]*`,
        footerText: "©ZeroTwo 2022",
        buttons: buttons,
        headerType: 4,
        imageMessage: media?.message?.imageMessage,
      };
      await this.client.sendMessage(
        data.jids[p],
        buttonMessage,
        MessageType.buttonsMessage
      );
      setTimeout(async () => {
        await this.client.DB.group.updateOne(
          { jid: data.jids[p] },
          { $set: { "charaResponse.claimable": false } }
        );
      }, 120000);
    });
  };

}
    private handleUserStats = async (M: Message): Promise<void> => {
        const { experience, level } = await this.client.DB.getUser(M.sender.jid)
        const { requiredXpToLevelUp } = getStats(level)
        if (requiredXpToLevelUp > experience) return void null
        await this.client.DB.updateUser(M.sender.jid, 'level', 'inc', 1)
    }

    public commands = new Map<string, ICommand>()

    public aliases = new Map<string, ICommand>()

    private cooldowns = new Map<string, number>()

    private path = [__dirname, '..', 'Commands']
}
