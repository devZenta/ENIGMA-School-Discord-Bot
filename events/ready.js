const { Events, PresenceUpdateStatus, ActivityType } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		
		console.log(`Bot is ready! Logged in as ${client.user.tag} (${client.user.id}) at ${new Date().toLocaleString()}`);

		client.user.setStatus(PresenceUpdateStatus.Online);

		const status = [
			'ENIGMA-School',
			'ENIGMA, l\'Ecole Supérieure des Sciences de l\'Informatique de Lille',
            'https://www.enigma-school.com',
            'Latest stable version: v0.0.4',
			'Created by zenta .',
        ];

		let index = 0;
        setInterval(() => {
            client.user.setActivity(status[index], { type: ActivityType.Playing });
            index = (index + 1) % status.length;
        }, 10000);
	},
};