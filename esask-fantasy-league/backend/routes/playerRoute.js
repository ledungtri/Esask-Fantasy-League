const router = require('express').Router();
const playerCtrl = require('../controllers/playerController');


router.get('/playerlist', playerCtrl.playerList);
router.get('/player/:_id/', playerCtrl.get); //get player data by sumonnerID


    module.exports = router;