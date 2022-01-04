const { Event } = require("sheweny")
const axios = require('axios')

module.exports = class ReadyEvent extends Event {
	constructor(client) {
		super(client, "ready", {
			description: "Client is logged in",
			once: true,
		})
	}

	execute() {
		console.log(`${this.client.user.tag} is logged in`)

		this.client.user.setActivity({
			name: `${this.client.guilds.cache.size} servers`,
			type: `WATCHING`
		})

		const apiServer = axios.create({
			baseURL: process.env.API_URL_SERVER,
			timeout: 1000,
		})
		
		apiServer.interceptors.response.use((response) => {
			return response
		}, (error) => {
			return Promise.reject(error)
		})

		apiServer.interceptors.request.use((config) => {
			config.headers['User-Agent'] = process.env.API_USER_AGENT
			return config
		}, (error) => {
			return Promise.reject(error)
		})

		this.client.apiServer = apiServer
	}
}
