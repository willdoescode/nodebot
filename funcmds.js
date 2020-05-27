const {MessageEmbed} = require('discord.js')

const commands = {
    0: "hello",
    1: "embed",
    2: "hmu"
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

    else if (commands[cmd] === 'hmu') {
        message.author.send(`I have hit you up noob`)
        const embed = new MessageEmbed()
            .setImage(`${message.author.avatarURL()}`)
            .setTitle(`Hit ${message.author.tag} up`)
            .setColor('DARK_RED')

        message.channel.send(embed)
    }
}

module.exports = {
    fun
}