const { Button } = require("sheweny")
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = class ButtonTest extends Button {
	constructor(client) {
		super(client, ["refresh"])
	}

	async execute(button) {
		if (button.message.interaction.user.id !== button.user.id) {
			button.reply({ content: `<@${button.user.id}>, this is not your interaction. Use the command to display a server.`, ephemeral: true })
			return
		}

		const { data } = await this.client.apiServer.get('/server')
		const preview = await this.client.rest.request('get', `/invites/${data.invite.replace('https://discord.gg/', '')}?with_counts=true`)

		const embed = new MessageEmbed()
			.setColor('#5865F2')
			.setTitle(`${preview.guild.name}`)
			.setDescription(`**Imagine a place [${data.imagine}](${data.invite})**${preview.guild.description ? '\n\n> ' + preview.guild.description : ''}`)
			.setThumbnail(`https://cdn.discordapp.com/icons/${preview.guild.id}/${preview.guild.icon}.${preview.guild.icon.startsWith('a_') ? 'gif' : 'png'}?size=80`)
			.addField(`Member count`, `${preview.approximate_member_count}`, true)
			.addField(`Online member`, `${preview.approximate_presence_count}`, true)
			
		if (preview?.guild?.banner) {
			embed.setImage(`https://cdn.discordapp.com/banners/${preview.guild.id}/${preview.guild.banner}.${preview.guild.banner.startsWith('a_') ? 'gif' : 'png'}?size=480`)
		}

		const buttonJoinServer = new MessageButton()
			.setLabel(`Join ${preview.guild.name}`)
			.setStyle('LINK')
			.setURL(`${data.invite}`)

		const buttonRefresh = new MessageButton()
			.setLabel(`Refresh`)
			.setCustomId('refresh')
			.setStyle('PRIMARY')

		const buttonVisitWebside = new MessageButton()
			.setLabel('Visit imagine.place')
			.setStyle('LINK')
			.setURL('https://imagine.place/')

		const rowUpdate = new MessageActionRow().addComponents(buttonJoinServer, buttonRefresh, buttonVisitWebside)
		button.update({ embeds: [embed], components: [rowUpdate] })
	}
}
