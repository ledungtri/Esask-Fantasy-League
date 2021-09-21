import React from "react";
import {TeamCreate} from "../index";
import {render} from "@testing-library/react";

test("create team test", () => {
    const component =  render(<TeamCreate/>);
    // TODO: contest details title

    const availablePlayers = component.getByTestId('available-players').firstChild;
    const availablePlayersTitle = availablePlayers.getElementsByClassName('title')[0];
    expect(availablePlayersTitle.textContent).toEqual("Available Players");

    const selectedPlayers = component.getByTestId('selected-players').firstChild;
    const selectedPlayersTitle = selectedPlayers.getElementsByClassName('title')[0];
    expect(selectedPlayersTitle.textContent).toEqual("Selected Players");

    //TODO: expect teamName input label
});