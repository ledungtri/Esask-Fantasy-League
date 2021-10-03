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
        let teamStats = await teamService.getTeamStats(req.params._id, req.params.startDate, req.params.endDate);
       // console.log(teamStats)
       if(Object.keys(teamStats).length==0)
        return res.status(404).json({success: false, data: teamStats});
        else
        return res.status(200).json({success: true, data: teamStats});
    } catch(error) {        
       return res.status(400).json({success:false, error: error});        
    }

}

async function updateTeamById(req, res) {
    //TODO: implement updateTeamById
}



module.exports = {createTeam, updateTeamById, getTeamStatsById};