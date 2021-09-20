const express = require('express');
const ContestListCtrl = require('../controllers/contestController');
const router = express.Router();

// Considering the constests won't be available at home page
router.get('/constests', ContestListCtrl.getAllContests);

//TODO get Contest Information

module.exports = router;