/** Author : Nisrine Zbadi 
 * Description: tests for display team stats story.
*/
import {render, screen, fireEvent, waitFor, getByRole} from '@testing-library/react'
import TeamStats from '../pages/TeamStats'
import '@testing-library/jest-dom'


it('shows the popup',  async () => {
    render(<TeamStats contestOver={true} loggedin={true} />);
    expect(screen.queryByTestId(/team-stats-container/i)).toBeInTheDocument();
   });
  
it('shows the loading message before loading',  async () => {
    render(<TeamStats />);
    expect(screen.queryByTestId(/loadingtext/i)).toBeInTheDocument();
   
   });
it('gets a response from the server',  async () => { //check if the response is 200
    render(<TeamStats />);
    await waitFor(()=>screen.queryByTestId(/loadingtext/i));
    await new Promise((resolve) => setTimeout(resolve, 8000)); // 8000 is the time that i know my `query` should be finished.
    await expect(screen.queryByTestId(/loadingtext/i)).not.toBeInTheDocument(); //the loading text shoul disapear after the loading is finished.
   },9000);

describe('Showing the team stats only when the contest is not over yet ', () => {
  it('Does not show the team stats when the contest is not over',  async () => { //check if the response is 200
    render(<TeamStats contestOver={false} />);
    expect(screen.queryByTestId(/stats-section/i)).not.toBeInTheDocument();
   });

  it('Shows the team stats when the contets is over',  async () => { //check if the response is 200
    render(<TeamStats contestOver={true} />);
    expect(screen.queryByTestId(/stats-section/i)).toBeInTheDocument();
  
   });
});

it('Closes the popup when the button is clicked', async  () => {
  const onClick = jest.fn();
  render(<TeamStats  />);
  fireEvent.click(screen.getByRole('button', {name:'Close'}));  
  expect(screen.queryByTestId(/stats-section/i)).not.toBeInTheDocument();
  expect(onClick).toHaveBeenCalled();
});


it('Renders the close button ', async () => {
  render(<TeamStats  />);
  await  waitFor(()=>screen.getByRole('button', {name:'Close'}));
  const closeButton = screen.getByRole('button', {name:'Close'});
  expect(closeButton).toBeInTheDocument();
});




