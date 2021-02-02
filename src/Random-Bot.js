const Discord = require('discord.js')

const Bot = new Discord.Client()
const Client = new Discord.Client()

function getRandomChannel() {
    let channels = Client.channels.array()
    return channels[Math.floor(Math.random() * channels.length)]
}

const getRandomMessage = async(channel) => {
    if (channel == null || channel == undefined){
        return
    }
    
    if(!channel.id) {
        console.log(channel)
    }

    try {
        let messages = await channel.fetchMessages({limit: 10})
        let arr = messages.array()
        return arr[Math.floor(Math.random() * arr.length)]
    }catch(error) {
        
    }
    
}

const getMessagesFromChannel = async(channel) => {
    if (channel == null || channel == undefined) {
        return
    }
    try {
        let messages = await channel.fetchMessages({limit: 100})
        return messages
    }catch(error) {
        return []
    }
}

const returnRandomMessage = async() => {
    let channel = getRandomChannel()
    let message = await getRandomMessage(channel)
    return message
}

Client.once('ready', async () => {
    console.log('client is ready')
})

Bot.once('ready', async () => {
    console.log('bot is ready')
})

Bot.on('message',async(message) => {
    if (message.author.bot) return
    let args = message.content.split(' ')
    while (true) {
        let randomMessage = await returnRandomMessage()
        if (randomMessage == null || randomMessage == undefined || randomMessage.content == undefined || randomMessage.content == "" || randomMessage.content == " ") {
            continue
        }
        message.reply(`${randomMessage.content}`)
        break
    }
    /*while (true) {
        let word = args.length > 0 ? args[Math.floor(Math.random() * args.length)] : message.content
        let randomChannel = getRandomChannel()
        let messages = await getMessagesFromChannel(randomChannel)
        let msg = messages.find(m => m.content.includes(word))
        if (!msg) {
            continue
        }
        return message.reply(msg.content)
        for (let i = 0; i < messages.length; i++) {
            let m = messages[i]
            if (m == undefined || m == null || m.content == undefined || m.content == '' || m.content == ' ' || !m.content.includes(word)) {
                continue
            }
            return message.reply(m.content)
        }
    }*/
})

Client.login('clien ttoken')
Bot.login('bot token')
