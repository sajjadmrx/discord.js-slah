const axios = require('axios')

const url = 'https://discord.com/api/v8';
const chalk = require('chalk')

const app_name = `${chalk.redBright('discord.js-slah')}`

class InteractionsClient {
    constructor(token, clientID) {
        if (!token)
            throw Error(`${app_name} | No token provided`)
        if (!clientID)
            throw Error(`${app_name} | No clientID provided`)

        this.token = token;
        this.clientID = clientID;
    };
    async getCommands(options = {}) {
        if (typeof options !== 'object')
            throw Error(`${app_name} | options must of type object. Received: ${typeof options}`);
        if (options.commandID && typeof options.commandID !== 'string')
            throw new Error(
                "commandID received but wasn't of type string. received: " +
                typeof options.commandID
            );
        if (options.guildID && typeof options.guildID !== "string")
            throw new Error(
                "guildID received but wasn't of type string. received: " +
                typeof options.guildID
            );
        let url = options.guildID ? `${url}/applications/${this.clientID}/${options.guildID}/commands`
            : `${url}/applications/${this.clientID}/commands`

        if (options.commandID) url += `/${options.commandID}`

        const result;
    }
}