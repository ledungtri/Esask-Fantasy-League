const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;

async function createTeam(body) {
    const team = new Team({
        name: body.name.trim(),
        contestId: body.contestId,
        players: body.players || []
    });
    await validateContest(body.contestId);
    return await team.save();
}


async function getTeamById(id) {
    //TODO: Implement getTeamById
}

async function updateTeamById(id, body) {
    //TODO: Implement getTeamById
}


async function validateContest(contestId) {
    if (!ObjectId.isValid(contestId)) {
        throw {message: "Invalid contestId"};
    }
    // todo: verify contest exists
}

module.exports = {createTeam, getTeamById, updateTeamById};