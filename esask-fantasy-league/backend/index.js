const database = require('./database/database');
const express = require('express');
const app = express();
const cors = require('cors');
const playerRoute = require('./routes/playerRoute');
const playerRouter = require('./routes/playerRoute');
const teamRoute = require('./routes/teamRoute');
const dotenv = require('dotenv');
const contestRoute = require('./routes/contestRoute');

function startServer() {
    dotenv.config();

    database.connect().then(() => {
        app.use(express.json());
        app.use(cors());

        useRoutes();

        const port = process.env.PORT || 3001;
        app.listen(port, () => console.log(`Listening in port ${port}...`));
    });
}

function useRoutes() {
    app.use('/api/teams', teamRoute);
    app.use('/api', playerRoute);
    app.use('/api', playerRouter);
    app.use('/api', contestRoute);
    // TODO: implement user route
}

startServer();

module.exports = app;