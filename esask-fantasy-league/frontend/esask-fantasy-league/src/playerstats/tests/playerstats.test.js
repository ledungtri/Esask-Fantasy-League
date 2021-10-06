/** Author : Nisrine Zbadi 
 * Description: tests for display player stats story.
*/
import {render, screen, fireEvent, waitFor, getByRole} from '@testing-library/react'
import Playerstats from '../pages/Playerstats'
import DraftButton from '../components/DraftButton';
import '@testing-library/jest-dom'

const summonerID ='-tyH2c-M71YU_U1QomFkLXI2KMeystnXWRK1xWXOBzWm7iU';
const startDate = "2021-09-01";
const endDate = "2021-09-07";

it('gets the data from the server',  async () => {
  render(<Playerstats summonerId={summonerID} show={true} loggedin={true} />);
  await waitFor(()=>screen.queryByTestId(/loadingtext/i));
  await new Promise((resolve) => setTimeout(resolve, 8000)); // 8000 is the time that i know my `query` should be finished.
  await expect(screen.queryByTestId(/loadingtext/i)).not.toBeInTheDocument(); //the loading text shoul disapear after the loading is finished.
 },20000);


 
describe('The button to draft the player shows up only when user is logged in', () => {
  
  it('Does not render the button when logged out ', () => {
    render(<Playerstats show={true}  loggedin={false}/>);
    expect(screen.queryByTestId(/draftbtn/i)).not.toBeTruthy();
  });

  it('Renders the draft button when user is logged in ', async () => {
    render(<Playerstats summonerId={summonerID} show={true}  loggedin={true}/>);
    await waitFor(()=>screen.getByText('Draft this player'));
    const button = screen.getByText('Draft this player');
    expect(button).toBeInTheDocument();
  });
  
});

it('Closes the popup when the button is clicked', async  () => {
  const onClick = jest.fn();
  render(<DraftButton show={true} onClose={onClick} loggedin={true} />);
  await waitFor(()=>screen.getByText('Draft this player'));
  fireEvent.click(screen.getByText('Draft this player'));  
  expect(onClick).toHaveBeenCalled();
});


it('Renders the close button ', async () => {
  render(<Playerstats show={true} startDate={startDate} endDate={endDate} />);
  await  waitFor(()=>screen.getByRole('button', {name:'Close'}));
  const closeButton = screen.getByRole('button', {name:'Close'});
  expect(closeButton).toBeInTheDocument();
});




