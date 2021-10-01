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

    const[showCaptain, setShowCaptain] = useState(false);
    

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

    //to be completed
    function handleAssignCaptain(player){

        console.log(selectedPlayers)
                
        for(let x=0; x<selectedPlayers.length; x++){
            if(selectedPlayers[x].isCaptain){
                selectedPlayers[x].isCaptain=false;
            }
        }

        const index = selectedPlayers.indexOf(player);
        player.isCaptain=true;
        selectedPlayers[index]=player;

        // console.log(selectedPlayers[index])

        // console.log(selectedPlayers[index].isCaptain)
        // console.log(selectedPlayers[index].summonerName)
        setShowCaptain(true);
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

        const payload = {"name": teamName, "contestId": contest._id, "players": players};
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
            <div className="title"><h3>Create a team</h3></div>

            <div>
                <ContestDetails contest={contest}/>
            </div>

            <div data-testid="remaining-budget" className='title'>
                <h4>Remaining Budget: ${50000 - totalValue}</h4>
            </div>

            <div data-testid="available-players" className="playerListContainer">
                <PlayerList title="Available Players" showBtn btnText="Select" callback={handleSelectPlayer}/>
            </div>

            <div data-testid='selected-players' className="playerListContainer">

                <PlayerList players={selectedPlayers} title="Selected Players" showBtnCapt showBtn btnText="Remove" callback={handleRemovePlayer} captainCallback={handleAssignCaptain}/>

                {messageType? <PopUpMessage type={messageType} body={message} closeHandler={closeModal}/> : ""}
                {showCaptain?
                    <span>
                        
                    </span>
                :""}

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
