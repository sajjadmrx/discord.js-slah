const axios = require('axios').default

const api_url = 'https://discord.com/api/v8';
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
        try {
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
            let url = options.guildID ?
                `${api_url}/applications/${this.clientID}/${options.guildID}/commands`
                : `${api_url}/applications/${this.clientID}/commands`

            if (options.commandID) url += `/${options.commandID}`

            const result = await axios.get(url, {
                headers: { Authorization: `Bot ${this.token}` }
            })

            return result.data
        } catch (error) {
            return error
        }
    };
    async createCommand(options, guildID = null) {
        try {
            if (typeof options !== 'object')
                throw Error(`${app_name} | options must of type object. Received: ${typeof options}`);
            if (!options.name || !options.description)
                throw new Error("options is missing name or description property!");
            let url = guildID ?
                `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands` :
                `${api_url}/applications/${this.clientID}/commands`;
            const res = await axios.post(url, options, {
                headers: { Authorization: `Bot ${this.token}` },
            })

            return res.data
        } catch (error) {
            return error;
        }
    }
    async editCommand(options = { name: null, description: null }, commandID, guildID = null) {
        try {
            if (typeof options !== 'object')
                throw new Error(`${app_name} | options must of type object. Received: ${typeof options}`);
            if (typeof commandID !== 'string')
                throw new Error("commandID must be of type string. Received: " + typeof commandID);
            if (!options.name || !options.description)
                throw new Error("options is missing name or description property!");
            if (guildID && typeof guildID !== "string")
                throw new Error(
                    "guildID received but wasn't of type string. received: " +
                    typeof guildID
                );
            let url = guildID ?
                `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}` :
                `${api_url}/applications/${this.clientID}/commands/${commandID}`;
            const res = await axios.patch(url, options, {
                headers: { Authorization: `Bot ${this.token}` },
            })

            return res.data
        } catch (error) {
            return error;
        }

    }
    async deleteCommand(commandID, guildID) {
        try {
            if (typeof commandID !== 'string')
                throw Error(`${app_name} | commandID must of type string. Received: ${typeof options}`);
            const url = guildID ?
                `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}` :
                `${api_url}/applications/${this.clientID}/commands/${commandID}`;
            const res = axios.delete(url, {
                headers: { Authorization: `Bot ${this.token}` },
            })
            return res.data || true
        } catch (error) {
            console.log(error);
        }
    }
    async getCommandPermissions(commandID, guildID) {
        try {
            if (typeof guildID !== "string")
                throw new Error(
                    "guildID must be of type string. Received: " +
                    typeof guildID
                );
            if (commandID && typeof commandID !== "string")
                throw new Error(
                    "commandID received but wasn't of type string. received: " +
                    typeof commandID
                );

            const url = commandID
                ? `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`
                : `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands/permissions`;

            const res = await axios.get(url, {
                headers: { Authorization: `Bot ${this.token}` }
            });

            return res.data;
        } catch (error) {
            return error
        }
    }
    async editCommandPermissions(permissions, guildID, commandID) {
        try {
            if (!Array.isArray(permissions))
                throw new Error("permissions must be of type array. Received: " + typeof permissions);
            if (typeof guildID !== "string")
                throw new Error(
                    "guildID must be of type string. Received: " +
                    typeof guildID
                );
            if (typeof commandID !== "string")
                throw new Error(
                    "commandID must be of type string. Received: " +
                    typeof commandID
                );

            const url = `${api_url}/applications/${this.clientID}/guilds/${guildID}/commands/${commandID}/permissions`;

            const res = await axios.put(url, { permissions: permissions }, {
                headers: { Authorization: `Bot ${this.token}` }
            });

            return res.data;
        } catch (error) {
            return error
        }
    }
}

module.exports = InteractionsClient