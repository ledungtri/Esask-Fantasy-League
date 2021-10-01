import React from 'react'




export default function TeamPerformance(props) {
    const performance = props.performance;
    console.log("props teamPerformance")
    console.log(performance);
    return (

        <>

        <div className="container">
            <div className="row performance-row" >
                <div className="col text-light performance-col"> Towers : {performance? performance.sumTowers:""} </div>
                <div className="col text-light performance-col"> Dragons : {performance? performance.sumDragons:""} </div>
                <div className="col text-light performance-col"> Barons : {performance? performance.sumBarons:""} </div>
                <div className="col text-light performance-col"> Wins : {performance? performance.sumWins:""} </div>
                <div className="w-100"></div>
  
            </div>
        </div>
        </>
    )
}
