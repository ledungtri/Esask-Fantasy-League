import React from "react";
import contestDetails from "../styles/contestDetails.css"



function ContestDetails(props) {
    console.log(JSON.stringify(props.contest));
    return(
        <div className="contestDetails">
            <h1>{props.contest.name}</h1>
            <div className="outter_div">
                <div className="start_div">
                <h3>Start Date : </h3>
                </div>
                <div className="end_div">
                <h3>End Date : </h3>
                </div>
            </div>
            
        </div>
    );
}

export default ContestDetails;