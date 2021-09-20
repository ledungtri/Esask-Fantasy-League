import React, {useState} from "react";
import apis from "../api";


import styled from 'styled-components';

const Label = styled.label`
    margin: 5px;
`







function TeamCreate() {

    const [values, setValues]=useState({
        teamname:''
    })

    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
        console.log(e.target.value)
        
    }

    const handleSubmit = e =>{
        e.preventDefault();
        //another method
        // const data = new FormData(e.target);
        // const value = data.get('teamname');
        // console.log({ value });
        //
        const payload = {
            "name": e.target.teamname.value, 
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
        

        apis.createTeam(payload).then(res => {
            console.log("Team created successfully");
        })

    }
    
    return (
        <div className="TeamCreateContainer">

            <div className="contestDetails">
                <h1>Start Date : </h1>
                <h1>End Date : </h1>
            </div>

            <form className="createTeamForm" onSubmit={handleSubmit}>
                <Label>Team Name:</Label>
                <input 
                    type="text"
                    name="teamname"
                    value={values.teamname}
                    onChange={handleChange}
                    placeholder="Enter your team's name"

                />
                <button type="submit">Create Team</button>
            </form>

        </div>

        // TODO: contest details
            // TODO: players list
            // TODO: selected players
            //TODO: Add button
    );

    
}

export default TeamCreate;