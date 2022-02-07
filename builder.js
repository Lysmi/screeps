const { random } = require("lodash")

module.exports = {
    run(creep)
    {
        if (Game.time%100 == 0)
        {
            creep.memory.appEnergy = false
        }
        const siteFound = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        {
            creep.memory.appEnergy = false
        }
        switch(creep.build(siteFound))
        {
            case ERR_NOT_IN_RANGE:
                creep.moveTo(siteFound)
                break
            case ERR_NOT_ENOUGH_RESOURCES:
                if(!Memory.creepsNeedEnergy[creep.name] && creep.memory.appEnergy == false)
                {
                    Memory.creepsNeedEnergy[creep.name] = ''
                    creep.memory.appEnergy = true
                }
                break
        }
    },
    spawn(spawner)
    {
        const creepBody = [WORK, WORK, MOVE, CARRY, CARRY]
        const creepName = Math.random().toString(16).substring(2, 8);
        if (spawner.spawnCreep(creepBody, creepName) == OK)
        {
            Game.creeps[creepName].memory.role = 'builder'
            Game.creeps[creepName].memory.appEnergy = false
        }
    }
}