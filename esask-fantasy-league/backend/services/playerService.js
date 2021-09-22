var _ = require('lodash');


/** Kayn configuration */
const { Kayn, REGIONS } = require('kayn')
const kayn = Kayn(process.env.APP_KEY)({
 region: REGIONS.NORTH_AMERICA,
 apiURLPrefix: 'https://%s.api.riotgames.com',
 locale: 'en_US',
 debugOptions: {
     isEnabled: true,
     showKey: false,
 },
 requestOptions: {
     shouldRetry: true,
     numberOfRetriesBeforeAbort: 3,
     delayBeforeRetry: 1000,
     burst: false,
     shouldExitOn403: false,
 },
 cacheOptions: {
     cache: null,
     timeToLives: {
         useDefault: false,
         byGroup: {},
         byMethod: {},
     },
 },
})

/** This object will receive the list of all matches for that player with metadata */
var stats = [];

PlayerListService =  (res_data) =>{
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


const main =  async (summonerID)  => {

    /** Call the method to return the sumonner's AccountId from their sumonnerID */
    const accountID = (await sumAccountID(summonerID)).accountId;

    stats = [];
    /** Helper method to Return 5 matches for that player  */
    const matchListByAccount = async () => {
        return (await kayn.Matchlist.by.accountID(accountID)).matches;
    }

    /** Call the method to return 5 matches for this player's accountID */
    let result = (await matchListByAccount());
    const totalMatchesCount = result.length;
    result = result.slice(-5);


    /** For each match, get the details and stats of that player during that match */
    for(const match of result) {

        const matchDetail = await matchDetailByID(match.gameId)
        var date = new Date(match.timestamp).toLocaleDateString("en-US") //get the date for this match
        var position = getPosition(match.role, match.lane) //with 87%.5 accuracy

        //get the participant id by accountID
        var participantIdByAccountID = (_.filter(matchDetail.participantIdentities, {player: {accountId: accountID}}))[0].participantId;
        var sumonnerIcon = (_.filter(matchDetail.participantIdentities, {player: {accountId: accountID}}))[0].player.profileIcon;

        //get the player's stats using the participantID that we found earlier.
        var participantStats = (_.filter(matchDetail.participants, {participantId: participantIdByAccountID}))[0].stats;

        const {win, kills, assists, deaths} = participantStats;
        stats.push({date: date, position:position, accountId:accountID, data:{win, kills, assists, deaths}});
    };

    /**Call the method to show total wins and losses for sumonnerID */
    const entries = await entriesBySumonnerID(summonerID);

    return {stats, entries:entries, totalGames:totalMatchesCount};

}



/** helper function to get the sumonner accountID from sumonnerID **/
sumAccountID = async (sumonnerID) => {
    return await kayn.Summoner.by.id(sumonnerID);
}

/** helper function to get the match Details using the match ID **/
matchDetailByID = async (matchID) => {
    return await kayn.Match.get(matchID);
}

/** helper function to get total wins, losses for a sumonnerID **/
entriesBySumonnerID = async (sumonnerID) => {
    return await kayn.League.Entries.by.summonerID(sumonnerID);
}

/** helper function to get the position using the lane and role, with 87.5% accuracy **/
getPosition = (role, lane) => {
    if(lane == "MID_LANE" && role=="SOLO") {
        return "MIDDLE";
    }
    if(lane == "TOP_LANE" && role=="SOLO") {
        return "TOP";
    }
    if(lane == "JUNGLE" && role=="NONE") {
        return "JUNGLE";
    }
    if(lane == "BOT_LANE" && role=="DUO_CARRY") {
        return "BOTTOM";
    }
    if(lane == "BOT_LANE" && role=="DUO_SUPPORT") {
        return "UTILITY";
    }
    else return "NONE"
}



module.exports = {PlayerListService,main,
    entriesBySumonnerID};