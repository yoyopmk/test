import { BaseCommand, Command, Message } from '../../Structures'
import { IArgs } from '../../Types'

@Command('help', {
    description: "Displays the bot's usable commands",
    aliases: ['h'],
    cooldown: 10,
    exp: 20,
    usage: 'help || help <command_name>',
    category: 'general'
})
export default class extends BaseCommand {
    public override execute = async (M: Message, { context }: IArgs): Promise<void> => {
        if (!context) {
            let commands = Array.from(this.handler.commands, ([command, data]) => ({
                command,
                data
            })).filter((command) => command.data.config.category !== 'dev')
            const { nsfw } = await this.client.DB.getGroup(M.from)
            if (!nsfw) commands = commands.filter(({ data }) => data.config.category !== 'nsfw')
            let text = `👋🏻 (❤️ω❤️) Konichiwa! *@${M.sender.jid.split('@')[0]}*, I'm ${
                this.client.config.name
            }\nMy prefix is - "${this.client.config.prefix}"\n\nThe usable commands are listed below.`
            const categories: string[] = []
            for (const command of commands) {
                if (categories.includes(command.data.config.category)) continue
                categories.push(command.data.config.category)
            }
            for (const category of categories) {
                const categoryCommands: string[] = []
                const filteredCommands = commands.filter((command) => command.data.config.category === category)
                text += `\n\n*▬▬〖･${this.client.utils.capitalize(category)}•〗▬▬*\n\n`
                filteredCommands.forEach((command) => categoryCommands.push(command.data.name))
                text += `\`\`\`🌀${categoryCommands.join(', ')}\`\`\``;
      const coding = [{ title: "github", rowId: "rowid1" }];
      const economy = [
        { title: "bank", rowId: "rowid1" },
        { title: "daily", rowId: "rowid2" },
        { title: "deposit", rowId: "rowid2" },
        { title: "gamble", rowId: "rowid2" },
        { title: "give", rowId: "rowid2" },
        { title: "rob", rowId: "rowid2" },
        { title: "slot", rowId: "rowid2" },
        { title: "wallet", rowId: "rowid2" },
        { title: "weekly", rowId: "rowid2" },
        { title: "withdraw", rowId: "rowid2" },
      ];
      const fun = [
        { title: "reaction", rowId: "rowid2" },
        { title: "ship", rowId: "rowid2" },
        { title: "simp", rowId: "rowid2" },
        { title: "trigger", rowId: "rowid2" },
        { title: "frendship", rowId: "rowid2" },
      ];
      const games = [
        { title: "answer", rowId: "rowid1" },
        { title: "forfeit-quiz", rowId: "rowid2" },
        { title: "quiz", rowId: "rowid2" },
      ];
      const general = [
        { title: "help", rowId: "rowid2" },
        { title: "hi", rowId: "rowid2" },
        { title: "mods", rowId: "rowid2" },
        { title: "profile", rowId: "rowid2" },
        { title: "leaderboard", rowId: "rowid2" },
        { title: "rank", rowId: "rowid2" },
        { title: "info", rowId: "rowid2" },
      ];
      const media = [
        { title: "lyrics", rowId: "rowid2" },
        { title: "play", rowId: "rowid2" },
        { title: "spotify", rowId: "rowid2" },
        { title: "ytaudio", rowId: "rowid2" },
        { title: "ytsearch", rowId: "rowid2" },
        { title: "ytvideo", rowId: "rowid2" },
      ];
      const moderation = [
        { title: "promote", rowId: "rowid2" },
        { title: "enable", rowId: "rowid2" },
        { title: "disable", rowId: "rowid2" },
        { title: "delete", rowId: "rowid2" },
        { title: "demote", rowId: "rowid2" },
        { title: "ping", rowId: "rowid2" },
        { title: "open", rowId: "rowid2" },
        { title: "promote", rowId: "rowid2" },
        { title: "purge", rowId: "rowid2" },
        { title: "remove", rowId: "rowid2" },
        { title: "set", rowId: "rowid2" },
      ];
      const nsfw = [
        { title: "nhentai", rowId: "rowid2" },
      ];
      const pokemon = [
        { title: "catch", rowId: "rowid1" },
        { title: "party", rowId: "rowid2" },
        { title: "pc", rowId: "rowid2" },
        { title: "pokemons", rowId: "rowid2" },
        { title: "t2party", rowId: "rowid2" },
        { title: "t2pc", rowId: "rowid2" },
        { title: "trade", rowId: "rowid2" },
        { title: "trade-confirm", rowId: "rowid2" },
        { title: "trade-delete", rowId: "rowid2" },
        { title: "swap", rowId: "rowid2" },
      ];
      const characters = [
        { title: "claim", rowId: "rowid1" },
        { title: "gallery", rowId: "rowid2" },
        { title: "schara", rowId: "rowid2" },
      ];
      const utils = [
        { title: "pretter", rowId: "rowid1" },
        { title: "react", rowId: "rowid2" },
        { title: "retrieve", rowId: "rowid2" },
        { title: "sticker", rowId: "rowid2" },
      ];
      const weeb = [
        { title: "anime", rowId: "rowid1" },
        { title: "character", rowId: "rowid2" },
        { title: "divorce", rowId: "rowid2" },
        { title: "haigusha", rowId: "rowid2" },
        { title: "kitsune", rowId: "rowid2" },
        { title: "loli", rowId: "rowid2" },
        { title: "marry", rowId: "rowid2" },
        { title: "manga", rowId: "rowid2" },
        { title: "neko", rowId: "rowid2" },
      ];
      let sections;
      if (!(await (await this.client.getGroupData(M.from)).nsfw)) {
        sections = [
          { title: "Coding", rows: coding },
          { title: "Economy", rows: economy },
          { title: "Educative", rows: educative },
          { title: "Fun", rows: fun },
          { title: "Games", rows: games },
          { title: "General", rows: general },
          { title: "Media", rows: media },
          { title: "Moderation", rows: moderation },
          { title: "Pokemon", rows: pokemon },
          { title: "Utils", rows: utils },
          { title: "Weeb", rows: weeb },
          { title: "Characters", rows: characters },
        ];
      } else {
        sections = [
          { title: "Coding", rows: coding },
          { title: "Economy", rows: economy },
          { title: "Educative", rows: educative },
          { title: "Fun", rows: fun },
          { title: "Games", rows: games },
          { title: "General", rows: general },
          { title: "Media", rows: media },
          { title: "Moderation", rows: moderation },
          { title: "Nsfw", rows: nsfw },
          { title: "Pokemon", rows: pokemon },
          { title: "Utils", rows: utils },
          { title: "Weeb", rows: weeb },
          { title: "Characters", rows: characters },
        ];
      }
      interface button {
        buttonText: string;
        footerText: string;
        description: string;
        sections: string[];
        listType: number;
      }
      const button: any = {
        buttonText: "Command List",
        footerText: "🍭 ZeroTwo 🍭",
        description: `${text} 📝 *Note: Use ${this.client.config.prefix}help <command_name> to view the command info*`,
        sections: sections,
        listType: 1,
      };
      this.client.sendMessage(M.from, button, MessageType.listMessage, {
        quoted: M.WAMessage,
        contextInfo: { mentionedJid: [user] },
      });
    }
    const key = parsedArgs.joined.toLowerCase();
    if (key === "" || key === " ") return void null;
    const command =
      this.handler.commands.get(key) || this.handler.aliases.get(key);
    if (!command) return void null;
    const state = await this.client.DB.disabledcommands.findOne({
      command: command.config.command,
    });
    M.reply(
   `🎐 *Command:* ${this.client.utils.capitalize(command.name)}\n🎴 *Aliases:* ${
                    !command.config.aliases
                        ? ''
                        : command.config.aliases.map((alias) => this.client.utils.capitalize(alias)).join(', ')
                }\n🏮 *Category:* ${this.client.utils.capitalize(command.config.category)}\n⏰ *Cooldown:* ${
                    command.config.cooldown ?? 3
                }s\n💮 *Usage:* ${command.config.usage
                    .split('||')
                    .map((usage) => `${this.client.config.prefix}${usage.trim()}`)
                    .join(' | ')}\n🧧 *Description:* ${command.config.description}`
            )
        }
    }
}
