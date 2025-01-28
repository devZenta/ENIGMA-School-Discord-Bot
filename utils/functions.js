const fs = require('fs');

async function createScheduledEvent(guild, name, description, startTime, endTime) {
    
    const event = await guild.scheduledEvents.create({
        
        name: `${name}`,
        description: `${description}`,
        scheduledStartTime: startTime, 
        scheduledEndTime: endTime,   
        privacyLevel: 2,
        entityType: 3,
        entityMetadata: { location: '165 avenue de Bretagne, Bâtiment Le Blan-Lafont, 59000 Lille' },

    });

    const imageBuffer = fs.readFileSync('C:/Users/hugog/Dev/Projects/ENIGMA-School Discord Bot/resources/assets/test.png'); 
    await event.edit({ image: imageBuffer });

    console.log(`Événement créé : ${event.name} (ID : ${event.id})`);

}

module.exports = { createScheduledEvent };