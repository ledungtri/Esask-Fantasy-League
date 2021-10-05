import React from "react";
import {render,screen,within, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import ContestInfo from "../pages/ContestInfo";

const mockContestFinished = {"success": true,
                            "data": {
                                "contest": {
                                    "_id": "614a95ee0ef0f364014b401e",
                                    "name": "Contest number 1",
                                    "startDate": "2021-09-23T00:00:00.000Z",
                                    "endDate": "2021-09-30T00:00:00.000Z",
                                    "isContestOpen": false,
                                    "__v": 0
                                },
                                "participatedTeam": [
                                    {
                                        "id": "6157481b1058bad48b54846b",
                                        "score": 894,
                                        "name": "Team5",
                                        "captainBonus": {
                                            "towers": 27,
                                            "dragons": 9,
                                            "barons": 2,
                                            "wins": 2,
                                            "captainBonusScore": 82.5
                                        },
                                        "playersData": [
                                            {
                                                "summonerName": "FZ3R0",
                                                "summonnerID": "MBhKZAA3MmM7HMi5cf7-hF7uxsVBVpb7nmJ8ByDCv8Ev0uA",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 28,
                                                    "assists": 31,
                                                    "deaths": 29,
                                                    "wins": 1,
                                                    "towers": 22,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 117
                                            },
                                            {
                                                "summonerName": "Dragonmini",
                                                "summonnerID": "HcsH1v8jOYvOtwHTGC0QKSddQztZKXkVXylA6f218y4yR8M",
                                                "isCaptain": true,
                                                "data": {
                                                    "kills": 41,
                                                    "assists": 28,
                                                    "deaths": 22,
                                                    "wins": 2,
                                                    "towers": 27,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 235.5
                                            },
                                            {
                                                "summonerName": "Eric Wei",
                                                "summonnerID": "n_boXS6G69RCIqsCefz1_W2vCjOB6O9ULAS7X75wm9Zi4ds",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 32,
                                                    "assists": 25,
                                                    "deaths": 36,
                                                    "wins": 1,
                                                    "towers": 16,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 110
                                            },
                                            {
                                                "summonerName": "animegirl2007",
                                                "summonnerID": "83hEbwsr4bp38SzgfhDNXJOCK-YfuXjgh6Zcs6KhaXeHmh0v",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 21,
                                                    "assists": 56,
                                                    "deaths": 24,
                                                    "wins": 4,
                                                    "towers": 34,
                                                    "dragons": 6,
                                                    "barons": 4
                                                },
                                                "playerScore": 151
                                            },
                                            {
                                                "summonerName": "rank1mandingo",
                                                "summonnerID": "uDCGK1nfavei3-MPTCRxfHHlQrKwFlzs5XwTcdYv0nlOQjY",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 20,
                                                    "assists": 42,
                                                    "deaths": 30,
                                                    "wins": 3,
                                                    "towers": 30,
                                                    "dragons": 11,
                                                    "barons": 5
                                                },
                                                "playerScore": 114
                                            },
                                            {
                                                "summonerName": "A5PECT",
                                                "summonnerID": "tVhbl5d8qyBUkh6LU-qsNmu93aM_sBW4rb7bgtJQvi8m7Vk",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 29,
                                                    "assists": 16,
                                                    "deaths": 35,
                                                    "wins": 1,
                                                    "towers": 16,
                                                    "dragons": 4,
                                                    "barons": 1
                                                },
                                                "playerScore": 84
                                            }
                                        ],
                                        "rank": 1
                                    }
                                ]
                            }
}
const mockContestUpcoming = {"success": true,
                            "data": {
                                "contest": {
                                    "_id": "614a95ee0ef0f364014b401e",
                                    "name": "Contest number 1",
                                    "startDate": "2021-10-23T00:00:00.000Z",
                                    "endDate": "2021-10-30T00:00:00.000Z",
                                    "isContestOpen": false,
                                    "__v": 0
                                },
                                "participatedTeam": [
                                    {
                                        "id": "6157481b1058bad48b54846b",
                                        "score": 0,
                                        "name": "Team5",
                                        "captainBonus": {
                                            "towers": 27,
                                            "dragons": 9,
                                            "barons": 2,
                                            "wins": 2,
                                            "captainBonusScore": 82.5
                                        },
                                        "playersData": [
                                            {
                                                "summonerName": "FZ3R0",
                                                "summonnerID": "MBhKZAA3MmM7HMi5cf7-hF7uxsVBVpb7nmJ8ByDCv8Ev0uA",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 28,
                                                    "assists": 31,
                                                    "deaths": 29,
                                                    "wins": 1,
                                                    "towers": 22,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 117
                                            },
                                            {
                                                "summonerName": "Dragonmini",
                                                "summonnerID": "HcsH1v8jOYvOtwHTGC0QKSddQztZKXkVXylA6f218y4yR8M",
                                                "isCaptain": true,
                                                "data": {
                                                    "kills": 41,
                                                    "assists": 28,
                                                    "deaths": 22,
                                                    "wins": 2,
                                                    "towers": 27,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 235.5
                                            },
                                            {
                                                "summonerName": "Eric Wei",
                                                "summonnerID": "n_boXS6G69RCIqsCefz1_W2vCjOB6O9ULAS7X75wm9Zi4ds",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 32,
                                                    "assists": 25,
                                                    "deaths": 36,
                                                    "wins": 1,
                                                    "towers": 16,
                                                    "dragons": 9,
                                                    "barons": 2
                                                },
                                                "playerScore": 110
                                            },
                                            {
                                                "summonerName": "animegirl2007",
                                                "summonnerID": "83hEbwsr4bp38SzgfhDNXJOCK-YfuXjgh6Zcs6KhaXeHmh0v",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 21,
                                                    "assists": 56,
                                                    "deaths": 24,
                                                    "wins": 4,
                                                    "towers": 34,
                                                    "dragons": 6,
                                                    "barons": 4
                                                },
                                                "playerScore": 151
                                            },
                                            {
                                                "summonerName": "rank1mandingo",
                                                "summonnerID": "uDCGK1nfavei3-MPTCRxfHHlQrKwFlzs5XwTcdYv0nlOQjY",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 20,
                                                    "assists": 42,
                                                    "deaths": 30,
                                                    "wins": 3,
                                                    "towers": 30,
                                                    "dragons": 11,
                                                    "barons": 5
                                                },
                                                "playerScore": 114
                                            },
                                            {
                                                "summonerName": "A5PECT",
                                                "summonnerID": "tVhbl5d8qyBUkh6LU-qsNmu93aM_sBW4rb7bgtJQvi8m7Vk",
                                                "isCaptain": false,
                                                "data": {
                                                    "kills": 29,
                                                    "assists": 16,
                                                    "deaths": 35,
                                                    "wins": 1,
                                                    "towers": 16,
                                                    "dragons": 4,
                                                    "barons": 1
                                                },
                                                "playerScore": 84
                                            }
                                        ],
                                        "rank": 1
                                    }
                                ]
                            }
}


beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockContestFinished)
    })
    render(<ContestInfo contestID={mockContestFinished.data.contest._id} status="Finished" show={true}/>);
});

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Check if a contest finished is loaded in the page', () => {
    it('Show the name of the contest and its status', async () => {
        screen.getByText("Contest : Contest number 1");
        screen.getByText("Status : Finished");
    });

    it('shows the winner of the contest and its score', async () => {
        const winner = within((await screen.findAllByTestId("team-row"))[0])
        winner.getByText("1");
        winner.getByText("Team5");
        winner.getByText("894");
    })
});

describe('Check if when the page renders', () => {
    it('the close button is rendered', async () => {
        await  waitFor(()=>screen.getByRole('button', {name:'Close'}));
        const closeButton = screen.getByRole('button', {name:'Close'});
        expect(closeButton).toBeInTheDocument();
    })
    
    it('the Join Contest button is rendered', async () => {
        await screen.findByTestId("btn-join-test");
    });
});