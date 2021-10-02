import React from 'react'




export default function playerPerformance(props) {
    const performance = (props.performance)[0];
    const score = props.totalScore;
    console.log("props")
    console.log(props)
    // console.log("props performane")
    // console.log(performance?performance.wins:"");
    return (

        <>

        <div className="container">
            <div className="row performance-row" >
                <div className="col text-light performance-col"> wins : {performance? performance.wins:""} </div>
                <div className="col text-light performance-col"> Losses : {performance? performance.losses:""} </div>
                <div className="w-100"></div>
  
            </div>
        </div>
        </>
    )
}
