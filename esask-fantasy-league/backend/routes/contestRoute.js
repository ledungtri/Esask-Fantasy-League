const express = require('express');
const ContestListCtrl = require('../controllers/contestController');
const router = express.Router();

router.get('/contests', ContestListCtrl.getAllContests);

router.get('/contests/:id', ContestListCtrl.getContestById);

module.exports = router;