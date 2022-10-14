
import { Grid, Button, Card, ListItem, CardHeader, Avatar, breadcrumbsClasses } from "@mui/material";
import React from "react";
import breakImg from "./img/break.png";
import goalImg from "./img/goal.png";

//プレイヤー達のステータスを表示するコンポーネント
export default class PlayerList extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            {this.props.playerList.map(player => (
                    <div key={player.order}>
                        <Card sx={{ margin: 1, border: 3, borderColor: 'primary.main', boxShadow: 2,
                        "position":"relative","backgroundColor": "white", 
                        "width": "80%", "height": "50%", "marginLeft": "auto", "marginRight": "auto"  }}
                            >
                            <CardHeader sx={{"opacity":0.8,"positon":"absolute","top":"10px"}}
                                avatar={<Avatar sx={{ border: 2, borderColor: "#9933DD", width: 50, height: 50, bgcolor: 'background.paper' }}><img src={`${player.icon}`} style={{ width: 40 }} /></Avatar>}
                                title={player.name}
                                subheader={`${player.point}ポイント`}
                            /> 
                            {(player.isBreak) &&
                            <img src={breakImg}
                            style={{"position":"absolute","top":"15%","left":"15%",
                            "height":"70%","width":"70%"}}></img>
                            }
                            {
                                (player.isGoaled) &&
                                <img src={goalImg} style={{"position":"absolute","top":"15%","left":"15%",
                                "height":"70%","width":"70%"}}></img>
                            }
                        </Card>
                    </div>
                ))}
            </>
        )
    }
}