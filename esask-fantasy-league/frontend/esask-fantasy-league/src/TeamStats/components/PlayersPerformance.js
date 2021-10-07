import React, {useState} from 'react';

import Table from 'react-bootstrap/Table'
import Playerstats from '../../playerstats/pages/Playerstats';



export default function PlayersPerformance(props) {
    const stats = (props.stats);
    const [showPlayerStats, setShowPlayerStats] = useState(false);
    const [summonerId, setSummonerId] = useState();


    const showPlayerDetails = (summonerId) =>{
        setShowPlayerStats(true);
        console.log(summonerId);
        setSummonerId(summonerId);
    }
    const handleClose = () =>{
        setShowPlayerStats(false);
    }
    return (
        <div className="performance_player">
            {showPlayerStats ? 
             <Playerstats summonerId={summonerId} show={showPlayerStats} handleClose={handleClose} 
             startDate={props.startDate} endDate={props.endDate} /> : ""
            }
            <h1 className="text-light text-center">Contest Players Performance</h1>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Name</th>
                <th>Captain</th>
                <th>Kills</th>
                <th>Assists</th>
                <th>Deaths</th>
                <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {stats.map((stat, i) => (       
                    <tr key={i}>
                        <td><a href="#" data-testid="player-name" onClick={()=>showPlayerDetails(stat.summonnerID)}>{stat.summonerName}</a></td>
                        <td>{String(stat.isCaptain).localeCompare(true)==0?"Yes":"No"}</td>
                        <td>{stat.data.kills}</td>
                        <td>{stat.data.assists}</td>
                        <td>{stat.data.deaths}</td>
                        <td>{stat.playerScore}</td>
                        
                    </tr>      
                ))}
                
                
            </tbody>
        </Table>
        
        </div>
    )
}
