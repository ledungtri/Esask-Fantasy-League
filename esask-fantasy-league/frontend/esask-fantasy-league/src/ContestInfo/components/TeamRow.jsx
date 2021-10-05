import React, {useState} from "react";
import TeamStats from "../../TeamStats/pages/TeamStats";

function TeamRow ({team, contest}) {
    const [showTeamStats, setShowTeamStats] = useState(false);

    return (
        <div data-testid="team-row" className="teamRowContainer">
            {showTeamStats ? <TeamStats contest={contest} team={team} handleClose={() => setShowTeamStats(false)}/> : ""}
            <div>
                <div className="team-rank" display={(contest.status === ("Upcoming"||"In progress")) ? "none" : "block"}>
                    <span>{team.rank}</span>
                </div>
               <div onClick={() => setShowTeamStats(true)} className="team-name">
                    <span>{team.name}</span>
                </div>
                <div className="team-score" display={(contest.status === ("Upcoming"||"In progress")) ? "none" : "block"}>
                    <span>{team.score}</span>
                </div>
            </div>
        </div>
    );
}

export default TeamRow;