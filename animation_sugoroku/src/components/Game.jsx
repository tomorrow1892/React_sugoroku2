
import { Grid, Button } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';
import Menu from './Menu';


export default class Game extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={2}>
                       <Menu></Menu>
                    </Grid>
                    <Grid item xs>
                        <div style={{ "textAlign": "center","backgroundColor":"green" ,"height":"100vh"}}></div>
                    </Grid>
                </Grid>
            </>
        )
    }
}