const { Events, PresenceUpdateStatus, ActivityType } = require('discord.js');
require('dotenv').config();

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        
        console.log(`Bot is ready! Logged in as ${client.user.tag} (${client.user.id}) at ${new Date().toLocaleString()}`);
        
        const isProdEnvironment = process.env.NODE_ENV === 'production';
        const environment = isProdEnvironment ? 'PRODUCTION' : 'DEVELOPMENT';
        
        console.log(`Detected environment: ${environment} (NODE_ENV=${process.env.NODE_ENV || 'not defined'})`);

        client.user.setStatus(isProdEnvironment ? PresenceUpdateStatus.Online : PresenceUpdateStatus.DoNotDisturb);

        const statusProd = [
            'ENIGMA-School',
            'ENIGMA, l\'Ecole Supérieure des Sciences de l\'Informatique de Lille',
            'https://www.enigma-school.com',
            'Latest stable version: v0.0.4',
            'Created by zenta .',
        ];
        
        const statusDev = [
            '[DEV] Testing environment',
            '[DEV] Version: v0.0.4-dev',
            '[DEV] Active development mode',
        ];
        
        const status = isProdEnvironment ? statusProd : statusDev;

        let index = 0;
        setInterval(() => {
            client.user.setActivity(status[index], { 
                type: isProdEnvironment ? ActivityType.Playing : ActivityType.Watching 
            });
            index = (index + 1) % status.length;
        }, 10000);
    },
};