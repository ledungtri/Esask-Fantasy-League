/** Author : Nisrine Zbadi 
 * Description: tests for display team stats story.
*/
import {render, screen, fireEvent, waitFor, getByRole, act, cleanup} from '@testing-library/react'
import TeamStats from '../pages/TeamStats'
import '@testing-library/jest-dom'
import * as api from '../api/api'
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { PlayersPerformance, TeamPerformance } from '../components';
import backendHost from '../../api/backendHost';
/** Mocking Variables to use during the tests */
const teamID = '6157377d1058bad48b54845d'; 
const startDate = "2021-09-01";
const endDate = "2021-09-07";
const URL = backendHost.BACKEND_HOST + '/api/teams/'+ teamID +'/'+ startDate+'/'+ endDate; //the link to call for mockups
const fakeTeamData = require('./tests-data/teamData.json'); //this is a json containing fake API response data.

const mockOverContest = {
  status: "Closed",
  startDate: startDate,
  endDate: endDate
}
const mockOnGoingContest = {
  status:"Upcoming",
  startDate:startDate,
  endDate:endDate
}

it('shows the team stats popup',  async () => {
    render(<TeamStats contest={mockOverContest} team={fakeTeamData.data}  />);
    expect(screen.queryByTestId(/team-stats-container/i)).toBeInTheDocument();
   });
  
describe('Testing the API call', () => {
 
  it('makes an API call ',  async () => { 
     render(<TeamStats contest={mockOnGoingContest} team={fakeTeamData.data} />);
     const spy = jest.spyOn(api, 'getData')
     api.getData(teamID, startDate, endDate)
     expect(spy).toHaveBeenCalled();
   });
   it('gets data from the server with 200 status ',  async () => { 
    var mock = new MockAdapter(axios);
    const data = { response: fakeTeamData };
    mock.onGet(URL).reply(200, data);
    axios.get(URL).then((response) => {
      expect(response.status).toEqual(200);
    })
  });

  it('throws an error when the status !== 200 ',  async () => { 
    var mock = new MockAdapter(axios);
    const data = { response: {} };
    mock.onGet(URL).reply(500, data);
    const expectedError = async () => {
      await axios.get(URL);
    };
     expect(expectedError()).rejects.toThrowError();
  });
})   


describe('Showing the team stats only when the contest is not over yet ', () => {
  
  it('Does not show the team stats when the contest is not over',  async () => { 
    render(<TeamStats contest={mockOnGoingContest} team={fakeTeamData.data} />);
    expect(screen.queryByTestId(/teamstats-unavailable/i)).toBeInTheDocument();


   });

  it('Shows the team stats when the contets is over',  async () => { 
    render(<TeamStats contest={mockOverContest} team={fakeTeamData.data} />);
    expect(screen.queryByTestId(/team-stats-container/i)).toBeInTheDocument();
  
   });
});


it('Closes the popup when the button is clicked', async  () => {
  render(<TeamStats contest={mockOverContest} team={fakeTeamData.data} handleClose={()=>{}} />);
  fireEvent.click(screen.getByRole('button', {name:'Close'}));  
  await waitFor(()=>expect(screen.queryByTestId(/team-stats-container/i)).not.toBeInTheDocument());
});


it('Renders the close button ', async () => {
  render(<TeamStats contest={mockOverContest}  team={fakeTeamData.data}  />);
  const closeButton = screen.getByRole('button', {name:'Close'});
  expect(closeButton).toBeInTheDocument();
});

it('Checks if all the player names have links',  async () => {
  var mock = new MockAdapter(axios);
  const data = { response: fakeTeamData };
  mock.onGet(URL).reply(200, data);
  try {
    await axios.get(URL).then((response) => {
      const stats=response.data.response.data.playersData
      act(()=>{
        render(<PlayersPerformance stats={stats} startDate={startDate} endDate={endDate}  />)      
      })
      expect(screen.queryAllByTestId(/player-name/i)).toBeInstanceOf(Array);
    })
  } catch(e) {
    console.error(e)
  }
 
 });


