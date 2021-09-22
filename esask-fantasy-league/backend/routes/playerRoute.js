const router = require('express').Router();

const playerController = require('../controllers/playerController');

router.get('/player/:_id/', playerController.get); //get player data by sumonnerID


    module.exports = router;