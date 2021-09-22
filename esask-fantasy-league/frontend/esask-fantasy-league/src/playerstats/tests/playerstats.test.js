import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react'
import Playerstats from './Playerstats'
import axios from "axios";
import DraftButton from '../components/DraftButton';


const loggedin = true;

// test('calls onClick prop when players name clicked', () => {
//     const handleClick = jest.fn()
//     render(<a onClick={handleClick}>Name</a>)
//     fireEvent.click(screen.getByTestId(/name/i))
//     expect(handleClick).toHaveBeenCalledTimes(1)
//   });

describe('The button to draft the player shows up only when user is logged in', () => {
  it('Renders the button when logged in', () => {
    render(<Playerstats />);
     if(loggedin) expect(screen.getByText('Draft this player')).toBeInTheDocument();
     //if(loggedin) expect(screen.getByText('Draft this player')).not.toBeInTheDocument();
     if(!loggedin) expect(screen.getByText('Draft this player')).tobeNull();
  });

  it('Closes the popup when the button is clicked', () => {
    const logSpy = jest.spyOn(console, "log");
    render(<DraftButton loggedin={true}/>);
     fireEvent.click(screen.getByText('Draft this player'));
     expect(logSpy).toHaveBeenCalledTimes(1);
      //expect(screen.getByText('Draft this player')).tobeNull();

     
  });



  // test('Not to render the button when logged out ', () => {
  //   const playersStats = render(<Playerstats />);
  //   const loggedin = playersStats.props.loggedin;
  //   console.log(loggedin);
  //   const button = playersStats.getByText("Draft this player");
  //   if (loggedin) expect(button).toBeInTheDocument();

  // });

});
