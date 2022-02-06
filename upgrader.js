const { random } = require("lodash")

module.exports = {
    run(creep)
    {
        const controllerFound = creep.room.controller
        const pathToController = creep.pos.findPathTo(controllerFound)
        if(creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0)
        {
            creep.memory.appEnergy = false
        }
        switch(creep.upgradeController(controllerFound))
        {
            case ERR_NOT_IN_RANGE:
                creep.moveByPath(pathToController)
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
        const creepBody = [WORK, WORK, MOVE, CARRY]
        const creepName = Math.random().toString(16).substring(2, 8);
        if (spawner.spawnCreep(creepBody, creepName) == OK)
        {
            Game.creeps[creepName].memory.role = 'upgrader'
            Game.creeps[creepName].memory.appEnergy = false
        }
    }
}