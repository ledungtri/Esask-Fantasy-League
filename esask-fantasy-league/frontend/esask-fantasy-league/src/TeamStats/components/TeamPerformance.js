import React from 'react'




export default function TeamPerformance(props) {
    const performance = props.performance;
    console.log("props teamPerformance")
    console.log(performance);
    return (

        <>

        <div className="container">
            <div className="row performance-row" >
                <div className="col text-light performance-col"> Towers : {performance? performance.towers:""} </div>
                <div className="col text-light performance-col"> Dragons : {performance? performance.dragons:""} </div>
                <div className="col text-light performance-col"> Barons : {performance? performance.barons:""} </div>
                <div className="col text-light performance-col"> Wins : {performance? performance.wins:""} </div>
                <div className="col text-light performance-col"> Captain Bonus Score : {performance? performance.captainBonusScore:""} </div>
                <div className="w-100"></div>
  
            </div>
        </div>
        </>
    )
}
