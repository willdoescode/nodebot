const {Client, Discord, MessageAttachment, MessageEmbed} = require('discord.js');
const client = require('./login.json');
const color = require('./colors.json');
const help = require('./help.json');
const { fun } = require('./funcmds.js')
const serverInfo = require('./serverInfo.js')
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
        serverInfo.server(message, 0, args, bot)
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
        if (!message.mentions.users.first()) {
            message.channel.send('We need someone to stalk dont we')
            return;
        }
        let user = message.mentions.users.first()
        let embed = new MessageEmbed()
            .setTitle(`Stalking ${user.tag}`)
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
            .setThumbnail(`${user.avatarURL()}`)
            .setColor(`RED`)
            .addField(`Account created at:`, `${user.createdAt}`)
            .addField(`Is Bot:`, `${user.bot}`)
            .addField(`User Status:`, `${user.presence.status}`)
            .addField(`Last Message:`, `${user.lastMessage}`)
            .addField(`nickname:`, `${user.nickname}`)
            .addField(`User id:`, `${user.id}`)
            .setTimestamp()
            .setFooter("get stalked noob")
        message.channel.send(embed)
    }

    else if (cmd === `${client.prefix}yt`) {
        message.channel.send('https://www.youtube.com/channel/UC4H2xA_EqtWZKq3zSUxIyKw?view_as=subscriber')
    }

    else if (cmd === `${client.prefix}ban`) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send('Incorrect perms')
            return;
        }
        if (!message.mentions.members.first()) {
            message.channel.send('Please mention a user')
            return;
        }
        let user = message.mentions.members.first()
        let reason = args.slice(1).join(' ')
        if (!user.bannable) {
            message.channel.send(`${user} cannot be banned`)
            return;
        }
        if (!reason) {
            reason = "None"
        }

        user.ban(0, `${reason}`).then(() => {
            message.channel.send(`${user} has been banned for: ${reason}\nby: ${message.author.tag}`)
        }).catch(err => {
            console.error(err)
        })

    }

    else if (cmd === `${client.prefix}kick`) {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send('Incorrect perms')
            return;
        }
        if (!message.mentions.members.first()) {
            message.channel.send('Please mention a user')
            return;
        }
        let user = message.mentions.members.first()
        let reason = args.slice(1).join(' ')
        if (!user.kickable) {
            message.channel.send(`${user} cant be kicked`)
            return;
        }
        if (!reason) {
            reason = "None"
        }
        user.send(`you have been kick from ${message.guild} for ${reason}`)
        user.kick(0, `${reason}`).then(() => {
            message.channel.send(`${user} has been kicked for: ${reason}\nby: ${message.author.tag}`)
        }).catch(err => {
            console.error(err)
        })

    }

})



bot.login(client.token).then(r => {
    console.log(r)
}).catch(err => {
    console.error(err)
})