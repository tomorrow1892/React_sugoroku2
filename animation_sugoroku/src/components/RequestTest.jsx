import "./css/dice.css";

import React from "react";




export default class RequestTest extends React.Component {
    constructor(props) {
        super(props);
    }

    requestDiceRoll(diceNum, sugorokuId) {
        var xhr = new XMLHttpRequest();
        var URI = "http://localhost:2289/api/diceRoll?suzi=" + diceNum + "&sugorokuId=" + sugorokuId;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);
        console.log(response);
    }


    render() {
        return (
            <div>
                <button onClick={() => this.requestDiceRoll(2, 1)}> てすと</button>
            </div>
        );
    }
}