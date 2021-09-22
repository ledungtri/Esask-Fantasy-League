import React, {useState} from "react";
import apis from "../../api/api";
import ContestDetails from "../components/ContestDetails";
import PlayerList from "../../Player List/components/PlayerList";
import Title from "../../Home Page/components/Title";

function CreateTeam(props) {
    const [teamName, setTeamName] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [selectedPlayers] = useState([]);

    function handleSelectPlayer(player) {
        const length = selectedPlayers.filter(p => p !== null).length;
        if (length < 6 && !selectedPlayers.includes(player)) {
            selectedPlayers.push(player);
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
        if (players.length !== 6) {
            // TODO: flash message
            console.log("players.length !== 6");
            return;
        }

        if (totalValue > 50000) {
            // TODO: flash message
            console.log("totalValue > 50000");
            return;
        }

        const payload = {"name": teamName, "contestId": props.contest._id, "players": selectedPlayers};
        try {
            const response = await apis.createTeam(payload);
            // TODO: flash message
            console.log("Team created successfully");
        } catch (e) {
            // TODO: flash message
            console.log(JSON.stringify(e));
        }
    }

    return (
        <div className="TeamCreateContainer">
            <div className="title"><h1>Create a team</h1></div>

            <div>
                <ContestDetails contest={props.contest}/>
            </div>

            <div data-testid="remaining-budget" className='title'>
                <h2>Remaining Budget: ${50000 - totalValue}</h2>
            </div>

            <div data-testid="available-players" className="playerListContainer">
                <Title title="Available Players"/>
                <PlayerList disableTitle showBtn btnText="Select" callback={handleSelectPlayer}/>
            </div>

            <div data-testid='selected-players' className="playerListContainer">
                <Title title="Selected Players"/>
                <PlayerList players={selectedPlayers} disableTitle showBtn btnText="Remove" callback={handleRemovePlayer}/>

                <form className="createTeamForm" onSubmit={handleSubmit}>
                    <input
                        data-testid='team-name-input'
                        type="text"
                        name="teamName"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Enter your team's name here"
                    />
                    <input data-testid='submit-btn' type="submit" value="Create Team"/>
                </form>
            </div>
        </div>
    );
}

export default CreateTeam;
