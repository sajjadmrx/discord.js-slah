
class convert {


    constructor(client, interaction) {
        if (typeof client !== 'object')
            throw new Error(`options must of type object. Received: ${typeof client}`);
        if (!client.user)
            throw new Error("client is missing user property!");
        if (typeof interaction !== 'object')
            throw new Error(`interaction must of type object. Received: ${typeof client}`);
        this.client = client;
        this.interaction = interaction;

    }


    handel() {
        try {
            let message = {};
            message.author = this.client.users.cache.find(us => us.id == this.interaction.member.user.id)
            message.guild = this.client.guilds.cache.find(gu => gu.id == this.interaction.guild_id)
            message.channel = this.client.channels.cache.find(ch => ch.id == this.interaction.channel_id)
            message.interaction_id = this.interaction.id;

            message.member = message.guild.members.cache.find(us => us.id == this.interaction.member.user.id)
            message.content = this.interaction.data?.name || null
            message.interaction = this.interaction
            message.reply = (item) => {


                if (typeof item == 'object') {
                    if (item.embed) {
                        this.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    // content: text
                                    embeds: [item.embed]
                                }
                            }
                        })
                    }
                    else {
                        this.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
                            data: {
                                type: 4,
                                data: {
                                    // content: text
                                    embeds: [item]
                                }
                            }
                        })
                    }
                }
                else if (typeof item == 'string') {
                    this.client.api.interactions(message.interaction.id, message.interaction.token).callback.post({
                        data: {
                            type: 4,
                            data: {
                                content: item
                            }
                        }
                    })
                }
                else
                    throw Error("oops, Not currently supported")
            }
            return message
        } catch (error) {
            throw new Error(error)
        }
    }



}

module.exports = convert