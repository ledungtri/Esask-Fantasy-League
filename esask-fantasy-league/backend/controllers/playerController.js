const axios = require('axios');
const listService = require('../services/playerService');


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
 

module.exports={playerList}