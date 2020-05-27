const { MessageEmbed } = require('discord.js')

const commands = {
    0: "announce",
    1: "ban",
    2: "kick",
    3: "purge"
}

const adminCmds = (message, cmd, args, bot) => {
    if (commands[cmd] === 'announce') {
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
    else if (commands[cmd] === 'ban') {
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
            let embed = new MessageEmbed()
                .setColor(`RED`)
                .setThumbnail(`${bot.user.avatarURL()}`)
                .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
                .addField(`${user}`, `has been banned`)
                .addField(`reason:`, `${reason}`)
                .setTimestamp()
                .setFooter(`ban hammer brought to you by willsbot`)
            message.channel.send(embed).then(r => console.log(r))
        }).catch(err => {
            console.error(err)
        })
    }

    else if (commands[cmd] === 'kick') {
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
        if (!user.bot) {
            user.send(`you have been kick from ${message.guild} for ${reason}`)
        }
        user.kick(0, `${reason}`).then(() => {
            let embed = new MessageEmbed()
                .setColor(`RED`)
                .setThumbnail(`${bot.user.avatarURL()}`)
                .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
                .addField(`${user}`, `has been kicked`)
                .addField(`reason:`, `${reason}`)
                .setTimestamp()
                .setFooter(`kick hammer brought to you by willsbot`)
            message.channel.send(embed).then(r => console.log(r))
        }).catch(err => {
            console.error(err)
        })
    }

    else if (commands[cmd] === 'purge') {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            message.reply('improper perms')
            return;
        }
        if (isNaN(args[0])){
            message.reply('give me a number')
            return;
        }
        if (args[0] > 100 || args[0] < 1) {
            message.reply('toooo high')
            return;
        }
        message.channel.bulkDelete(args[0]).then(messages => {
            let embed = new MessageEmbed()
                .setThumbnail(`${bot.user.avatarURL()}`)
                .setColor("GREEN")
                .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
                .addField(`Target Amount to delete: ${args[0]}`, `Amount deleted: ${messages.size}`)
                .setTimestamp()
                .setFooter(`purge brought to you by wills bot`)
            message.channel.send(embed)
        })

    }
}

module.exports = {
    adminCmds
}
