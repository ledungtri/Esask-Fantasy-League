import React from "react";
import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import ContestList from "../components/ContestList";


beforeEach(() => {
    const mockContest = {_id: "613d65ea63676a0636013920", name: "Contest number 1", startDate: "2021-09-20", endDate: "24/09/2021"};
    render(<ContestList contest={mockContest}/>);
})

test('check if heading of list of contests is displayed', () => {
    const contestName = screen.getByText("Contest");
    const contestStartDate = screen.getByText("Start Date");
    const contestEndDate = screen.getByText("End Date");
    const contestStatus = screen.getByText("Status");
    expect(contestName).toBeInTheDocument();
    expect(contestStartDate).toBeInTheDocument();
    expect(contestEndDate).toBeInTheDocument();
    expect(contestStatus).toBeInTheDocument();
});

// test('check if the first contest of the database is loaded correctly', () => {
//     const firstContestName = screen.getByText("Contest number 1");
//     const firstContestStartDate = screen.getByText("2021-09-12");
//     const firstContestEndDate = screen.getByText("2021-09-19");
//     const firstContestStatus = screen.getByText("Contest Closed")
//     expect(firstContestName).toBeInTheDocument();
//     expect(firstContestStartDate).toBeInTheDocument();
//     expect(firstContestEndDate).toBeInTheDocument();
//     expect(firstContestStatus).toBeInTheDocument();
// });