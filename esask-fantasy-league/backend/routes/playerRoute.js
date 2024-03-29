const router = require('express').Router();
const playerCtrl = require('../controllers/playerController');


router.get('/playerlist', playerCtrl.playerList);
router.get('/player/:_id/:startDate?/:endDate?', playerCtrl.getPlayerStats); //get player data by sumonnerID


    module.exports = router;