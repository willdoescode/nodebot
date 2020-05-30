const { Client } = require('discord.js');
const { token, prefix } = require('./login.json');
const { fun } = require('./funcmds.js')
const { server } = require('./serverInfo.js')
const { helpCmds } = require('./help.js')
const { ad } = require('./advertise.js')
const { adminCmds } = require('./admincmds.js')

const bot = new Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    await bot.user.setActivity('70s rock music', { type: "STREAMING", url: "https://www.youtube.com/watch?v=7JhkftWpw6Y" })
    await bot.generateInvite(["ADMINISTRATOR"]).then(r => console.log(r)).catch(err => console.error(err))
})

bot.on('message', async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}hello`) {
        fun(message, 0, args, bot)
    }

    else if (cmd === `${prefix}embed`) {
        fun(message, 1, args, bot)
    }

    else if (cmd === `${prefix}hmu`) {
        fun(message, 2, args, bot)
    }

    else if (cmd === `${prefix}fortune`) {
        fun(message, 3, args, bot)
    }

    else if (cmd === `${prefix}scary`) {
        fun(message, 4, args, bot)
    }

    else if (cmd === `${prefix}kill`) {
        fun(message, 5, args, bot)
    }

    else if (cmd === `${prefix}test`) {
        fun(message, 6, args, bot)
    }

})

bot.on('message', async message => {
    if (message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}ban`) {
        adminCmds(message, 1, args, bot)
    }

    else if (cmd === `${prefix}kick`) {
        adminCmds(message, 2, args, bot)
    }

    else if (cmd === `${prefix}purge`) {
        adminCmds(message, 3, args, bot)
    }

    else if (cmd === `${prefix}announce`) {
        adminCmds(message, 0, args, bot)
    }
})



bot.on('message', async message => {

    if (message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}server-info`) {
        server(message, 0, args, bot)
    }

    else if (cmd === `${prefix}user-info`) {
        server(message, 1, args, bot)
    }

    else if (cmd === `${prefix}help`) {
        helpCmds(message, bot)
    }

    else if (cmd === `${prefix}src`) {
        ad(message, 1, bot)
    }

    else if (cmd === `${prefix}yt`) {
        ad(message, 0, bot)
    }
})

bot.login(token).then(r => {
    if (r === `${token}`) {
        console.log('All good')
    }
}).catch(err => {
    console.error(err)
})