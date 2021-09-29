const contestService = require('../services/contestService');

getAllContests = async (req, res) => {
    try {
        const contests = await contestService.getContests();
        return res.status(200).json({success: true, data: contests});
    } catch (e) {
        return res.status(400).json({success: false, error: e.message});
    }
}

module.exports = {getAllContests};