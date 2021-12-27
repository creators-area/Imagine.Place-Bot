const { ShewenyClient } = require('sheweny')
require('dotenv').config()

const client = new ShewenyClient({
	intents: ['GUILDS'],
	partials: [],
	admins: [process.env.BOT_DISCORD_ADMIN],
	mode : process.env.BOT_DISCORD_SHEWENY_MODE,
	managers: {
		commands: {
			directory: './commands',
			autoRegisterApplicationCommands: true,
		},
		events: {
			directory: './events',
		},
		buttons: {
			directory: './interactions/buttons'
		}
	},
})

client.login(process.env.BOT_DISCORD_TOKEN)
