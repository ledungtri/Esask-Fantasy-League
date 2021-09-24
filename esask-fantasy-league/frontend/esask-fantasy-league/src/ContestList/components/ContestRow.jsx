import React from "react";

function ContestRow({contest, onJoinBtnClick}) {
    return (
        <div data-testid="contest-row" className="contestRowContainer">
            <div key={contest._id}>
                <div className="contest-name">
                    <span>{contest.name}</span>
                </div>
                <div className= "start-date">
                    <span>{new Date(contest.startDate).toLocaleDateString()}</span>
                </div>
                <div className="end-date">
                    <span>{new Date(contest.endDate).toLocaleDateString()}</span>
                </div>
                <div className='join-contest-status'>
                    <button className="btnJoinContest" disabled={!contest.isContestOpen} onClick={() => onJoinBtnClick(contest)}>
                        {contest.isContestOpen ? 'Join Contest' : 'Contest Closed'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ContestRow;