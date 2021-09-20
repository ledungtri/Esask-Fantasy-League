const router = require('express').Router();
const playerCtrl = require('../controllers/playerController');

router.get('/playerlist', playerCtrl.playerList);

module.exports = router;