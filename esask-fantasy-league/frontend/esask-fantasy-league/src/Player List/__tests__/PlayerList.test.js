import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import PlayerList from '../components/PlayerList';

test('renders the title in the page', () => {
    render(<PlayerList />);
    expect(screen.getByTestId("title")).toBeInTheDocument();
})

const loading = true;
test('renders the loading component', () => {
    render(<PlayerList />);
    if(loading) expect(screen.getByTestId("load_comp")).toBeInTheDocument();

    if(!loading) expect(screen.getByTestId("load_comp")).not.toBeInTheDocument();
})

test('renders pagination component', () => {
    render(<PlayerList />);
    expect(screen.getByTestId("paginate")).toBeInTheDocument();
})


test('Renders the captain button ', () => {
    render(<PlayerList showBtnCapt={true}/>);
    const captButton = getByTestId("captain_button");
    expect(captButton.value).toEqual("Captain");
  });

