const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;
const playerService = require('../services/playerService')

async function createTeam(body) {
    const team = new Team({
        name: body.name.trim(),
        contestId: body.contestId,
        players: body.players || []
    });
    await validateContest(body.contestId);
    return await team.save();
}


async function getTeamById(id) {
    //TODO: Implement getTeamById
}

async function updateTeamById(id, body) {
    //TODO: Implement getTeamById
}


async function validateContest(contestId) {
    if (!ObjectId.isValid(contestId)) {
        throw {message: "Invalid contestId"};
    }
    // todo: verify contest exists
}

async function getTeamPlayers(id) { //id being the id of the team from the db
    try {
        const players = Team.findById(id);
        //console.log(players)
        return players;
    } catch(e) {
        //Log erros
        throw Error('Error while getting team data from the database')
    }
    
}

async function getTeamStats(id) { //id being the tema id from db
    let sumTowers, sumDragons, sumBarons, sumWins; //captain bonuses
   try {
    let players = (await getTeamPlayers(id)).players;
    players = JSON.parse(JSON.stringify(players)); 
    for(const player of players) {
        const stats = await getPlayerStats(player.id);
        console.log(player.id);
        for(const match of player) {
            
        }
        sumTowers+=stats.towers;
        sumDragons+=stats.dragons;
        sumBarons+=stats.barons;
        sumWins+=stats.wins;
        calculateScore(sumTowers, sumDragons, sumBarons, sumWins);
    };
    return players;
   } catch(error) {
       console.log(error)
   }
    
}

async function getPlayerStats(id) { //player id
    try {
        const stats = await playerService.getPlayerStats(id);
        console.log(stats);
        const {towers, dragons, barons, wins} = stats;
        return {data: {towers, dragons, barons, wins} }
    } catch(error) {
        console.log(error)
    }

    
    //TODO: calculate the team stats according to the following:
        // 1 tower/turret = 1 point.
        //1 dragon = 2 point.
        //1 baron = 3 point.
       // Win = 2 point.

}

module.exports = {createTeam, getTeamById,getTeamPlayers,getTeamStats, updateTeamById};