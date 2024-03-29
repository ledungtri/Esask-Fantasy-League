const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: false,
    }
});

module.exports = mongoose.model('Contest', contestSchema);