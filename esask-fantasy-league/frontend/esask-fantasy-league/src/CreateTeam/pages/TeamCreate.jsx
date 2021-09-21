import React, {useState} from "react";
import styled from 'styled-components';
import apis from "../../api/api";
import ContestDetails from "../components/ContestDetails";
import PlayerList from "../../Player List/components/PlayerList";

import TeamCreateCss from "../styles/TeamCreate.css"

function TeamCreate(props) {
    const [teamName, setTeamName] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [selectedPlayers] = useState([]);

    function handleSelectPlayer(player) {

        const length = selectedPlayers.filter(p => p !== null).length;
        if (length < 6 && !selectedPlayers.includes(player)) {
            console.log("player: " + JSON.stringify(player));
            selectedPlayers.push(player);
            console.log("selectedPlayers: " + JSON.stringify(selectedPlayers));
            recalculateTotalValue();
        }
    }

    function handleRemovePlayer(player) {
        const index = selectedPlayers.indexOf(player);
        delete selectedPlayers[index];
        recalculateTotalValue();
    }

    function recalculateTotalValue() {
        let total = 0;
        selectedPlayers.forEach(player => total += player.value);
        setTotalValue(total);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const players = selectedPlayers.filter(p => p !== null);
        if (players.length > 6) {
            // TODO: flash message
            console.log("Error");
            return;
        }

        if (totalValue > 50000) {
            // TODO: check budget
            console.log("Error");
            return;
        }

        const payload = {"name": teamName, "contestId": props.contest._id, "players": selectedPlayers};
        const response = await apis.createTeam(payload);

        // TODO: flash message
        if (response.status === 200) {
            console.log("Team created successfully");
        } else {
            console.log("Error");
        }
    }

    return (
        <div className="TeamCreateContainer">
            <div className="title"><h1>Create a team</h1></div>

            <div>
                <ContestDetails contest={props.contest}/>
            </div>

            <div className='title'>
                <h2>Remaining Budget: ${50000 - totalValue}</h2>
            </div>

            <div data-testid="available-players" className="playerListContainer">
                <PlayerList
                    title="Available Players"
                    playersPerPage={10}
                    showBtn={true}
                    btnText="Select"
                    callback={handleSelectPlayer}
                />
            </div>

            <div data-testid='selected-players' className="playerListContainer">
                <PlayerList
                    players={selectedPlayers}
                    title="Selected Players"
                    showBtn={true}
                    btnText="Remove"
                    callback={handleRemovePlayer}
                />
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
                        onChange={(e) => setTeamName(e.target.value)}
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
