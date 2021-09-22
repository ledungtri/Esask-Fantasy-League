import React, {useState} from "react";
import apis from "../../api/api";
import ContestDetails from "../components/ContestDetails";
import PlayerList from "../../Player List/components/PlayerList";
import Title from "../../Home Page/components/Title";
import PopUpMessage from "../components/PopUpMessage";

function CreateTeam(props) {
    const contest = (props.location && props.location.contest) || {};
    const [teamName, setTeamName] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [selectedPlayers] = useState([]);

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState('');

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

    function closeModal(){
        setMessageType('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const players = selectedPlayers.filter(p => p !== null);
        if (players.length !== 6) {
            setMessage("There should be 6 players");
            setMessageType('error');
            return;
        }

        if (totalValue > 50000) {
            setMessage("Budget exceeded. You can create a team only worth $50,000");
            setMessageType('error');
            return;
        }

        if (!teamName) {
            setMessage("Please enter team name");
            setMessageType('error');
            return;
        }

        const payload = {"name": teamName, "contestId": contest._id, "players": selectedPlayers};
        try {
            await apis.createTeam(payload);
            setMessage("Team Created Successfully");
            setMessageType('success');
        } catch (e) {
            setMessage("Error");
            setMessageType('error');
        }
    }

    return (
        <div className="TeamCreateContainer">
            <div className="title"><h1>Create a team</h1></div>

            <div>
                <ContestDetails contest={contest}/>
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

                {messageType? <PopUpMessage type={messageType} body={message} closeHandler={closeModal}/> : ""}

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
