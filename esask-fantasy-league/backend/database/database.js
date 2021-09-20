const mongoose = require('mongoose');

async function connect() {
    await mongoose.connect(
        process.env.DB_CONNECT,
        { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log('Connected to MongoDB.');
}

module.exports = {connect};