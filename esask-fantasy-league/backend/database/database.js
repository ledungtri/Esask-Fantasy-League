const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(
        'mongodb+srv://user:user123@cluster0.ycj79.mongodb.net/esask-fantasy-league?retryWrites=true&w=majority',
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB.');
}

module.exports = {connect};