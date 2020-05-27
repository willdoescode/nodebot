const commands = {
    0: "yt",
    1: "src"
}

const ad = (message, cmd, bot) => {
    if (commands[cmd] === "yt") {
        message.channel.send('https://www.youtube.com/channel/UC4H2xA_EqtWZKq3zSUxIyKw')
    }
    else if (commands[cmd] === "src") {
        message.channel.send('https://github.com/pietales/nodebot')
    }
}

module.exports = {
    ad
}