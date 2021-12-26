const { Command } = require('sheweny')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class RandomServerCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'imagine',
			description: 'Send a random server from imagine.place',
			type: 'SLASH_COMMAND',
			category : 'Community',
		})
	}

	async execute(command) {
		await command.deferReply().catch(console.error)

		const { data } = await this.client.apiServer.get('/server')
		const preview = await this.client.rest.request('get', `/invites/${data.invite.replace('https://discord.gg/', '')}?with_counts=true`)

		const embed = new MessageEmbed()
			.setColor('#5865F2')
			.setTitle(`${preview.guild.name}`)
			.setDescription(`**Imagine a place [${data.imagine}](${data.invite})**${preview.guild.description ? '\n\n> ' + preview.guild.description : ''}`)
			.setThumbnail(`https://cdn.discordapp.com/icons/${preview.guild.id}/${preview.guild.icon}.${preview.guild.icon.startsWith('a_') ? 'gif' : 'png'}?size=80`)
			.setImage(`https://cdn.discordapp.com/banners/${preview.guild.id}/${preview.guild.banner}.${preview.guild.banner.startsWith('a_') ? 'gif' : 'png'}?size=480`)
			.addField(`Member count`, `${preview.approximate_member_count}`, true)
			.addField(`Online member`, `${preview.approximate_presence_count}`, true)

		const buttonJoinServer = new MessageButton()
			.setLabel(`Join ${preview.guild.name}`)
			.setStyle('LINK')
			.setURL(`${data.invite}`)
		
		const buttonVisitWebside = new MessageButton()
			.setLabel('Visit imagine.place')
			.setStyle('LINK')
			.setURL('https://imagine.place/')
		
		const row = new MessageActionRow().addComponents(buttonJoinServer, buttonVisitWebside)

		await command.editReply({ embeds: [embed], components: [row] }).catch(console.error)
	}
}
