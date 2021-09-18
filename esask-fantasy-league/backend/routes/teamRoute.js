const router = require('express').Router();
const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);

//TODO get team



//TODO update team

module.exports = router;