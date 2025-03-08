const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function createScheduledJpo(guild, startTime, endTime) {
    
    const event = await guild.scheduledEvents.create({
        
        name: `Journée Portes Ouvertes - ${startTime.toLocaleDateString()}`,
        description:`🚀 **Dernière chance pour découvrir ENIGMA lors de notre Journée Portes Ouvertes !**\n\n📅 *Rejoins-nous à Euratechnologies pour une immersion unique dans l'univers de l'informatique et de l'IT.*\n\n🔍 **Ce qui t'attend :**\n\n> 🎓 **Présentation de nos formations** : Bachelors, Mastères et spécialisations, conçus pour répondre aux besoins du marché.\n\n> 💬 **Échanges avec nos étudiants** : Pose toutes tes questions et découvre leur expérience au sein d'ENIGMA.\n\n> 👩‍🏫 **Rencontre avec notre équipe pédagogique** : Un accompagnement sur-mesure pour ton avenir dans l'IT.\n\n> 🏢 **Visite immersive de nos locaux** : Plonge au cœur d'un environnement moderne et inspirant à Euratechnologies.\n\n⏳ *Ne laisse pas passer cette dernière opportunité !* Inscris-toi dès maintenant pour ne pas manquer cette journée.\n\n📌 ***__Attention : inscription obligatoire !__***\n\n**👉 [Inscris-toi ici](https://www.enigma-school.com/evenements/)**`,
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