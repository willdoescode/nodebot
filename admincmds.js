const commands = {
    0: "announce"
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
}