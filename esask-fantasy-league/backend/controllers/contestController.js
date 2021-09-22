const contest = require('../models/contestModel');

getAllContests = async (req, res) => {

    contest.find({}, function (err,contests){
        if (err){
            return res
                .status(400)
                .json({success: false, error: err});
        }

        if (!contests.length){
            return res
                .status(404)
                .json({success: false, error: "No contests available"});
        }
        
        contests.forEach(contest => {
            contest.isContestOpen = contest.startDate > Date.now();
        });
        
        return res
            .status(200)
            .json({success: true, data: contests});
    });
}

module.exports = {getAllContests};
