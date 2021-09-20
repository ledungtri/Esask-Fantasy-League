import React, {useState} from "react";
import styled from 'styled-components';
import ContestDetails from "../components/ContestDetails";

const Label = styled.label`
    margin: 5px;
`

function TeamCreate() {
    const [teamName, setTeamName] = useState();
    const handleChange = (e) => setTeamName(e.target.value);

    const handleSubmit = e => {
        e.preventDefault();

        const payload = {
            "name": teamName,
            "contestId": "613d65ea63676a0636013920",
            "players": [
                {"id": "wr37PIyFXfCAaTU6HaAxlIx-glt2GrpqUzoThzFGGb71QWE", "name": "nifty jg", "value": 0},
                {"id": "uBgj79ORr0ilRONyu1MSEWqVUHH4feQ2mu4tzwUIUsFUQTU", "name": "Fated Temper", "value": 0},
                {"id": "AmV1jV6kp7ecoMQIvA9pWwBrvOPi_4T22k1nDXPMVZM9xZ4", "name": "KatEvolved", "value": 0},
                {"id": "MXcrR6nV-lsJOuN1LD-eBv3Hy6DP7jHjhTxUmtVYTA71bQQ", "name": "BOBtimer", "value": 0},
                {"id": "WBXIbN2oRZpCNl31Mfrqvd7Mhg06FB4fT1OKgEF4_7VgzbQ", "name": "KryRa", "value": 0},
                {"id": "hZWFpvpRVAmczqbF6gCwU6JvupAYJNmDVEYLFLwxFXItOnY-CTxyLjvVKA", "name": "HLE Arthur", "value": 0}
            ]
        };
    }

    const contest = {name: "Contest Number 1", startDate: "17/09/2021", endDate: "24/09/2021"};

    return (
        <div className="TeamCreateContainer">

            <ContestDetails contest={contest}/>

            <form className="createTeamForm" onSubmit={handleSubmit}>
                <Label>Team Name:</Label>
                <input
                    type="text"
                    name="teamName"
                    value={teamName}
                    onChange={handleChange}
                    placeholder="Enter your team's name"

                />
                <button type="submit">Create Team</button>
            </form>

        </div>
    );
}

export default TeamCreate;
