const database = require('./database/database');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

const contestRoute = require('./routes/contestRoute');

function startServer() {
    dotenv.config();

    database.connect().then(() => {
        app.use(express.json());
        app.use(cors(
            {origin: 'http://localhost:3000'}
        ));

        useRoutes();

        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Listening in port ${port}...`));
    });
}

function useRoutes() {
    // app.use('/api/teams', teamRoute);
    // TODO: implement teams route
    // TODO: implement player route
    app.use('/api/contests', contestRoute);
    // TODO: implement user route
}

startServer();

module.exports = app;