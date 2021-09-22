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


module.exports = {
    get
};