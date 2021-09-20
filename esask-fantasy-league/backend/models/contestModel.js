const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },

    isContestOpen: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('Contest', contestSchema);