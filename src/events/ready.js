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

		const apiServer = axios.create({
			baseURL: process.env.API_URL_SERVER,
			timeout: 1000,
		})
		
		apiServer.interceptors.response.use((response) => {
			return response
		}, (error) => {
			return Promise.reject(error)
		})

		this.client.apiServer = apiServer
	}
}
