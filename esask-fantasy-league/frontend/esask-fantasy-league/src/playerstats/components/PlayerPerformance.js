import React from 'react'




export default function playerPerformance(props) {
    const performance = (props.performance)[0];
    const totalGames = (props.totalGames);
    console.log("props performane")
    console.log(performance?performance.wins:"");
    return (

        <>

        <div className="container">
            <div className="row performance-row" >
                <div className="col text-light performance-col"> wins : {performance? performance.wins:""} </div>
                <div className="col text-light performance-col"> Losses : {performance? performance.losses:""} </div>
                <div className="col text-light performance-col"> Total matches : {totalGames? totalGames:""} </div>
                <div className="w-100"></div>
  
            </div>
        </div>
        </>
    )
}
