import React from "react";
import Title from "../../Home Page/components/Title";

function ContestDetails(props) {
    return(
        <div data-testid="contest-details" className="contestDetails">
            <Title title={"Contest : " + props.contest.name}/>
            <Title title={"Start Date : " + props.contest.startDate}/>
            <Title title={"End Date : " + props.contest.endDate}/>
        </div>
    );
}

export default ContestDetails;