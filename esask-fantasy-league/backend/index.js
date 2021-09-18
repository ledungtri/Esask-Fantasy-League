const database = require('./database/database');
const express = require('express');
const app = express();
const router = express.Router();
const cors = require('cors');
const playerRoute = require('./routes/playerRoute');


function startServer() {
    database.connect().then(() => {
        app.use(express.json());
        app.use(cors(
            {origin: 'http://localhost:3000'}
        ));

        useRoutes();

        const port = 3001;
        app.listen(port, () => console.log(`Listening in port ${port}...`));
    });
}



function useRoutes() {
    // app.use('/api/teams', teamRoute);
    // TODO: implement teams route
    app.use('/api', playerRoute);
    // TODO: implement contest route
    // TODO: implement user route
}

startServer();

module.exports = app;