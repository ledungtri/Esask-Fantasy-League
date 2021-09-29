const teamService = require('../services/teamService');

async function createTeam(req, res) {
    try {
        const team = await teamService.createTeam(req.body);
        return res.status(200).json({team: team});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

async function getTeamStatsById(req, res) {
    //TODO: implement getTeamById
    try {
        let teamStats = await teamService.getTeamStats(req.params._id);
       // console.log(teamStats)
        return res.status(200).json({success: true, teamStats: teamStats});
    } catch(error) {        
       return res.status(400).json({success:false, error: error});        
    }

}

async function updateTeamById(req, res) {
    //TODO: implement updateTeamById
}



module.exports = {createTeam, updateTeamById, getTeamStatsById};