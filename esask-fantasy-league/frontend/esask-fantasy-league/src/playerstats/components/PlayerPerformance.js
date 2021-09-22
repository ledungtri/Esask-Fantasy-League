import React from 'react'




export default function playerPerformance(props) {
    const performance = (props.performance)[0];
    console.log("props performane")
    console.log(performance?performance.wins:"");
    return (

        <>

        <div class="container">
            <div class="row performance-row" >
                <div class="col text-light performance-col"> wins : {performance? performance.wins:""} </div>
                <div class="col text-light performance-col"> Losses : {performance? performance.losses:""} </div>
                <div class="col text-light performance-col"> Total matches : {performance? performance.losses:""} </div>
                <div class="w-100"></div>
  
            </div>
        </div>
        </>
    )
}
