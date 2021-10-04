import React from "react";

function TeamsListHeading () {
    return (
        <div data-testid="teams-list-heading" className="teams-list-heading">
            <div>
                <div className="h-team-rank">
                    <span>Contest Rank</span>
                </div>
               <div className="h-team-name">
                    <span>Team's name</span>
                </div>
                <div className="h-team-score">
                    <span>Score</span>
                </div>
            </div>
        </div>
    );
}

export default TeamsListHeading;