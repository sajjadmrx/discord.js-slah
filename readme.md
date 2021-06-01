# discord.js-slash

A Node.js Discord API for Slash commands

Example-> get All command:

```js
const slashCommndjs = require('discord.js-slah')

const slash = new slashCommndjs.InteractionsClient(process.env.TOKEN, process.env.BOTID)


const allCommands = await slash.getCommands() //returns Array
console.log(allCommands) /// output => [{}]
```
Example -> create a command
```js
const slashCommndjs = require('discord.js-slah')

const slash = new slashCommndjs.InteractionsClient(process.env.TOKEN, process.env.BOTID)

 // optional
client.slshCommands = new Discord.Collection();

const allCommands = await slash.getCommands()

const commands = [{name:'ping',description:'test the bots response time XD'},{name:'test',description:'test test test'}]

   

 commands.forEach((command)=>{
            const result = allSlashCommands.find(cmd => cmd.name == command.name)
            if (!result)
                await slash.createCommand({ name: command.name, description: command.description })
            
            // optional
            client.slshCommands.set(command.name, commands);

         })

```


Example-> convert to Message:
```js
const slashCommndjs = require('discord.js-slah')
    client.ws.on('INTERACTION_CREATE', async interaction => {
        // do stuff and respond here

        const message = new slashCommndjs.convertToMessage(client, interaction).handel()
        //before  > interaction.data.name 
        //after > message.content
        
        // reply with interaction
         client.api.interactions(interaction.id,interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: 'Hello World !'
                    }
                }
            })
           //reply with message
        if (message.content=='ping')
            message.reply('pong !')
        
    })

```