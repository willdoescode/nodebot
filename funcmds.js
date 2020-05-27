const {MessageEmbed} = require('discord.js')

const commands = {
    0: "hello",
    1: "embed"
}

const fun = (message, cmd, args) => {
    if (commands[cmd] === "hello") {
        message.reply('hi')
    }

    else if (commands[cmd] === "embed") {
        let embed = new MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`@${message.author.tag}'s embed`, `${message.author.avatarURL()}`)
            .setDescription(args.join(' '))
            .setTimestamp()
            .setFooter(`embed created by willsbot`)
        message.channel.send(embed)
    }
}

module.exports = {
    fun
}