const { Event } = require("sheweny") 

module.exports = class guildDeleteEvent extends Event {
	constructor(client) {
		super(client, "guildDelete", {
			description: "Emitted whenever a guild kicks the client or the guild is deleted/left."
		})
	}

	execute() {
		this.client.user.setActivity({
			name: `${this.client.guilds.cache.size} servers`,
			type: `WATCHING`
		})
	}
}
