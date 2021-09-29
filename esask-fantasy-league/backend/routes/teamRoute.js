const router = require('express').Router();
const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/:_id', teamController.getTeamStatsById);

//TODO get team



//TODO update team

module.exports = router;