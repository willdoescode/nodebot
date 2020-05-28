const { MessageEmbed } = require('discord.js')

const commands = {
    0: "yt",
    1: "src"
}

const ad = (message, cmd, bot) => {
    if (commands[cmd] === "yt") {
        let embed = new MessageEmbed()
            .setTitle(`Follow our youtube channel`)
            .setColor("DARK_ORANGE")
            .setDescription(`https://www.youtube.com/channel/UC4H2xA_EqtWZKq3zSUxIyKw?view_as=subscriber`)
            .setThumbnail(`${bot.user.avatarURL()}`)
            .setTimestamp()
            .setFooter(`Make sure to subscribe`, `${message.author.avatarURL()}`)
        message.channel.send(embed)
    }
    else if (commands[cmd] === "src") {
        let embed = new MessageEmbed()
            .setTitle(`Check out my github`)
            .setColor("DARK_ORANGE")
            .setDescription(`https://github.com/pietales/nodebot`)
            .setThumbnail(`${bot.user.avatarURL()}`)
            .setTimestamp()
            .setFooter(`DM me with code bugs`, `${message.author.avatarURL()}`)
        message.channel.send(embed)
    }
}

module.exports = {
    ad
}