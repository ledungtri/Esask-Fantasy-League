const Team = require('../models/teamModel');
const ObjectId = require('mongoose').Types.ObjectId;
const playerService = require('./playerService');

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

async function findTeamsByContestId(contestId) {
    const teams = await Team.find({contestId: contestId});
    return teams;
}


async function validateContest(contestId) {
    if (!ObjectId.isValid(contestId)) {
        throw {message: "Invalid contestId"};
    }
}

module.exports = {createTeam, getTeamById, findTeamsByContestId};