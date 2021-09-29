const Contest = require('../models/contestModel');

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

module.exports = {getContests};