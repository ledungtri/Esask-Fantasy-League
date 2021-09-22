import React from 'react'

function Pagination({totalPages, handlePaginate}) {
    const pageNumbers = [...Array(totalPages).keys()].map(num => num+1);

    
    return (
        <div className="paginate">
            {pageNumbers.map(number => (
                <button className="page_btn" key={number} onClick={() => handlePaginate(number)}>{number}</button>
            ))}
            
        </div>
    )
}

export default Pagination
