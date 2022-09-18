
import { Grid, Button, Card, ListItem, CardHeader, Avatar } from "@mui/material";
import React from "react";

//プレイヤー達のステータスを表示するコンポーネント
export default class PlayerList extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card sx={{ boxShadow: 5 }} style={
                { "backgroundColor": "#FFEEEE", "width": "90%", "height": "95%", "marginLeft": "auto", "marginRight": "auto", "marginTop": "10%" }}>
                <Grid>
                    <ul>
                        {this.props.playerList.map(player => (
                            <div key={player.name}>
                                <Grid item xs={10} >
                                    <Card sx={{ margin: 1, border: 3, borderColor: 'primary.main', boxShadow: 2 }}
                                        style={{ "backgroundColor": "white", "width": "100%", "height": "50%", "marginLeft": "auto", "marginRight": "auto" }}>
                                        <CardHeader
                                            avatar={<Avatar sx={{ border: 2,borderColor:"#9933DD",width: 50, height: 50, bgcolor: 'background.paper' }}><img src={`${player.icon}`} style={{ width: 40 }} /></Avatar>}
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