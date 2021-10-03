const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;
const playerService = require('./playerService');

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

async function findTeamsByContestId(contestId) {
    const teams = await Team.find({contestId: contestId});
    return teams;
}


async function validateContest(contestId) {
    if (!ObjectId.isValid(contestId)) {
        throw {message: "Invalid contestId"};
    }
}

async function getTeamPlayers(id) { //id being the id of the team from the db
    try {
        const players = Team.findById(id);
        return players;
    } catch(e) {
        throw Error('Error while getting team data from the database')
    }

}

async function getTeamStats(id,  startDate, endDate) { //id being the tema id from db


    let towers=0, dragons=0, barons=0, wins=0; //captain bonuses
    let teamScore = 0; //this is the tsum of all players score + the captain score
    let captainBonusScore=0; //this is the captain score based on turrets, dragons, barons and win
    let playersStat=[];
    let teamName="";
    try {
        let team = (await getTeamPlayers(id));
        players = JSON.parse(JSON.stringify(team.players));
        teamName = team.name;

        //this has to be for all players in a team by match
        for(const player of players) {
            const stats = await getPlayerStats(player.isCaptain, player.summonerId, startDate, endDate);
            teamScore += stats.playerScore;
            //console.log(stats);
            playersStat.push(stats);

            if(player.isCaptain) {
                towers = stats.data.towers;
                dragons = stats.data.dragons
                barons = stats.data.barons
                wins = stats.data.wins;  //these are data for the whole team
                captainBonusScore = calculateBonusCaptain(wins, towers, dragons, barons)
                teamScore += captainBonusScore
            }

        };


        return {
            score: teamScore, //team score is the captain's bonus.
            name:teamName,
            captainBonus:{towers, dragons, barons, wins, captainBonusScore},
            playersData:playersStat
        };
    } catch(error) {
        console.log(error)
    }

}

/**This function to get the total of stats of all the matches for this player */
async function getPlayerStats(isCaptain, id, startDate, endDate) { //player id
    try {
        const stats = await playerService.getPlayerStats(id,startDate, endDate );
        // const date = stats.stats[0].date;

        let towers=0, dragons=0, barons=0;
        let wins=0, kills=0, assists=0, deaths=0; //these are total stats for all matches of this player
        for(const stat of stats.stats) { //for each stat means for each match stats for one specific player, in the last 5 matches
            wins += stat.data.win?1:0;
            towers+=stat.teamBonuses.towers;
            dragons+=stat.teamBonuses.dragons;
            barons +=stat.teamBonuses.barons;
            kills+=stat.data.kills;
            assists+=stat.data.assists;
            deaths+=stat.data.deaths;

           // playerScore+=stat.data.score
        }

            // if(isCaptain)
            // playerScore = calculateScoreCaptain( wins, towers, dragons, barons) //to change
            // else
            playerScore = calculateScorePlayer(isCaptain, kills, assists, deaths) //to change



        return {
            summonerName:stats.entries[0].summonerName,
            summonnerID:stats.entries[0].summonerId,
            isCaptain:isCaptain,
            data: {kills, assists, deaths, wins, towers, dragons, barons}, //total stats for this player in the last 5 matches
            playerScore: playerScore
        }
    } catch(error) {
        console.log(error)
    }


}

/**Calculate team captain bonus */
function calculateBonusCaptain(wins, towers, dragons, barons) {
    if(isCaptain) return (1.5*(towers + dragons*2 + barons*3 + wins*2))
    else return (towers + dragons*2 + barons*3 + wins*2)
}
function calculateScorePlayer(isCaptain, kills, assists, deaths) {
    if(!isCaptain) return (kills*3 + assists*2 - deaths )
    else  return (1.5*(kills*3 + assists*2 - deaths) )
}
module.exports = {createTeam, getTeamById,getTeamPlayers,getTeamStats, getPlayerStats, findTeamsByContestId};