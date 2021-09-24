import React from "react";
import {render,screen,within} from '@testing-library/react'
import '@testing-library/jest-dom';
import ContestList from "../components/ContestList";

const mockContestData = {"success":true,"data":[{"_id":"613d65ea63676a0636013920","name":"Contest number 1","startDate":"2021-09-12T00:00:00.000Z","endDate":"2021-09-19T00:00:00.000Z","isContestOpen":false,"__v":0},{"_id":"614a95ba0ef0f364014b401c","name":"Contest number 2","startDate":"2021-09-21T06:00:00.000Z","endDate":"2021-09-27T00:00:00.000Z","isContestOpen":false,"__v":0},{"_id":"614a95ee0ef0f364014b401d","name":"Contest number 3","startDate":"2021-09-28T00:00:00.000Z","endDate":"2021-10-05T00:00:00.000Z","isContestOpen":true,"__v":0}]};

beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockContestData)
    })
    render(<ContestList />);
});

afterEach(() => {
jest.restoreAllMocks();
});

test('check if heading of list of contests is displayed', () => {
    screen.getByText("Contest");
    screen.getByText("Start Date");
    screen.getByText("End Date");
    screen.getByText("Status");
});

test('check if rows are correctly displayed', async () => {
    const row1 = within((await screen.findAllByTestId("contest-row"))[0])
    row1.getByText("Contest number 1")
    const row3 = within((await screen.findAllByTestId("contest-row"))[2])
    row3.getByText("Contest number 3")
});

test('check if buttons are disabled for a closed contest and enabled for an open contest', async () => {
    const row1 = within((await screen.findAllByTestId("contest-row"))[0])
    expect(row1.getByRole("button", {name: /Contest Closed/i})).toBeDisabled();
    const row3 = within((await screen.findAllByTestId("contest-row"))[2])
    expect(row3.getByRole("button", {name: /Join Contest/i})).toBeEnabled();
});