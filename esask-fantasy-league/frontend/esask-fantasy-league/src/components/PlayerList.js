import React, {useState, useEffect} from 'react'

function PlayerList() {
    const [playerList, setPlayerList] = useState([]);

    async function fetchPlayersList(){
        const res = await fetch("http://localhost:3001/api/playerlist");
        res.json().then(res => setPlayerList(res.entries))
    }

    useEffect(() => {
        fetchPlayersList();
    })
   
    

    return (
        <div>
            <div>
                Players List
                <ol>
                    {playerList.map(player => (
                        <li key={player.summonerId}>
                            <div>
                                <p>{player.summonerName}</p>
                                <p>{player.leaguePoints}</p>
                            </div>
                        </li>
                    ))}
                </ol>
                
            </div>
        </div>
    )
}

export default PlayerList
