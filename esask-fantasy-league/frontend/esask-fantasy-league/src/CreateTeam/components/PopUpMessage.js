import React from "react";

function PopUpMessage(props) {
    const title = (props.type === 'error')? 'Try again' : 'Congratulations';
    return (
        <div className="pop-up-message">
            <div className={props.type + " pop-up-header"}>
                <span onClick={props.closeHandler} className="close">&times;</span>
                <h3>{title}</h3>
            </div>
            {props.messageType}
            <p className='pop-up-body'>{props.body}</p>
        </div>
    );
}

export default PopUpMessage;