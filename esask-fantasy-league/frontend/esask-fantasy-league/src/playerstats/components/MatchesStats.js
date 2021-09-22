import React from 'react'
import Table from 'react-bootstrap/Table'



export default function MatchesStats(props) {
    const stats = (props.stats);
    console.log(typeof(stats))
    console.log("props stats")
    console.log(stats?stats:"");
    return (
        <div className="performance_player">
            <h1 className="text-light text-center">Game History</h1>
            <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Date</th>
                <th>Result</th>
                <th>Position</th>
                <th>Assists</th>
                <th>Deaths</th>
                <th>Kills</th>
                </tr>
            </thead>
            <tbody>
                {stats.map((stat) => (       
                    <tr>
                        <td>{stat.date}</td>
                        <td>{String(stat.data.win).localeCompare(true)==0?"Won":"Lost"}</td>
                        <td>{stat.position}</td>
                        <td>{stat.data.assists}</td>
                        <td>{stat.data.deaths}</td>
                        <td>{stat.data.kills}</td>
                        
                    </tr>      
                ))}
                
                
            </tbody>
        </Table>
        
        </div>
    )
}
