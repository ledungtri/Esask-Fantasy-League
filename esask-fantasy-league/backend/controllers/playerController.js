const playerService = require('../services/playerService');
//var accountID = 'Tu5ydMxHVEFJBeoBrq5hasa6HD6V3SWJzg7cMltFP0c1FPU';
//var summonerID = 'zJz1wEtm2m30q7g3LpKr5r9Fj6ey_leWPIp29EdRsPyKRIs';


const get =  function(req, res){
  
    accountID = req.params._id;
    summonerID = req.params._sId;

    playerService.main(accountID,summonerID)
    .then(function(response) {
        return res.status(200).json({success:true, entries:response.entries, stats: response.stats});
    })
    .catch((error) => console.log(error))
 
    
}


module.exports = {
    get
};