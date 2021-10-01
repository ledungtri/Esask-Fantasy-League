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
        return players;
    } catch(e) {
        throw Error('Error while getting team data from the database')
    }
    
}

async function getTeamStats(id,  startDate, endDate) { //id being the tema id from db

    
    let sumTowers=0, sumDragons=0, sumBarons=0, sumWins=0; //captain bonuses
    let teamScore = 0;
    let playersStat=[];
    let teamName="";
    try {
        let team = (await getTeamPlayers(id));
        players = JSON.parse(JSON.stringify(team.players)); 
        teamName = team.name;

        //this has to be for all players in a team by match
        for(const player of players) {
                const stats = await getPlayerStats(player.isCaptain, player.summonerId, startDate, endDate);
                console.log(stats);
                playersStat.push(stats);

                //we are doing the sum here to get the total score for the whole team
                if(player.isCaptain) {
                    sumTowers+=stats.data.towers;
                    sumDragons+=stats.data.dragons
                    sumBarons+=stats.data.barons
                    sumWins+=stats.data.wins;  //these are data for the whole team
                    teamScore+=stats.score;
                }
                             

        };
       

        return {
            score: teamScore, 
            name:teamName,
            teamData:{sumTowers, sumDragons, sumBarons, sumWins}, 
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
            
            console.log("statsstatsstatsstatsstatsstatsstatsstatsstats")
            console.log(stat)
            
            wins += stat.data.win?1:0;
            towers+=stat.teamBonuses.towers;
            dragons+=stat.teamBonuses.dragons;
            barons +=stat.teamBonuses.barons;
            kills+=stat.data.kills;
            assists+=stat.data.assists;
            deaths+=stat.data.deaths;

           // playerScore+=stat.data.score
        } 
     

            playerScore = calculateScore(isCaptain, wins, towers, dragons, barons) //to change

       

        
        return { 
            summonerName:stats.entries[0].summonerName, 
            summonnerID:stats.entries[0].summonerId,
            isCaptain:isCaptain, 
            data: {kills, assists, deaths, wins, towers, dragons, barons}, //total stats for this player in the last 5 matches
            score: playerScore 
        }  
    } catch(error) {
        console.log(error)
    }

  
}

/**Calculate the points for individual player
 calculate the team stats according to the following:
        // 1 tower/turret = 1 point.
        //1 dragon = 2 point.
        //1 baron = 3 point.
       // Win = 2 point.*/
function calculateScore(isCaptain, towers, dragons, barons, wins) {
    if(isCaptain)
        return 1.5*(towers + dragons*2 + barons*3 + wins*2)
    else
        return (towers + dragons*2 + barons*3 + wins*2) 
}
module.exports = {createTeam, getTeamById,getTeamPlayers,getTeamStats, getPlayerStats, updateTeamById};