const { random } = require("lodash")

module.exports = {
    run(creep)
    {
        const energyFound = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        const pathToEnergy = creep.pos.findPathTo(energyFound)
        if(creep.harvest(energyFound) == ERR_NOT_IN_RANGE) 
        {
            creep.moveByPath(pathToEnergy)
        }
    },
    spawn(spawner)
    {
        const creepBody = [WORK, WORK, MOVE]
        const creepName = Math.random().toString(16).substring(2, 8);
        if (spawner.spawnCreep(creepBody, creepName) == OK)
        {
            Game.creeps[creepName].memory.role = 'harvester'
        }
    }
}