const {MessageEmbed} = require('discord.js');

const commands = {
    0: "server-info"
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
}

module.exports = {
    server
}