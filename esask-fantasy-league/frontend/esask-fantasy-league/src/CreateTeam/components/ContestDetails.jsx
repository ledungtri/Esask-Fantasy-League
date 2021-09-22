import React from "react";
import Title from "../../Home Page/components/Title";

function ContestDetails(props) {
    return(
        <div data-testid="contest-details" className="contestDetails">
            <Title title={"Contest : " + props.contest.name}/>
            <Title title={"Start Date : " + new Date(props.contest.startDate).toLocaleDateString()}/>
            <Title title={"End Date : " + new Date(props.contest.endDate).toLocaleDateString()}/>
        </div>
    );
}

export default ContestDetails;