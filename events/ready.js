const { Events, PresenceUpdateStatus, ActivityType } = require('discord.js');

require('dotenv').config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        function checkOperatingHours() {
            const currentHour = new Date().getHours();
            if (currentHour < 16 || currentHour >= 20) {
                console.log('Bot is outside of operating hours and will shut down.');
                client.destroy();
            } else if (!client.isReady()) {
                console.log('Bot is within operating hours and will start.');
				client.login(process.env.TOKEN); 
            }
        }

        setInterval(checkOperatingHours, 60000);

        checkOperatingHours();

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