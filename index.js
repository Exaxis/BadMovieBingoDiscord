const Discord = require('discord.js');

// Make a discord client, which is our bot.
const client = new Discord.Client();

// Declare the prefix this bot will use to recognize commands.
const prefix = '!';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Bad Movie Bingo Bot is online.');
});

// Register an event handler to check message contents
client.on('message', message => {
    // If the message started with the prefix, and wasn't invoked by our bot, let's pay attention to it.
    if(!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    // Splice command arguments based on spaces
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // More abstract way of fetching commands
    if(client.commands.has(command)){
        client.commands.get(command).execute(message, args);
    }

    // More rigid and verbiose way of fetching commands
    //if(command === 'ping'){
    //    client.commands.get('ping').execute(message, args);
    //}
})

// Have the bot login to discord to be online.
// KEEP AT END OF FILE
client.login(process.env.token);

// To run, in the command promot: node main.js or node .
