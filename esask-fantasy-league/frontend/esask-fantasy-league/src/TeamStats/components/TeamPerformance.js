import React from 'react'
import Table from 'react-bootstrap/Table'




export default function TeamPerformance(props) {
    const performance = props.performance;
    console.log("props teamPerformance")
    console.log(performance);
    return (

        <>

        {/* <div className="container">
            <div className="row performance-row" >
                <div className="col text-light performance-col"> Towers : {performance? performance.towers:""} </div>
                <div className="col text-light performance-col"> Dragons : {performance? performance.dragons:""} </div>
                <div className="col text-light performance-col"> Barons : {performance? performance.barons:""} </div>
                <div className="col text-light performance-col"> Wins : {performance? performance.wins:""} </div>
                <div className="col text-light performance-col"> Captain Bonus Score : {performance? performance.captainBonusScore:""} </div>
                <div className="w-100"></div>
  
            </div>
        </div> */}
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
