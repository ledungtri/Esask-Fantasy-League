const axios = require('axios');
const listService = require('../services/playerService');
const playerService = require('../services/playerService');
//var accountID = 'Tu5ydMxHVEFJBeoBrq5hasa6HD6V3SWJzg7cMltFP0c1FPU';
//var summonerID = 'zJz1wEtm2m30q7g3LpKr5r9Fj6ey_leWPIp29EdRsPyKRIs';


const get =  function(req, res){

    summonerID = req.params._id; //_id is sumonnerID

    playerService.main(summonerID)
    .then(function(response) {
        return res.status(200).json({success:true, entries:response.entries, stats: response.stats, totalGames:response.totalGames});
    })
    .catch((error) => console.log(error))


}

playerList = async (req, res) => {
    try{
        const response = await axios({
            url: 'https://na1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5',
            headers: {
                'X-Riot-Token': process.env.RIOT_TOKEN
            },
        });

        const res_data = response.data.entries;
        const list_data = listService.PlayerListService(res_data);

        return res.status(200).json(list_data);

    }catch(err){
        return res.status(500).json({error: err})
    }
}


module.exports={playerList, get};

