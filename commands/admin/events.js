const { SlashCommandBuilder } = require('discord.js');
const { createScheduledEvent } = require('../../utils/functions.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('events')
		.setDescription('Crée un événement planifié.')
		.addStringOption(option =>
            option.setName('nom')
                .setDescription('Nom de l\'événement')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('description')
                .setDescription('Description de l\'événement')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date-debut')
                .setDescription('Date et heure de début (YYYY-MM-DD HH:mm)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('date-fin')
                .setDescription('Date et heure de fin (YYYY-MM-DD HH:mm)')
                .setRequired(true)),
	async execute(interaction) {

		const name = interaction.options.getString('nom');
        const description = interaction.options.getString('description');
        const startTimeInput = interaction.options.getString('date-debut');
        const endTimeInput = interaction.options.getString('date-fin');
        const guild = interaction.guild;

        const startTime = new Date(startTimeInput); 
        const endTime = new Date(endTimeInput);   

        if (isNaN(startTime) || isNaN(endTime)) {
            return interaction.reply('Format de date invalide. Utilisez YYYY-MM-DD HH:mm.');
        }

        if (startTime >= endTime) {
            return interaction.reply('La date de fin doit être après la date de début.');
        }

        try {

            await createScheduledEvent(guild, name, description, startTime, endTime);
            await interaction.reply('Événement créé !');

        } catch (error) {

            await interaction.reply('Une erreur est survenue lors de la création de l\'événement.');

        }

	},
};