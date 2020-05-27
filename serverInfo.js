const {MessageEmbed} = require('discord.js');

const commands = {
    0: "server-info",
    1: "user-info"
}

const server = (message, cmd, args, bot) => {
    if (commands[cmd] === "server-info") {
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
            .setFooter('server info by willsbot')
        message.channel.send(embed)
    }

    else if (commands[cmd] === 'user-info') {
        if (!message.mentions.users.first()) {
            message.channel.send('We need someone to stalk dont we')
            return;
        }
        let user = message.mentions.users.first()
        let embed = new MessageEmbed()
            .setTitle(`Stalking ${user.tag}`)
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
            .setThumbnail(`${user.avatarURL()}`)
            .setColor(`DARK_PURPLE`)
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
}

module.exports = {
    server
}