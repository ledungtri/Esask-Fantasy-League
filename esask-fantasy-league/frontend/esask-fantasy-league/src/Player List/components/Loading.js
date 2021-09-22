import React from 'react'

function Loading() {
    return (
        <div data-testid="load_comp">
            <div className="preloader">
                <div className="spinner">
                    <div className="half_spinner"></div>
                    <p>Loading.....</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
