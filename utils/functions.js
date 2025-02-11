const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function createScheduledJpo(guild, startTime, endTime) {
    
    const event = await guild.scheduledEvents.create({
        
        name: `Journée Portes Ouvertes - ${startTime.toLocaleDateString()}`,
        description: `**Découvrez notre École Informatique ENIGMA lors de notre Journée Portes Ouvertes !**\n\n*Ce qui vous attend à notre JPO :*\n\n 🌟 Rencontres avec nos étudiants : Partagez un moment convivial avec ceux qui vivent déjà l'expérience ENIGMA. Ils répondront à toutes vos questions sur nos programmes, nos projets et la vie étudiante.\n\n 🎓 Présentation de nos Bachelors et Mastères : Découvrez nos différents cycles, conçus pour répondre aux exigences du marché de l'emploi, avec des spécialisations variées et un accompagnement personnalisé.\n\n 👩‍🏫 Rencontrez notre équipe pédagogique : Discutez avec notre équipe pédagogique passionnée, prête à vous accompagner dans votre projet professionnel et à vous faire découvrir leur approche innovante de la formation.\n\n 🏢 Visitez nos locaux à EuraTechnologies : Plongez dans un environnement moderne, inspirant et adapté aux défis de l'informatique d'aujourd'hui et de demain.\n\n**👉 [Inscrivez-vous dès maintenant](https://www.enigma-school.com/evenements/)**`,
        scheduledStartTime: startTime, 
        scheduledEndTime: endTime,   
        privacyLevel: 2,
        entityType: 3,
        entityMetadata: { location: '165 avenue de Bretagne, Bâtiment Le Blan-Lafont, 59000 Lille' },

    });

    const imagePath = path.join(__dirname, '../resources/assets/event_back_screen.png');
    const imageBuffer = fs.readFileSync(imagePath);
    await event.edit({ image: imageBuffer });

    return event;

}

async function createScheduledEvent(guild, startTime, endTime) {
    
    const event = await guild.scheduledEvents.create({
        
        name: `📱 Atelier Dev Mobile - ${startTime.toLocaleDateString()}`,
        description: `**📅 Du 18 au 21 février :**\n\n***Tu es en Bac+3 ou Bac+4 et tu te demandes quelle école choisir pour la suite de ton parcours ? 🤔***\n\n*📱 Viens découvrir ENIGMA de l'intérieur à travers un atelier 100% dédié au développement mobile ! Pendant 4 jours, participe à des cours immersifs et vis l'expérience étudiante en conditions réelles.*\n\n✨ Au programme :\n\n 🔸 Apprendre les bases du développement mobile\n\n 🔸 Participer à des cours comme un étudiant de l'école\n\n 🔸 Échanger avec nos professeurs et étudiants\n\n 🔸 Découvrir notre pédagogie et notre campus\n\n🚀 **Une immersion totale pour voir si ENIGMA est faite pour toi !**\n\n**👉 [Inscrivez-vous dès maintenant](https://www.enigma-school.com/evenements/)**`,
        scheduledStartTime: startTime, 
        scheduledEndTime: endTime,   
        privacyLevel: 2,
        entityType: 3,
        entityMetadata: { location: '165 avenue de Bretagne, Bâtiment Le Blan-Lafont, 59000 Lille' },

    });

    const imagePath = path.join(__dirname, '../resources/assets/event_back_screen.png');
    const imageBuffer = fs.readFileSync(imagePath);
    await event.edit({ image: imageBuffer });

    return event;

}

module.exports = { createScheduledJpo, createScheduledEvent };