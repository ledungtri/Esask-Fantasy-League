const database = require('./database/database');
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const teamRoute = require('./routes/teamRoute');

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
    app.use('/api/teams', teamRoute);
    // TODO: implement player route
    // TODO: implement contest route
    // TODO: implement user route
}

startServer();

module.exports = app;