import React from "react";

function ContestRow({contest, onJoinBtnClick, showDetails}) {
    return (
        <div data-testid="contest-row" className="contestRowContainer">
            <div key={contest._id}>
                <div className="contest-name">
                    <span onClick={() => showDetails(contest._id, contest.status)}>{contest.name}</span>
                </div>
                <div className= "start-date">
                    <span>{new Date(contest.startDate).toLocaleDateString()}</span>
                </div>
                <div className="end-date">
                    <span>{new Date(contest.endDate).toLocaleDateString()}</span>
                </div>
                <div className='status'>
                    <span>{contest.status}</span>
                </div>
                <div className='join-button'>
                    <button
                        className="btnJoinContest"
                        disabled={contest.status !== 'Upcoming'}
                        onClick={() => onJoinBtnClick(contest)}
                    >Join Contest</button>
                </div>
            </div>
        </div>
    );
}

export default ContestRow;