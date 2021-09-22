var request = require("request");
const axios = require('axios');
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

var stats = [];




const main =  async (accountID, summonerID)  => {

  stats = [];
  /** Helper method to Return 5 matches for that player  */
  const matchListByAccount = async () => {
    return (await kayn.Matchlist.by.accountID(accountID)).matches.slice(-5);
  }

  /** Call the method to return 5 matches for this player's accountID */
  const result = await matchListByAccount();

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

  return {stats, entries:entries};

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


  module.exports = {
    main,
    entriesBySumonnerID

};