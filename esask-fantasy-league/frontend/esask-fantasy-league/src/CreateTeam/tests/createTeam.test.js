import React from "react";
import {CreateTeam} from "../index";
import {render} from "@testing-library/react";

let getByTestId;

beforeEach(() => {
    const mockContest = {_id: "613d65ea63676a0636013920", name: "Weekly Contest", startDate: "2021-09-17T00:00:00.000Z", endDate: "2021-09-24T00:00:00.000Z"};
    const component = render(<CreateTeam location={{contest: mockContest}}/>);
    getByTestId = component.getByTestId;
});

test("contain contest details", () => {
    const contestDetails = getByTestId('contest-details');
    const titles = contestDetails.getElementsByClassName('title');
    expect(titles).toHaveLength(3);
    expect(titles[0].textContent).toEqual("Contest : Weekly Contest");
    expect(titles[1].textContent).toEqual("Start Date : 9/16/2021");
    expect(titles[2].textContent).toEqual("End Date : 9/23/2021");
});

test("contain remaining budget", () => {
    const remainingBudget = getByTestId('remaining-budget');
    expect(remainingBudget.textContent).toEqual("Remaining Budget: $50000");
});

test("contain available players list", () => {
    const availablePlayers = getByTestId('available-players');
    const availablePlayersTitle = availablePlayers.getElementsByClassName('title')[0];
    expect(availablePlayersTitle.textContent).toEqual("Available Players");
});

test("contain selected players list", () => {
    const selectedPlayers = getByTestId('selected-players');
    const selectedPlayersTitle = selectedPlayers.getElementsByClassName('title')[0];
    expect(selectedPlayersTitle.textContent).toEqual("Selected Players");
});

test("contain team name text input field", () => {
    const teamNameInput = getByTestId('team-name-input');
    expect(teamNameInput.placeholder).toEqual("Enter your team's name here");
});

test("contain create button", () => {
    const submitButton = getByTestId('submit-btn');
    expect(submitButton.value).toEqual("Create Team");
});

// test("contain assign captain button", () =>{
//     const captainButton = 
// });