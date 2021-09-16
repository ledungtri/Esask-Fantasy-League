const database = require('./database/database');
const express = require('express');
const app = express();
const cors = require('cors');


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
    // TODO: implement player route
    // TODO: implement contest route
    // TODO: implement user route
}

startServer();

module.exports = app;