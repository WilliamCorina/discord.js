'use strict';

class GuildMember {
	constructor(guild, data) {
		this.client = guild.client;
		this.guild = guild;
		this.user = {};
		this._roles = [];
		if (data) {
			this.setup(data);
		}
	}

	setup(data) {
		this.user = data.user;
		this.serverDeaf = data.deaf;
		this.serverMute = data.mute;
		this.selfMute = data.self_mute;
		this.selfDeaf = data.self_deaf;
		this.voiceSessionID = data.session_id;
		this.voiceChannelID = data.channel_id;
		this.joinDate = new Date(data.joined_at);
		this._roles = data.roles;
	}

	get roles() {
		let list = [];
		let everyoneRole = this.guild.store.get('roles', this.guild.id);

		if (everyoneRole) {
			list.push(everyoneRole);
		}

		for (let roleID of this._roles) {
			let role = this.guild.store.get('roles', roleID);
			if (role) {
				list.push(role);
			}
		}

		return list;
	}

	get mute() {
		return this.selfMute || this.serverMute;
	}

	get deaf() {
		return this.selfDeaf || this.serverDeaf;
	}

	get voiceChannel() {
		return this.guild.store.get('channels', this.voiceChannelID);
	}

	get id() {
		return this.user.id;
	}
}

module.exports = GuildMember;
