import React from 'react'

function Loading(props) {
    return (
        <div>
            <div className="preloader">
                <div className="spinner">
                    <div className="half_spinner"></div>
                    <p className="loadingText" data-testid="loadingtext">Loading.....Please wait, it might take a while!</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
