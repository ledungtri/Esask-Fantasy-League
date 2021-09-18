const axios = require('axios');


playerList = async (req, res) => {
    try{
        const response = await axios({
            url: 'https://na1.api.riotgames.com/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5',
            headers: {
                'X-Riot-Token': 'RGAPI-e91f7b3c-8472-4ee2-a1a5-2680c0147d9b'
            },
        });

        return res.status(200).json(response.data); 
    }catch{
        return res.status(500).json({message: err})
    }
}
 

module.exports={playerList}