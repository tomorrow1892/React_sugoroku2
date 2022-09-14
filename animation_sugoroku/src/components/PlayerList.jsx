
import { Grid, Button, Card, ListItem, CardHeader, Avatar } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import Player from './Player';



export default class Menu extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (

            <Card style={{ "backgroundColor": "red", "height": "70vh" }}>
                <Grid container>
                    <ul>
                    
                        {/* <img src={require(`${this.props.playerList[0].icon}`).default} /> */}
                        {this.props.playerList.map(player => (
                            <Grid item xs={12}>
                                <Card sx={{ margin: 2 }} key={player.name} style={{ "backgroundColor": "white" }}>
                                    <CardHeader
                                        avatar={<Avatar  sx={{ width: 56, height: 56 ,bgcolor: 'background.paper'}}><img src={`${player.icon}`} style={{width:40}} /></Avatar>}
                                        title={player.name}
                                        subheader={`${player.point}ポイント`}
                                    />
                                </Card>
                            </Grid>
                        ))}
                    </ul>
                </Grid>
            </Card>




        )
    }
}