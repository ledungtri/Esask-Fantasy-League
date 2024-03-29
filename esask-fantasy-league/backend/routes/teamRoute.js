const router = require('express').Router();
const teamController = require('../controllers/teamController');

router.post('/', teamController.createTeam);
router.get('/:_id/:startDate?/:endDate?', teamController.getTeamStatsById);



module.exports = router;