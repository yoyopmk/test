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
            let text = `(⁠◍⁠•⁠ᴗ⁠•⁠◍⁠)⁠❤ konnichiwa 👋🏻 @${M.sender.jid.split('@')[0]} I'm Zeshro.
            
📫My prefix: ${this.client.config.prefix}         
                
            
*━━━━━『•Fun•』━━━━━*

🔰friendship
🀄Discription: Calculates the level of a friendship
🧧Usage:- ${this.client.config.prefix}frendship

🔰reaction
🀄Discription: React via anime gifs with the tagged or quoted user
🧧Usage:- ${this.client.config.prefix}reaction

🔰ship
🀄Discription: Ship People ❤️
🧧Usage:- ${this.client.config.prefix}ship 

🔰simp
🀄Discription: Makes a person simp
🧧Usage:- ${this.client.config.prefix}simp

🔰triggered
🀄Discription: Makes a triggered gif of the tagged/quoted user or the provided/quoted image
🧧Usage:- ${this.client.config.prefix}triggered

*━━━━━『•General•』━━━━━*

🔰help
🀄Discription: Displays the bot's usable commands
🧧Usage:- ${this.client.config.prefix}help

🔰hi
🀄Discription: Says hello to the bot
🧧Usage:- ${this.client.config.prefix}hi

🔰info
🀄Discription: Displays bot's info
🧧Usage:- ${this.client.config.prefix}info

🔰mods
🀄Discription: Displays the bot's moderators
🧧Usage:- ${this.client.config.prefix}mods

🔰profile
🀄Discription: Displays user's profile
🧧Usage:- ${this.client.config.prefix}profile
 
🔰rank
🀄Discription: Displays user's rank
🧧Usage:- ${this.client.config.prefix}rank

*━━━━━『•Media•』━━━━━*

🔰lyrics 
🀄Discription: Sends the lyrics of a given song
🧧Usage:- ${this.client.config.prefix}lyrics

🔰play
🀄Discription: Plays a song of the given term from YouTube
🧧Usage:- ${this.client.config.prefix}play

🔰Spotify
🀄Discription: Downloads and sends the track of thr given spotify track URL
🧧Usage:- ${this.client.config.prefix}Spotify

🔰yta
🀄Discription: Downloads and sends the video as an audio of the provided YouTube video link
🧧Usage:- ${this.client.config.prefix}yta

🔰yts
🀄Discription: Searches the video of the given query in YouTube
🧧Usage:- ${this.client.config.prefix}yts

🔰ytv
🀄Discription: Downloads and sends the video of the provided YouTube video link
🧧Usage:- ${this.client.config.prefix}ytv

*━━━━━『•Moderation•』━━━━━*

💮${this.client.config.prefix}ping
💮${this.client.config.prefix}set

*━━━━━『•Utils•』━━━━━*

🔰prettire
🀄Discription: Runs prettier of the given code
🧧Usage:- ${this.client.config.prefix}prettire

🔰react
🀄Discription: Reacts a message with the given emoji
🧧Usage:- ${this.client.config.prefix}react

🔰retrieve
🀄Discription: Retrieves view once message
🧧Usage:- ${this.client.config.prefix}retrieve

🔰sticker
🀄Discription: Converts image/video/gif to sticker
🧧Usage:- ${this.client.config.prefix}sticker 

*━━━━━『•Weeb•』━━━━━*

⌬ ${this.client.config.prefix}anime
⌬ ${this.client.config.prefix}character
⌬ ${this.client.config.prefix}kitsune
⌬ ${this.client.config.prefix}manga
⌬ ${this.client.config.prefix}neko
⌬ ${this.client.config.prefix}waifu


📕 Note: Use ${this.client.config.prefix}help <command_name> for more info of a specific command. Example: ${this.client.config.prefix}help hello
`
await M.reply(text)
            
        }
    }
}
