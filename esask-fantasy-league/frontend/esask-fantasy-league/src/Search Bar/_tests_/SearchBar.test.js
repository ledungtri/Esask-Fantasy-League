import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';


test('renders the search button in the page', () => {
    // rendering the component
    render(<SearchBar />);
    // using testId to check if its part of the DOM
    expect(screen.getByTestId("test_search_btn")).toBeInTheDocument();
})

test('renders the search input field in the page', () => {
    // rendering the component
    render(<SearchBar />);
    // using testId to check if its part of the DOM
    expect(screen.getByTestId("test_search_field")).toBeInTheDocument();
})


test('testing the onchange for the input ', () => {
    // using a variable to hold the rendered component
    const container = render(<SearchBar/>);
    // get the input using testId
    const input = container.getByTestId("test_search_field");
    // firing the onChange event
    fireEvent.change(input, {target : {value : 'doe'}});
    // checking the rendered value 
    expect(input.value).toBe("doe");
  });
