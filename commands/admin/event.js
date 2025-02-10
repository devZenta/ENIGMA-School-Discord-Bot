const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, codeBlock, PermissionFlagsBits, InteractionContextType } = require('discord.js');
const { createScheduledEvent } = require('../../utils/functions.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('event')
		.setDescription('Créer un événement planifié')
        .addStringOption(option =>
            option.setName('date-debut')
                .setDescription('Date et heure de début (YYYY-MM-DD HH:mm)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date-fin')
                .setDescription('Date et heure de fin (YYYY-MM-DD HH:mm)')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
	async execute(interaction) {

        const startTimeInput = interaction.options.getString('date-debut');
        const endTimeInput = interaction.options.getString('date-fin');

        const guild = interaction.guild;

        const startTime = new Date(startTimeInput); 
        const endTime = new Date(endTimeInput);  
        const now = new Date(); 

        if (isNaN(startTime) || isNaN(endTime)) {

            const codeBlockErrorMessage = codeBlock(`Error : [ Format de date invalide. Utilisez YYYY-MM-DD HH:mm ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
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

            const codeBlockErrorMessage = codeBlock(`Error : [ La date de début doit être dans le futur ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
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

            const codeBlockErrorMessage = codeBlock(`Error : [ La date de fin doit être après la date de début ]`);

            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
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
            let formattedStartTime;
            let formattedEndTime;

            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            let logMessage;

            if (logChannel) {

                const options = { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric', 
                    hour: '2-digit', 
                    minute: '2-digit' 
                };
                
                formattedStartTime = new Date(startTime).toLocaleString('fr-FR', options);
                formattedEndTime = new Date(endTime).toLocaleString('fr-FR', options);

                const logEmbed = new EmbedBuilder()
                .setColor("Grey")
                .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
                .setDescription(`**__Logs :__** \n\n> **Utilisateur :**\n> Événement créé avec succès par : ${interaction.user.tag}\n> Id : ${interaction.user.id}\n\n> **Événement :**\n> Nom : ${event.name}\n> Id : ${event.id}\n> Début : ${formattedStartTime}\n> Fin : ${formattedEndTime}\n\n${eventUrl}\n\n*Ce message a été créé afin d'assurer la sécurité de notre serveur Discord et de permettre le suivi des actions effectuées.*`)
                .setTimestamp()
                .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
        
                logMessage = await logChannel.send({ embeds: [logEmbed] });
            }

            const goToLog = new ButtonBuilder()
			.setLabel('Logs')
            .setURL(logMessage.url)
		    .setStyle(ButtonStyle.Link);

            const announcementsChannel = interaction.guild.channels.cache.get(process.env.ANNOUNCEMENTS_CHANNEL_ID);
            let announcementsMessage;

            if (announcementsChannel) {

                const roleId = process.env.NOTIFICATION_ROLE_ID;

                const goToEvent = new ButtonBuilder()
			    .setLabel('Événement')
                .setURL(eventUrl)
		        .setStyle(ButtonStyle.Link);

                const goToX = new ButtonBuilder()
			    .setLabel('X')
                .setURL('https://x.com/EnigmaLille')
		        .setStyle(ButtonStyle.Link);

                const goToLinkedin = new ButtonBuilder()
			    .setLabel('Linkedin')
                .setURL('https://www.linkedin.com/company/enigma-school/')
		        .setStyle(ButtonStyle.Link);

                const goToFacebook = new ButtonBuilder()
			    .setLabel('Facebook')
                .setURL('https://www.facebook.com/enigma.school.lille')
		        .setStyle(ButtonStyle.Link);

                const goToInstagram = new ButtonBuilder()
			    .setLabel('Instagram')
                .setURL('https://www.instagram.com/enigma.school/')
		        .setStyle(ButtonStyle.Link);

                const rowAnnouncementsChannel = new ActionRowBuilder()
                .addComponents(goToEvent, goToX, goToLinkedin, goToFacebook, goToInstagram);

                const announcementsEmbed = new EmbedBuilder()
                .setColor("White")
                .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
                .setTitle(`📢 **Ton avenir ! Parlons-en !** : ${startTime.toLocaleDateString()} 📢`)
                .setDescription(`**Ton avenir commence ici avec ENIGMA !**\n\n*📆 Ce ${formattedStartTime}, ENIGMA t'ouvre ses portes pour une journée immersive unique.*\n\n**Pourquoi participer ?**\n\n*C'est __l'opportunité parfaite__ pour découvrir notre école, explorer les **spécialisations qui te mèneront vers ta carrière après Bac+3/Bac+4**, et participer à nos **cours pour te plonger directement dans notre méthode d'enseignement.***\n\n🚀 **Ne laisse pas passer cette chance de poser toutes tes questions et de préparer ton futur !**\n\n***__PS : l'inscription est obligatoire__***\n\n**👉 [Inscris-toi ici](https://www.enigma-school.com/evenements/)**`)
                .setTimestamp()
                .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
        
                announcementsMessage = await announcementsChannel.send({ 
                    content: `<@&${roleId}>`,
                    embeds: [announcementsEmbed],  
                    components: [rowAnnouncementsChannel] 
                });

                announcementsMessage.react('👍');
            }

            const goToEvent = new ButtonBuilder()
			.setLabel('Événement')
            .setURL(eventUrl)
		    .setStyle(ButtonStyle.Link);

            const goToAnnouncements = new ButtonBuilder()
			.setLabel('Annonces')
            .setURL(announcementsMessage.url)
		    .setStyle(ButtonStyle.Link);

            const row = new ActionRowBuilder()
            .addComponents(goToAnnouncements, goToLog, goToEvent);

            const confirmCreationEventEmbed = new EmbedBuilder()
            .setColor("Green")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
            .setDescription(`**__Informations :__**\n\n> ✅ **Votre événement a été créé avec succès.**\n\n*Vous pouvez utiliser les boutons ci-dessous pour accéder aux différentes sections.*`)
            .setTimestamp()
            .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });
                
            await interaction.reply({
                content: `${interaction.user}`,
                embeds: [confirmCreationEventEmbed],
                components: [row],
            });
           
        } catch (error) {

            console.log(error);

            const codeBlockErrorMessage = codeBlock(`Error : [ ${error.message} ]`);
            
            const ErrorEmbed = new EmbedBuilder()
            .setColor("Red")
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
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