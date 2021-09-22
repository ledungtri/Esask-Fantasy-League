const teamService = require('../services/teamService');

async function createTeam(req, res) {
    try {
        const team = await teamService.createTeam(req.body);
        return res.status(200).json({team: team});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
}

async function getTeamById(req, res) {
    //TODO: implement getTeamById
}

async function updateTeamById(req, res) {
    //TODO: implement updateTeamById
}

module.exports = {createTeam, getTeamById, updateTeamById};