import React from "react";
import {render,screen,within} from '@testing-library/react';
import '@testing-library/jest-dom';
import ContestDetails from "../pages/ContestDetails";

// const mockContestData = {"success":true,"data":[{"_id":"613d65ea63676a0636013920","name":"Contest number 1","startDate":"2021-09-12T00:00:00.000Z","endDate":"2021-09-19T00:00:00.000Z","isContestOpen":false,"__v":0},{"_id":"614a95ba0ef0f364014b401c","name":"Contest number 2","startDate":"2021-09-21T06:00:00.000Z","endDate":"2021-09-27T00:00:00.000Z","isContestOpen":false,"__v":0},{"_id":"614a95ee0ef0f364014b401d","name":"Contest number 3","startDate":"2021-09-28T00:00:00.000Z","endDate":"2021-10-05T00:00:00.000Z","isContestOpen":true,"__v":0}]};
const mockContestFinished = {"data": {"_id":"613d65ea63676a0636013920","name":"Contest number 1","startDate":"2021-09-12T00:00:00.000Z","endDate":"2021-09-19T00:00:00.000Z","isContestOpen":false,"__v":0}};
const mockContestInProgress = {"data": {"_id":"613d65ea63676a0636013920","name":"Contest number 1","startDate":"2021-09-12T00:00:00.000Z","endDate":"2021-09-19T00:00:00.000Z","isContestOpen":false,"__v":0}};
const mockContestUpcoming = {"data": {"_id":"613d65ea63676a0636013920","name":"Contest number 1","startDate":"2021-09-12T00:00:00.000Z","endDate":"2021-09-19T00:00:00.000Z","isContestOpen":true,"__v":0}};

beforeEach(() => {
//     jest.spyOn(global, 'fetch').mockResolvedValue({
//       json: jest.fn().mockResolvedValue(mockContestData)
//     })
    // to confirm if we will change the component's name 
    // because Bill has already used this name
    // render(<ContestDetails />);
// });

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Check if a contest finished is loaded in the page', () => {
    it('Show the name of the contest and its status', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockContestFinished)
        })
        render(<ContestDetails />);
        screen.getByText("Contest number 1");
        screen.getByText("Finished");
    });

    it('Show the team list and the score of each team', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockContestFinished)
        });
        render(<ContestDetails />);
        const row1 = within((await screen.findAllByTestId("team-row"))[0])
        row1.getByText("Team 1");
        row1.getByText("100");
    })
});

describe('Check if the contest detail window closes when requested', () => {
    it('close the window when clicking in close button', async () => {
        jest.spyOn(global, 'fetch').mockResolvedValue({
            json: jest.fn().mockResolvedValue(mockContestFinished)
        });
        render(<ContestDetails />);

    })
});