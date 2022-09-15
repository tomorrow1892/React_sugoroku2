
import { Grid, Button } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';


export default class Menu extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (

            <div style={{ "backgroundColor": "	#FFFFE0",  "height": "100%" }}>
                <div style={{ "textAlign": "center", "height": "30vh" }}>
                    <Dice2></Dice2>

                </div>
                <div style={{"height": "70vh"}}>
                    <PlayerList playerList= {this.props.playerList}></PlayerList>
                </div>

            </div>

        )
    }
}