const help = require('./help.json');
const { MessageEmbed } = require('discord.js');

const helpCmds = (message, bot) => {
    let embed = new MessageEmbed()
        .setColor("AQUA")
        .setAuthor("Help Has Arrived", `${message.author.avatarURL()}`)
        .setThumbnail(`${bot.user.avatarURL()}`)
        .setTimestamp()
        .setFooter('Help command by willsbot')
    for (let commands in help) {
        embed.addField(`${commands}`, `${help[commands]}`);
    }
    message.channel.send(embed);
}

module.exports = {
    helpCmds
}