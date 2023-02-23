import { Grid, Button, Card, ListItem, CardHeader, Avatar, breadcrumbsClasses, Typography } from "@mui/material";
import React from "react";
import breakImg from "./img/break.png";
import goalImg from "./img/goal.png";
import dog from "./img/dog.png";
import cat from "./img/cat.png";
import hiyoko from "./img/hiyoko.png";
import hamster from "./img/hamster.png";
import zo from "./img/zo.png";
import penguin from "./img/penguin.png";



//プレイヤーのステータス
export const Player = (props) => {
    let iconSrc;
    switch (props.player.icon) {
        case "dog":iconSrc=dog; break;
        case "cat":iconSrc=cat; break;
        case "hiyoko":iconSrc=hiyoko; break;
        case "hamster":iconSrc=hamster; break;
        case "zo":iconSrc=zo; break;
        case "penguin":iconSrc=penguin; break;
        default:iconSrc=cat;break;
    }
    return (
        <Card sx={{ "margin": 1, "border": 3, "borderColor": "green", "boxShadow": 2,
            "position":"relative","backgroundColor": "white", 
            "width": "200px", "height": "100px", "marginLeft": "auto", "marginRight": "auto" }}
                >
                <CardHeader sx={{"opacity":0.8,"positon":"absolute","top":"10px"}}
                    avatar={<Avatar sx={{ border: 2, borderColor: "#9933DD", width: 50, height: 50, bgcolor: 'background.paper' }}><img src={iconSrc} style={{ width: 40 }} /></Avatar>}
                    title={<Typography sx={{color:"black","fontFamily": "'Zen Maru Gothic', sans-serif"}}>{props.player.name}</Typography>}
                    subheader={<Typography sx={{color:"red","fontFamily": "'Zen Maru Gothic', sans-serif"}}>{props.player.points}ポイント</Typography>}
                /> 
            
                {(props.player.isBreak) &&
                <img src={breakImg}
                style={{"position":"absolute","top":"15%","left":"15%",
                "height":"70%","width":"70%"}}></img>
                }
                {
                    (props.player.isGoaled) &&
                    <img src={goalImg} style={{"position":"absolute","top":"15%","left":"15%",
                    "height":"70%","width":"70%"}}></img>
                }
            </Card>
    )
}

export default Player