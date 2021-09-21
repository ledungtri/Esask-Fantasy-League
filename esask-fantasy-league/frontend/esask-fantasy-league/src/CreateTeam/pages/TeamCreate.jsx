import React, {useState} from "react";
import styled from 'styled-components';
import apis from "../../api/api";
import ContestDetails from "../components/ContestDetails";

import TeamCreateCss from "../styles/TeamCreate.css"







function TeamCreate() {
    const mockContest = {name: "Contest Number 1", startDate: "17/09/2021", endDate: "24/09/2021"};
    const mockPlayers = [
        {"id": "wr37PIyFXfCAaTU6HaAxlIx-glt2GrpqUzoThzFGGb71QWE", "name": "nifty jg", "value": 0},
        {"id": "uBgj79ORr0ilRONyu1MSEWqVUHH4feQ2mu4tzwUIUsFUQTU", "name": "Fated Temper", "value": 0},
        {"id": "AmV1jV6kp7ecoMQIvA9pWwBrvOPi_4T22k1nDXPMVZM9xZ4", "name": "KatEvolved", "value": 0},
        {"id": "MXcrR6nV-lsJOuN1LD-eBv3Hy6DP7jHjhTxUmtVYTA71bQQ", "name": "BOBtimer", "value": 0},
        {"id": "WBXIbN2oRZpCNl31Mfrqvd7Mhg06FB4fT1OKgEF4_7VgzbQ", "name": "KryRa", "value": 0},
        {"id": "hZWFpvpRVAmczqbF6gCwU6JvupAYJNmDVEYLFLwxFXItOnY-CTxyLjvVKA", "name": "HLE Arthur", "value": 0}
    ];

    const [teamName, setTeamName] = useState();
    const handleChange = (e) => setTeamName(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        const payload = {
            "name": teamName,
            "contestId": "613d65ea63676a0636013920",
            "players": mockPlayers
        };

        apis.createTeam(payload).then(res => {
            console.log("Team created successfully");
        });
    }



    return (
        <div className="TeamCreateContainer">
            

            <div>
                <ContestDetails contest={mockContest}/>
            </div>
            
            

            <form className="createTeamForm" onSubmit={handleSubmit}>
                <div className="outerDiv_input_button">
                <div  className="labelHeading">
                <label><h3>Team Name:</h3></label>
                </div>
                <div className="inputFieldDiv">
                    <input 
                        type="text" id="fname"
                        name="teamName"
                        value={teamName}
                        onChange={handleChange}
                        placeholder="Enter your team's name here"
                    />
                </div>
                </div>
                <input type="submit" value="Create Team"/>
                
            </form>

        </div>
    );
}

export default TeamCreate;
