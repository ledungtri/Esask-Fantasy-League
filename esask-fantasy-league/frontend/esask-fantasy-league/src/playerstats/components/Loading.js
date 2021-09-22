import React from 'react'

function Loading() {
    return (
        <div>
            <div className="preloader">
                <div className="spinner">
                    <div className="half_spinner"></div>
                    <p className="loadingText" >Loading.....</p>
                </div>
            </div>
        </div>
    )
}

export default Loading