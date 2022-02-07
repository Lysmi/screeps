let harvestModule = require('harvester')
let deliveryModule = require('delivery')
let upgradersModule = require('upgrader')
let buildersModule = require('builder')

function clearMemoryCreeps()
{
	if(Game.time%100==0)
	{
		for(var i in Memory.creeps) {
			if(!Game.creeps[i]) {
				delete Memory.creeps[i];
			}
		}
	}	
}

module.exports =  {
    loop: function()
	{
		let harvesters = []
		let deliveries = []
		let upgraders = []
		let builders = []
		clearMemoryCreeps()
		//runCreepsModules
		for (const creepKey in Game.creeps)
		{
			creep = Game.creeps[creepKey]
			switch (creep.memory.role)
			{
				case 'harvester':
					harvestModule.run(creep)
					harvesters.push(creep)
					break
				case 'delivery':
					deliveryModule.run(creep)
					deliveries.push(creep)
					break
				case 'upgrader':
					upgradersModule.run(creep)
					upgraders.push(creep)
					break
				case 'builder':
					buildersModule.run(creep)
					builders.push(creep)
					break	
			}
		}

        for (const spawnerKey of Object.keys(Game.spawns))
        {
			const spawner = Game.spawns[spawnerKey]			  
			//Harvester Spawn
			if(harvesters.length < 7)
			{
				harvestModule.spawn(spawner)
			}

			//Delivery Spawn
			if(deliveries.length < 7)
			{
				deliveryModule.spawn(spawner)
			}		

			//Upgrader Spawn
			if(upgraders.length < 4)
			{
				upgradersModule.spawn(spawner)

			} 
			
			//Builder Spawn
			if(builders.length < 2)
			{
				buildersModule.spawn(spawner)

			} 
        }
    }
}