const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, InteractionContextType } = require('discord.js');

require('dotenv').config();

module.exports = {

	data: new SlashCommandBuilder()
		.setName('effectif')
		.setDescription('Affiche l\'effectif de l\'école.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setContexts(InteractionContextType.Guild),
	async execute(interaction) {

        const guild = interaction.guild;

        await guild.members.fetch();

        const roles = {
            admin: process.env.ROLE_ID_ADMIN,
            annee1: process.env.ROLE_ID_ANNEE1,
            annee2: process.env.ROLE_ID_ANNEE2,
            annee3: process.env.ROLE_ID_ANNEE3,
            annee4: process.env.ROLE_ID_ANNEE4,
            annee5: process.env.ROLE_ID_ANNEE5
        };

        const adminMembers = guild.roles.cache.get(roles.admin).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';
        const annee1Members = guild.roles.cache.get(roles.annee1).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';
        const annee2Members = guild.roles.cache.get(roles.annee2).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';
        const annee3Members = guild.roles.cache.get(roles.annee3).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';
        const annee4Members = guild.roles.cache.get(roles.annee4).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';
        const annee5Members = guild.roles.cache.get(roles.annee5).members.map(m => `> ${m.user.toString()}`).join('\n') || '> Aucun membre';

        const adminCount = guild.roles.cache.get(roles.admin).members.size;
        const annee1Count = guild.roles.cache.get(roles.annee1).members.size;
        const annee2Count = guild.roles.cache.get(roles.annee2).members.size;
        const annee3Count = guild.roles.cache.get(roles.annee3).members.size;
        const annee4Count = guild.roles.cache.get(roles.annee4).members.size;
        const annee5Count = guild.roles.cache.get(roles.annee5).members.size;

        const totalMembersCount = adminCount + annee1Count + annee2Count + annee3Count + annee4Count + annee5Count;

        const workforceEmbed = new EmbedBuilder()
            .setAuthor({ name: 'ENIGMA-School', iconURL: process.env.LOGO_URL, url: process.env.ENIGMA_SITE })
            .setColor(0x00AE86)
            .setTitle('**Effectif de l\'école**')
            .setDescription(`*Voici l\'effectif actuel de l\'école. Nombre total de personnes : ${totalMembersCount}.*`)
            .addFields(
                { name: `Équipe Administration (${adminCount})`, value: adminMembers, inline: false },
                { name: `5ème Année (${annee5Count})`, value: annee5Members, inline: false },
                { name: `4ème Année (${annee4Count})`, value: annee4Members, inline: false },
                { name: `3ème Année (${annee3Count})`, value: annee3Members, inline: false },
                { name: `2ème Année (${annee2Count})`, value: annee2Members, inline: false },
                { name: `1ère Année (${annee1Count})`, value: annee1Members, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: 'Enigma School - l\'Ecole Supérieure des Sciences de l\'Informatique de Lille' });

        await interaction.reply({ 
            content: `${interaction.user}`,
            embeds: [workforceEmbed] 
        });
    },
};