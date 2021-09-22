const express = require('express');
const ContestListCtrl = require('../controllers/contestController');
const router = express.Router();

router.get('/contests', ContestListCtrl.getAllContests);

//TODO get Contest Information

module.exports = router;