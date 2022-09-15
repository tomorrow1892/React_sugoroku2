
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

            <div style={{ "backgroundColor": "cyan", "height": "100vh" }}>
                {/* <Button variant="outlined">Material-UI ボタン</Button> */}
                <div style={{ "textAlign": "center", "height": "30vh" }}>
                    <Dice2></Dice2>

                </div>
                <div>
                    <PlayerList playerList= {this.props.playerList}></PlayerList>
                </div>

            </div>

        )
    }
}