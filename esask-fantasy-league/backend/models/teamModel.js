const mongoose = require('mongoose');

const teamPlayerSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    isCaptain: {
        type: Boolean,
        required: true,
        default: false
    },
}, { _id : false });

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contestId: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    players: {
        type: [teamPlayerSchema],
        required: true,
        validate: [
            { validator: validateTeamSize, msg: 'Team must have 6 players' },
            { validator: validateTeamValue, msg: 'Team value must not exceed $50,000' }
            // todo: check has 1 captain
        ]
    }
});

function validateTeamSize(players) {
    return players.length === 6;
}

function validateTeamValue(players) {
    let totalValue = 0;
    players.forEach(player => totalValue += player.value || 0);
    return totalValue <= 50000;
}

module.exports = mongoose.model('teams', teamSchema);