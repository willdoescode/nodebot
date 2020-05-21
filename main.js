const {Client, Discord, MessageAttachment, MessageEmbed} = require('discord.js');
const client = require('./login.json');
const color = require('./colors.json');
const bot = new Client();
const help = require('./help.json');



bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);
    await bot.user.setActivity('Hello', {type: "STREAMING", url: "https://www.youtube.com/watch?v=7JhkftWpw6Y"})
    await bot.generateInvite(["ADMINISTRATOR"]).then(r => console.log(r)).catch(err => console.error(err))

})


bot.on('message', message => {

    if (message.author.bot || message.channel.type === "dm") return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${client.prefix}hello`) {
        message.reply('Hi');
    }

    else if (cmd === `${client.prefix}embed`) {
        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`@${message.author.tag}'s embed`)
            .setDescription(args.join(' '))
        message.channel.send(embed)
    }

    else if (cmd === `${client.prefix}server-info`) {
        let embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle("Server Info")
            .setImage(`${bot.user.avatarURL()}`)
            .setAuthor(`${message.guild.name} Info`, `${message.guild.iconURL()}`)
            .addField("**Server Name:**", `${message.guild.name}`, true)
            .addField("**Server Owner:**", `${message.guild.owner}`, true)
            .addField("**Member Count:**", `${message.guild.memberCount}`, true)
            .addField("**Server Creation:**", `${message.guild.createdAt}`)
            .setTimestamp()
            .setFooter('Nice')
        message.channel.send(embed)
    }

    else if (cmd === `${client.prefix}help`) {
        let embed = new MessageEmbed()
            .setAuthor("Help Has Arrived", `${message.author.avatarURL()}`)
            .setThumbnail(`${bot.user.avatarURL()}`)
        for (let commands in help) {
            embed.addField(`${commands}`, `${help[commands]}`);
        }
        message.channel.send(embed);
    }

    else if (cmd === `${client.prefix}ip`) {
        message.channel.send('Cehmemes.minehut.gg')
    }

    else if (cmd === `${client.prefix}prefix` && message.member.hasPermission("ADMINISTRATOR")) {
        client.prefix = args;
        message.channel.send(`${client.prefix} is your new prefix`)
    }

    else if(cmd === `${client.prefix}hmu`) {
        message.author.send(`I have hit you up noob`)
        const embed = new MessageEmbed()
            .setImage(`${message.author.avatarURL()}`)
            .setTitle(`Hit ${message.author.tag} up`)
            .setColor('DARK_RED')

        message.channel.send(embed)
    }

    else if (cmd === `${client.prefix}announce`) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.send('Improper permissions')
            return;
        }
        if (!args) {
            message.channel.send('You got a message?')
            return;
        }
        let channel = message.mentions.channels.first()
        if (!channel) {
            message.channel.send('Give me a channel to send it to')
            return;
        }
        let announcement = args.slice(1)
        if (announcement === " ") {
            message.channel.send('Give me an announcement')
            return;
        }
        channel.send(`@everyone\n${message.author.tag}: ${announcement.join(' ')}`)
    }

    else if(cmd === `${client.prefix}user-info`) {
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

        user.kick(0, `${reason}`).then(() => {
            message.channel.send(`${user} has been kicked for: ${reason}\nby: ${message.author.tag}`)
        }).catch(err => {
            console.error(err)
        })

    }


})



bot.login(client.token).then(r => r);