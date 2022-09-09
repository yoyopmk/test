import { BaseCommand, Command, Message } from '../../Structures'

@Command('forfeit-quiz', {
    description: '',
    aliases: [],
    category: 'games',
    exp: 20,
    cooldown: 15,
    usage: 'forfeit-quiz'
})
export default class command extends BaseCommand {
    override execute = async (M: Message): Promise<void> => {
        const res = this.handler.quiz.quizResponse.get(M.from)
        if (!res) return void M.reply('no quiz to forfeit')
        const creator = this.handler.quiz.creator.get(M.from) || M.sender.jid
        if (creator !== M.sender.jid) return void M.reply('only the person who started this can forfeit')
        for (const key in this.handler.quiz) this.handler.quiz[key as 'quizResponse'].delete(M.from)
        return void M.reply('forfeitted')
    }
}
