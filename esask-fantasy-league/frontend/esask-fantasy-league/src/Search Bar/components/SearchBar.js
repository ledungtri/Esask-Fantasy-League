/*
    Component that renders the search bar and it's buttons
*/

import React, {useState} from 'react'

function SearchBar(props) {
    const [searchText, setSearchText] = useState("");


    return (
        <div className="searchBar">
            <div className="searchInput_div">
                <input data-testid="test_search_field" type="text" name="input_text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="Search players" />
                
            </div>

            {props.showError ? <span data-testid="test_error_span" className="searchError">Enter search criteria</span> : ""}

            <div className="searchBtn_div">
                <button data-testid="test_search_btn" onClick={() => props.getSearchText(searchText)}>Search</button>
                <button data-testid="test_search_btn2" onClick={() => props.clear(setSearchText)}>Cancel</button>
            </div>
        </div>
    )
}

export default SearchBar
