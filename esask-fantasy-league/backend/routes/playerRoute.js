const router = require('express').Router();

const playerController = require('../controllers/playerController');

router.get('/player/:_id/:_sId', playerController.get);


    module.exports = router;