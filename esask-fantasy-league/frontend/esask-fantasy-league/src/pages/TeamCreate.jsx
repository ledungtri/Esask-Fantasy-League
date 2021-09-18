import React from "react";
import apis from "../api";





function TeamCreate() {

    async function handleCreateTeam(props){

        const payload = {
            "name": "My Team2", 
            "contestId": "613d65ea63676a0636013920", 
            "players": [
                {"id": "wr37PIyFXfCAaTU6HaAxlIx-glt2GrpqUzoThzFGGb71QWE", "name" : "nifty jg", "value": 0},
                {"id": "uBgj79ORr0ilRONyu1MSEWqVUHH4feQ2mu4tzwUIUsFUQTU", "name" : "Fated Temper", "value": 0},
                {"id": "AmV1jV6kp7ecoMQIvA9pWwBrvOPi_4T22k1nDXPMVZM9xZ4", "name" : "KatEvolved", "value": 0},
                {"id": "MXcrR6nV-lsJOuN1LD-eBv3Hy6DP7jHjhTxUmtVYTA71bQQ", "name" : "BOBtimer", "value": 0},
                {"id": "WBXIbN2oRZpCNl31Mfrqvd7Mhg06FB4fT1OKgEF4_7VgzbQ", "name" : "KryRa", "value": 0},
                {"id": "hZWFpvpRVAmczqbF6gCwU6JvupAYJNmDVEYLFLwxFXItOnY-CTxyLjvVKA", "name" : "HLE Arthur", "value": 0}
            ]
        };
        
        console.log(payload); 

        await apis.createTeam(payload).then(res => {
            console.log("Team created successfully");
        })

    }
    
    
    return (
        <div className="TeamCreate">


                         
            <button onClick={handleCreateTeam}>Create Team</button>
        </div>

        // TODO: contest details
            // TODO: players list
            // TODO: selected players
            //TODO: Add button
    );

    
}

export default TeamCreate;