const { Telegraf } = require('telegraf')

const bot = new Telegraf(process.env.WONDERLAND_BOT_TOKEN)

bot.start(ctx => ctx.reply('Welcome to Wonderland utility bot. When in doubt, use /help'))

const commands = []

function addCommand(command, callback) {
    commands.push(command)

    bot.command(command, ctx => {
        const text = ctx.message.text
        const arguments = text.replace(command + ' ', '').split(' ')

        callback(ctx, arguments)
    })
}

addCommand('/xpto', (ctx, arguments) => {
    console.log(arguments)
    console.log(ctx)
})

addCommand('/addaccount', (ctx, arguments) => {
    if (arguments.length != 1) {
        ctx.reply('Usage: /addaccount ACCOUNT')
    } else {
        const account = arguments[0]
        ctx.reply(`Added account ${account}`)
    }
})

addCommand('/help', (ctx) => {
    ctx.reply('Registered commands ' + commands.join(', '))
})

bot.launch()