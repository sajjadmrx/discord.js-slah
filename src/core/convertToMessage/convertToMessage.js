
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
        let message = {};
        message.author = this.client.users.cache.find(us => us.id == this.interaction.member.id)
        message.guild = this.client.guilds.cache.find(gu => gu.id == this.interactions.guild_id)
        message.channel = this.client.channels.cache.find(ch => ch.id == this.interactions.channel_id)
        message.interaction_id = this.interactions.id;
        message.member = this.interactions.member;
        message.interaction = this.interactions
        return message
    }



}

module.exports = convert