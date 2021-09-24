import React from "react";

function ContestHeading () {
    return (
        <div data-testid="contest-list-heading" className="contest-heading">
            <div>
               <div className="h-contest-name">
                    <span>Contest</span>
                </div>
                <div className="h-start-date">
                    <span>Start Date</span>
                </div>
                <div className="h-end-date">
                    <span>End Date</span>
                </div>
                <div className="h-contest-status">
                    <span>Status</span>
                </div> 
            </div>
        </div>
    );
}

export default ContestHeading;