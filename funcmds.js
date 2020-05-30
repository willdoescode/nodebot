const { MessageEmbed } = require('discord.js')
const https = require('https')
const fs = require('fs')
const { createCanvas, loadImage } = require('canvas')
const fortunes = require('./fortunes.json')

const commands = {
    0: "hello",
    1: "embed",
    2: "hmu",
    3: "fortune",
    4: "scary",
    5: "kill",
    6: "test"
}

const scaryImages = {
    0: "./scary1.jpg",
    1: "./scary2.jpg",
    2: "./scary3.jpg",
    3: "./scarywill.jpg"
}

const fun = (message, cmd, args, bot) => {
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

    else if (commands[cmd] === 'fortune') {
        let num = Math.ceil(Math.random() * 4)
        let embed = new MessageEmbed()
            .setAuthor(`${message.author.tag}`, `${message.author.avatarURL()}`)
            .setThumbnail(`${bot.user.avatarURL()}`)
            .setColor('PURPLE')
            .addField(`Question:`, `${args.join(' ')}`)
            .addField(`Answer:`, `${fortunes[num]}`)
            .setTimestamp()
            .setFooter(`Magic 8ball brought to you by willsbot`)
        message.channel.send(embed)
    }

    else if (commands[cmd] === 'scary') {
        let num = Math.floor(Math.random() * 4)
        let image = scaryImages[num]
        message.channel.send('Hello There', { files: [`${image}`] }).then(msg => {
            msg.delete({ timeout: 1500 }).then(r => {
                let i = r
                message.delete()
            })
        })
    }

    else if (commands[cmd] === 'kill') {
        if (!message.mentions.members.first()) {
            message.reply('I need someone to kill')
            return;
        }
        let user = message.mentions.members.first()
        message.channel.send(`Will fell on ${user} and killed them`, { files: ['./dyingwill.jpg'] })
    }

    else if (commands[cmd] === 'test') {
        const canvas = createCanvas(200, 200)
        const ctx = canvas.getContext('2d')
        if (!message.attachments) {
            message.reply('I need a image to use')
            return;
        }
        message.attachments.forEach(a => {
            if (a.url.endsWith('.png') || a.url.endsWith('.jpg')) {
                const unlink = () => {
                    fs.unlinkSync(`${a.name}`)
                }
                let file = fs.createWriteStream(`${a.name}`)
                const request = https.get(`${a.url}`, res => {
                    res.pipe(file)
                })
                setTimeout(unlink, 5000)
            }
            else {
                message.reply('invalid file type')
            }


        })
    }
}

module.exports = {
    fun
}