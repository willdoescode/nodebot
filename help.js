const help = require('./help.json');
const { MessageEmbed } = require('discord.js');

const helpCmds = (message, bot) => {
    let embed = new MessageEmbed()
        .setTitle('Help has arrived')
        .setColor("AQUA")
        .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
        .setThumbnail(`${bot.user.avatarURL()}`)
        .setTimestamp()
        .setFooter('Help command by willsbot')
    for (let cmds in help) {
        embed.addField(`${cmds}`, `${help[cmds]}`);
    }
    message.channel.send(embed);
}

module.exports = {
    helpCmds
}