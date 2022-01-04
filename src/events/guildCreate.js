const { Event } = require("sheweny") 

module.exports = class guildCreateEvent extends Event {
	constructor(client) {
		super(client, "guildCreate", {
			description: "Emitted whenever the client joins a guild."
		})
	}

	execute() {
		this.client.user.setActivity({
			name: `${this.client.guilds.cache.size} servers`,
			type: `WATCHING`
		})
	}
}
