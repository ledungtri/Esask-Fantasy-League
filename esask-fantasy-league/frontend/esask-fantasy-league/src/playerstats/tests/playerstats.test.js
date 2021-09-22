import React from 'react';
import {render, screen, fireEvent, waitForElementToBeRemoved, waitFor} from '@testing-library/react'
import Playerstats from '../pages/Playerstats'
import axios from "axios";
import DraftButton from '../components/DraftButton';
import '@testing-library/jest-dom'



describe('The button to draft the player shows up only when user is logged in', () => {


  it('Render the draft button when user is logged in ', () => {
    render(<Playerstats loggedin={true}/>);
    const button = screen.getByText('Draft this player');
    expect(button).toBeInTheDocument();
  });

});





