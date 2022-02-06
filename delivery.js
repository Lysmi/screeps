const { random } = require("lodash")

module.exports = {
    run(creep)
    {   
        switch(creep.memory.state)
        {
            case 'pickuping':
                const resourceFound = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES)
                const pathToResource = creep.pos.findPathTo(resourceFound)
                if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0)
                {
                    creep.memory.state = 'transfering'
                }
                if (resourceFound!=null)
                {
                    if(creep.pickup(resourceFound) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveByPath(pathToResource)
                    }
                } 
                else
                {
                    const tombstoneFound = creep.pos.findClosestByRange(FIND_TOMBSTONES)
                    const pathToTombstone = creep.pos.findPathTo(tombstoneFound)
                    if(creep.withdraw(tombstoneFound) == ERR_NOT_IN_RANGE) 
                    {
                        creep.moveByPath(pathToTombstone)
                    }
                }
                
                break
            case 'transfering':
                if(creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0)
                {
                    creep.memory.state = 'pickuping'
                }
                if(creep.memory.targetCreep != ' ' && creep.memory.targetCreep != null)
                {
                    const targetCreep = Game.creeps[creep.memory.targetCreep]
                    const pathToCreep = creep.pos.findPathTo(targetCreep)
                    switch (creep.transfer(targetCreep, RESOURCE_ENERGY))
                    {
                        case ERR_NOT_IN_RANGE:
                            creep.moveByPath(pathToCreep)
                            break
                        case OK:
                            creep.memory.targetCreep = ' '
                            break
                    }
                } 
                else
                {
                    const spawnFound = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
                    const pathToSpawn = creep.pos.findPathTo(spawnFound)
                    if(spawnFound.store.getFreeCapacity(RESOURCE_ENERGY) > 0)
                    {
                        if(creep.transfer(spawnFound, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveByPath(pathToSpawn)
                        }
                    } 
                    else
                    {
                        creep.memory.targetCreep = Object.keys(Memory.creepsNeedEnergy)[0]
                        delete Memory.creepsNeedEnergy[creep.memory.targetCreep]
                    }
                }
                break
        }
        
    },
    spawn(spawner)
    {
        const creepBody = [CARRY, MOVE, MOVE, CARRY]
        const creepName = Math.random().toString(16).substring(2, 8);
        if (spawner.spawnCreep(creepBody, creepName) == OK)
        {
            Game.creeps[creepName].memory.state = 'pickuping'
            Game.creeps[creepName].memory.role = 'delivery'
            Game.creeps[creepName].memory.targetCreep = ' '
        }
        
    }
}