const Contest = require('../models/contestModel');
const teamService = require('./teamService');

async function getContests() {
    const contests = await Contest.find();
    contests.forEach(contest => {
        if (contest.startDate > Date.now()) {
            contest.status = "Upcoming";
        } else if (contest.endDate > Date.now()) {
            contest.status = "In progress";
        } else {
            contest.status = "Finished";
        }
    });
    return contests;
}

async function getContestById(id) {
    const contest = await Contest.findById(id);
    const participatedTeam = await teamService.findTeamsByContestId(id);
    return {contest, participatedTeam};
}

module.exports = {getContests, getContestById};