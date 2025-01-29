const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, codeBlock } = require('discord.js');
const { createScheduledEvent } = require('../../utils/functions.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('jpo')
		.setDescription('Crée une jpo planifiée.')
        .addStringOption(option =>
            option.setName('date-debut')
                .setDescription('Date et heure de début (YYYY-MM-DD HH:mm)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date-fin')
                .setDescription('Date et heure de fin (YYYY-MM-DD HH:mm)')
                .setRequired(true)),
	async execute(interaction) {

        const startTimeInput = interaction.options.getString('date-debut');
        const endTimeInput = interaction.options.getString('date-fin');

        const guild = interaction.guild;

        const startTime = new Date(startTimeInput); 
        const endTime = new Date(endTimeInput);  
        const now = new Date(); 

        if (isNaN(startTime) || isNaN(endTime)) {

            const codeBlockErrorMessage = codeBlock(`⚠️ Error : [ Format de date invalide. Utilisez YYYY-MM-DD HH:mm ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
            .setDescription(`${codeBlockErrorMessage}`)
            .setTimestamp()
	        .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
            
            await interaction.reply({ 
                content: `${interaction.user}`, 
                embeds: [ErrorEmbed],
                ephemeral: true 
            });

            return;
        }

        if (startTime <= now) {

            const codeBlockErrorMessage = codeBlock(`⚠️ Error : [ La date de début doit être dans le futur ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
            .setDescription(`${codeBlockErrorMessage}`)
            .setTimestamp()
	        .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
            
            await interaction.reply({ 
                content: `${interaction.user}`, 
                embeds: [ErrorEmbed],
                ephemeral: true 
            });

            return;
        }

        if (endTime <= startTime) {

            const codeBlockErrorMessage = codeBlock(`⚠️ Error : [ La date de fin doit être après la date de début ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
            .setDescription(`${codeBlockErrorMessage}`)
            .setTimestamp()
	        .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
            
            await interaction.reply({ 
                content: `${interaction.user}`, 
                embeds: [ErrorEmbed],
                ephemeral: true 
            });

            return;
        }

        try {

            const event = await createScheduledEvent(guild, startTime, endTime);
            const eventUrl = event.url;

            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            let logMessage;

            if (logChannel) {

                const codeBlockLogMessage = codeBlock(`⚙️ Logs : [ Événement créé avec succès par ${interaction.user.tag} ]`);

                const logEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
                .setDescription(`${codeBlockLogMessage}`)
                .setTimestamp()
                .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
        
                logMessage = await logChannel.send({ embeds: [logEmbed] });
            }

            const goToLog = new ButtonBuilder()
			.setLabel('Voir la log')
            .setURL(logMessage.url)
		    .setStyle(ButtonStyle.Link);

            const announcementsChannel = interaction.guild.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID);
            let announcementsMessage;

            if (announcementsChannel) {

                const goToEvent = new ButtonBuilder()
			    .setLabel('Voir la jpo')
                .setURL(eventUrl)
		        .setStyle(ButtonStyle.Link);

                const rowAnnouncementsChannel = new ActionRowBuilder()
                .addComponents(goToEvent);

                const codeBlockAnnouncementsMessage = codeBlock(`⚙️ Logs : [ Événement créé avec succès par ${interaction.user} ]`);

                const announcementsEmbed = new EmbedBuilder()
                .setColor("White")
                .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
                .setDescription(`${codeBlockAnnouncementsMessage}`)
                .setTimestamp()
                .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
        
                announcementsMessage = await announcementsChannel.send({ embeds: [announcementsEmbed], components: [rowAnnouncementsChannel] });
            }

            const goToAnnouncements = new ButtonBuilder()
			.setLabel('Voir l\'annonce')
            .setURL(announcementsMessage.url)
		    .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder()
            .addComponents(goToAnnouncements, goToLog);

            const codeBlockTestMessage = codeBlock(`: [ test ]`);

            const confirmCreationEventEmbed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
            .setDescription(`${codeBlockTestMessage}`)
            .setTimestamp()
            .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
                
            await interaction.reply({
                content: `${interaction.user}`,
                embeds: [confirmCreationEventEmbed],
                components: [row],
            });
           
        } catch (error) {

            console.log(error);

            const codeBlockErrorMessage = codeBlock(`⚠️ Error : [ ${error.message} ]`);
            
            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.LOGO_URL })
            .setDescription(`${codeBlockErrorMessage}`)
            .setTimestamp()
            .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
            
            await interaction.reply({ 
                content: `${interaction.user}`, 
                embeds: [ErrorEmbed],
                ephemeral: true 
            });
        }

	},
};