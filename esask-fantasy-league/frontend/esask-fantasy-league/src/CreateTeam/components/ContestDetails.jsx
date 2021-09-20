import React from "react";

function ContestDetails(props) {
    console.log(JSON.stringify(props.contest));
    return(
        <div className="contestDetails">
            <h1>{props.contest.name}</h1>
            <h1>Start Date : </h1>
            <h1>End Date : </h1>
        </div>
    );
}

export default ContestDetails;