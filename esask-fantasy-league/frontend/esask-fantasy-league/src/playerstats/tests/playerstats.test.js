/** Author : Nisrine Zbadi 
 * Description: tests for display player stats story.
*/
import {render, screen, fireEvent, waitForElementToBeRemoved, waitFor, getByRole, act} from '@testing-library/react'
import Playerstats from '../pages/Playerstats'
import axios from "axios";
import DraftButton from '../components/DraftButton';
import '@testing-library/jest-dom'

const summonerID ='zJz1wEtm2m30q7g3LpKr5r9Fj6ey_leWPIp29EdRsPyKRIs';
// jest.mock('../api/api');

describe('The button to draft the player shows up only when user is logged in', () => {
  it('Not to render the button when logged out ', () => {
    render(<Playerstats show={true}  loggedin={false}/>);
    expect(screen.queryByTestId(/draftbtn/i)).not.toBeTruthy();
  });

  it('Render the draft button when user is logged in ', async () => {
    render(<Playerstats summonerId={summonerID} show={true}  loggedin={true}/>);
    await waitFor(()=>screen.getByText('Draft this player'));
    const button = screen.getByText('Draft this player');
    expect(button).toBeInTheDocument();
  });
  
});

test('Closes the popup when the button is clicked', async  () => {
  const onClick = jest.fn();
  render(<DraftButton show={true} onClose={onClick} loggedin={true} />);
  await waitFor(()=>screen.getByText('Draft this player'));
  fireEvent.click(screen.getByText('Draft this player'));  
  expect(onClick).toHaveBeenCalled();

});


test('Render the close button ', async () => {
  render(<Playerstats show={true} loggedin={true} />);
  await  waitFor(()=>screen.getByRole('button', {name:'Close'}));
  const closeButton = screen.getByRole('button', {name:'Close'});
  expect(closeButton).toBeInTheDocument();
});



test('gets the data from the server',  async () => {
 render(<Playerstats summonerId={summonerID} show={true} loggedin={true} />);
 await waitFor(()=>screen.queryByTestId(/loadingtext/i));
// await new Promise((resolve) => setTimeout(resolve, 8000)); // 9000 is the time that i know my `query` should be finished.
 await waitFor(()=> expect(screen.queryByTestId(/loadingtext/i)).not.toBeInTheDocument());
 screen.debug();
});


