const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, InteractionContextType, codeBlock } = require('discord.js');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Commande de test.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
	async execute(interaction) {

        const descriptionMessage = codeBlock("Aucun test n'est pour le moment configuré.");

        const replyEmbed = new EmbedBuilder()
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
            .setColor("Grey")
            .setDescription(`${descriptionMessage}`)
            .setTimestamp()
            .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });

        await interaction.reply({ 
            content: `${interaction.user}`,
            embeds: [replyEmbed],
            ephemeral: true
        });

	},
};