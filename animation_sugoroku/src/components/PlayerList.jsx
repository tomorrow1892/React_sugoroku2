
import { Grid, Button, Card, ListItem, CardHeader, Avatar } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import Player from './Player';



export default class PlayerList extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (

            <Card style={{ "backgroundColor": "	#FFFFE0", "height": "70vh" }}>
                <Grid>
                    <ul>
                        {/* <img src={require(`${this.props.playerList[0].icon}`).default} /> */}
                        {this.props.playerList.map(player => (
                            <div key={player.name}>
             
                            <Grid item xs={10}>
                                <Card sx={{ margin: 2,border:3,borderColor: 'primary.main' ,boxShadow:2}} style={{ "backgroundColor": "white" }}>
                                    <CardHeader
                                        avatar={<Avatar  sx={{ width: 50, height: 50 ,bgcolor: 'background.paper'}}><img src={`${player.icon}`} style={{width:40}} /></Avatar>}
                                        title={player.name}
                                        subheader={`${player.point}ポイント`}
                                    />
                                </Card>
                            </Grid>
    
                            </div>
                            
                        ))}
                    </ul>
                </Grid>
            </Card>




        )
    }
}