import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';


test('renders the search button in the page', () => {
    render(<SearchBar />);
    expect(screen.getByTestId("test_search_btn")).toBeInTheDocument();
})

test('renders the search input field in the page', () => {
    render(<SearchBar />);
    expect(screen.getByTestId("test_search_field")).toBeInTheDocument();
})