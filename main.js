const {Client, Discord, MessageAttachment, MessageEmbed} = require('discord.js');
const client = require('./login.json');
const { fun } = require('./funcmds.js')
const { server } = require('./serverInfo.js')
const { helpCmds } = require('./help.js')
const { ad } = require('./advertise.js')
const { adminCmds } = require('./admincmds')
const bot = new Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    await bot.user.setActivity('Hello', {type: "STREAMING", url: "https://www.youtube.com/watch?v=7JhkftWpw6Y"})
    await bot.generateInvite(["ADMINISTRATOR"]).then(r => console.log(r)).catch(err => console.error(err))

})


bot.on('message', async message => {

    if (message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${client.prefix}hello`) {
        fun(message, 0, args)

    } else if (cmd === `${client.prefix}embed`) {
        fun(message, 1, args)

    } else if (cmd === `${client.prefix}server-info`) {
        server(message, 0, args, bot)
    }

    else if (cmd === `${client.prefix}help`) {
        helpCmds(message, bot)
    }

    else if (cmd === `${client.prefix}src`) {
        ad(message, 1, bot)
    }


    else if (cmd === `${client.prefix}hmu`) {
        fun(message, 2, args)
    }

    else if (cmd === `${client.prefix}announce`) {
        adminCmds(message, 0, args, bot)
    }

    else if (cmd === `${client.prefix}user-info`) {
        server(message, 1, args, bot)
    }

    else if (cmd === `${client.prefix}yt`) {
        ad(message, 0, bot)
    }

    else if (cmd === `${client.prefix}ban`) {
        adminCmds(message, 1, args, bot)
    }

    else if (cmd === `${client.prefix}kick`) {
        adminCmds(message, 2, args, bot)
    }

    else if (cmd === `${client.prefix}purge`) {
        adminCmds(message, 3, args, bot)
    }

})



bot.login(client.token).then(r => {
    console.log(r)
}).catch(err => {
    console.error(err)
})