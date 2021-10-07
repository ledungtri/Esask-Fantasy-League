/**
 * -  Author : Nisrine Zbadi
 *  - File purpose : this is the component that shows the loading message and spinner
 *  - Date: October 7th, 2021
 */
import React from 'react'

function Loading(props) {
    return (
        <div>
            <div className="preloader">
                <div className="spinner">
                    <div className="half_spinner"></div>
                    <p className="loadingText" data-testid="loadingtext">Please wait, it might take a while.....</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
