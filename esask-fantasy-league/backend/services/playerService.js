require('dotenv').config();

const GaleforceModule = require('galeforce');
const _ = require('lodash');

const galeforce = new GaleforceModule({
    'riot-api': {key: process.env.RIOT_TOKEN},
    'rate-limit': {
        type: 'bottleneck',
        options: {
            intervals: {1: 20}
        }
    }
});

assignPlayerValue =  (res_data) =>{
    const sorted_res = res_data.sort((a,b) => (a.leaguePoints < b.leaguePoints) ? 1 : -1);

    for(let i = 0; i < sorted_res.length; i++){
        sorted_res[i].pos = i+1;
        if(i < 40){
            sorted_res[i].value =12500;
        }

        if(i > 39 && i < 100){
            sorted_res[i].value =10000;
        }

        if(i > 99 && i < 200){
            sorted_res[i].value =7500;
        }

        if(i > 199){
            sorted_res[i].value =0;
        }
    }

    return sorted_res;
}

/** Nisrine: Main function to be called, to display the stats of a player */
const getPlayerStats =  async (summonerID, startDate = null, endDate = null)  => {

    const puuid = await getPuuidFromSummonerId(summonerID);
    const matchIds = await getPlayerMatchIds(puuid, startDate, endDate);

    const promises = matchIds.map(matchId => getPerformanceByMatchId(matchId, puuid));
    /** Nisrine: This object will receive the list of all matches for that player with metadata */
    const stats = await Promise.all(promises);

    /**Call the method to show total wins and losses for sumonnerID */
    const entries = await entriesBySumonnerID(summonerID);
    return {stats, entries:entries};
}

/** helper function to get the sumonner's Puuid from their sumonnerID */
async function getPuuidFromSummonerId(summonerId) {
    const player = await galeforce.lol.summoner().region(galeforce.region.lol.NORTH_AMERICA).summonerId(summonerId).exec();
    return  player.puuid;
}

/** helper function to get the matches ids from summoner's Puuid */
async function getPlayerMatchIds(puuid, startDate, endDate) {

    const query = {type: "ranked", queueId: 420, count: 5}; //I removed count from here to get the all last week's matches
    if (startDate!==null) {
        startDate = new Date(startDate);
        query['startTime'] = Math.floor(startDate.getTime() / 1000);
    }
    if (endDate!==null) {
        endDate = new Date(endDate);
        query['endTime'] = Math.floor(endDate.getTime() / 1000);
    }
    return galeforce.lol.match.list()
        .region(galeforce.region.riot.AMERICAS)
        .puuid(puuid)
        .query(query)
        .exec();
}

/** helper function to get the player performance using the match ID */
async function getPerformanceByMatchId(matchId, puuid) {
    const match = await galeforce.lol.match.match().region(galeforce.region.riot.AMERICAS).matchId(matchId).exec();
    const date = new Date(match.info.gameStartTimestamp).toLocaleDateString("en-US") //get the date for this match

    const participants = match.info.participants;

    // Calculate player's performance
    const participant = participants.find(p => p.puuid === puuid);

    // // get team performance
    const teamId = participant.teamId;
    const team = match.info.teams.find(t => t.teamId === teamId);

    const score = calculateScore(participant.kills, participant.assists, participant.deaths );
    
    const data = {win: team.win, kills: participant.kills, assists: participant.assists, deaths: participant.deaths};
    const teamBonuses = {towers: team.objectives.tower.kills, dragons: team.objectives.dragon.kills, barons: team.objectives.baron.kills};
    return {date: date, score: score, position: participant.teamPosition, data, teamBonuses};
}

/** Nisrine: helper function to get total wins, losses for a sumonnerID **/
entriesBySumonnerID = (sumonnerID) => {
    return galeforce.lol.league.entries().region(galeforce.region.lol.NORTH_AMERICA).summonerId(sumonnerID).exec();
}

/** Nisrine: helper function to calculate the player's score **/
calculateScore = (kills, assists, deaths) => {
    return (kills * 3 + assists * 2 - deaths )
}

module.exports = {assignPlayerValue, getPlayerStats};