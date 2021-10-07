import React from 'react'
import Table from 'react-bootstrap/Table'




export default function TeamPerformance(props) {
    const performance = props.performance;

    return (

        <>
        <h3 className="text-center text-light">Captain Bonuses:</h3>

        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                <th>Towers</th>
                <th>Dragons</th>
                <th>Barons</th>
                <th>Wins</th>
                <th> Bonus Score</th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                        <td>{performance?performance.towers:""}</td>
                        <td>{performance?performance.dragons:""}</td>
                        <td>{performance?performance.barons:""}</td>
                        <td>{performance?performance.wins:""}</td>
                        <td>{performance?performance.captainBonusScore:""}</td>
                        
                    </tr>      
                
                
            </tbody>
        </Table>
        </>
    )
}
