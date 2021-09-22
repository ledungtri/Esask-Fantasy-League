import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved, waitFor} from '@testing-library/react'
import Playerstats from '../pages/Playerstats'
import axios from "axios";
import DraftButton from '../components/DraftButton';
import '@testing-library/jest-dom'



describe('The button to draft the player shows up only when user is logged in', () => {
  it('Not to render the button when logged out ', () => {
    render(<Playerstats loggedin={false}/>);
    expect(screen.queryByTestId(/draftbtn/i)).not.toBeTruthy();
  });

  it('Render the draft button when user is logged in ', () => {
    render(<Playerstats loggedin={true}/>);
    const button = screen.getByText('Draft this player');
    expect(button).toBeInTheDocument();
  });

});

it('Closes the popup when the button is clicked', async  () => {
  render(<Playerstats loggedin={true} />);
  const button = screen.getByText('Draft this player');
  await waitFor(()=>screen.getByText('Draft this player'));
  fireEvent.click(screen.getByText('Draft this player'));
  await waitForElementToBeRemoved(screen.getByText('Draft this player'));
  expect(button).not.toBeInTheDocument();
});


it('gets the data from the server', async  () => {
  render(<Playerstats />);
  const loadingText = screen.queryByTestId(/loadingtext/i);

  await waitForElementToBeRemoved(screen.queryByTestId(/loadingtext/i));
  expect(loadingText).not.toBeInTheDocument();
});
