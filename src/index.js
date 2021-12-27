const { ShewenyClient } = require('sheweny')
require('dotenv').config()

const client = new ShewenyClient({
	intents: [],
	partials: [],
	admins: [process.env.BOT_DISCORD_ADMIN],
	mode : process.env.BOT_DISCORD_SHEWENY_MODE,
	handlers: {
		commands: {
			directory: './commands',
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
client.handlers.commands?.on('userMissingPermissions', (interaction, missing) => {
	interaction.reply({
		content: `You don't have the permission to use this command. (${missing} permission)`,
		ephemeral: true
	})
})
