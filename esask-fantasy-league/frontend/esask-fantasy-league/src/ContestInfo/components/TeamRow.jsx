import React from "react";

function TeamRow ({team, contestStatus}) {
    return (
        <div data-testid="team-row" className="teamRowContainer">
            <div>
                <div className="team-rank" display={(contestStatus === ("Upcoming"||"In progress")) ? "none" : "block"}>
                    <span>{team.rank}</span>
                </div>
               <div className="team-name">
                    <span>{team.name}</span>
                </div>
                <div className="team-score" display={(contestStatus === ("Upcoming"||"In progress")) ? "none" : "block"}>
                    <span>{team.score}</span>
                </div>
            </div>
        </div>
    );
}

export default TeamRow;