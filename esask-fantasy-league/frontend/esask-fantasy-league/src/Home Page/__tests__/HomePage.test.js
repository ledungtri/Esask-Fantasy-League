import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Homepage from './../../App';

test('renders the logo in the page', () => {
    render(<Homepage />);
    expect(screen.getByTestId("large_logo")).toBeInTheDocument();
})

test('renders the players div', () => {
    render(<Homepage />);
    const linkElement = screen.getByText("Top players from the Grand Master League");
    expect(linkElement).toBeInTheDocument();
})

test('renders the contest div', () => {
    render(<Homepage />);
    const linkElement = screen.getByText("Create a team and compete against other participants");
    expect(linkElement).toBeInTheDocument();
})




