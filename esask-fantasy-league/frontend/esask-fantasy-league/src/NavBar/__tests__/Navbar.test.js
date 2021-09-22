import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import NavBar from './../../App';

test('renders logo', () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav_logo")).toBeInTheDocument();
})

test('renders contest link', () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav_contest")).toBeInTheDocument();
})

test('renders players link', () => {
    render(<NavBar />);
    expect(screen.getByTestId("nav_player")).toBeInTheDocument();
})