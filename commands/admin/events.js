const { SlashCommandBuilder } = require('discord.js');
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
            return interaction.reply('Format de date invalide. Utilisez YYYY-MM-DD HH:mm.');
        }

        if (startTime <= now) {
            return interaction.reply('La date de début doit être dans le futur.');
        }

        if (endTime <= startTime) {
            return interaction.reply('La date de fin doit être après la date de début.');
        }

        try {

            await createScheduledEvent(guild, startTime, endTime);
            await interaction.reply('Événement créé !');

        } catch (error) {

            await interaction.reply('Une erreur est survenue lors de la création de l\'événement.');
            console.error(error);

        }

	},
};