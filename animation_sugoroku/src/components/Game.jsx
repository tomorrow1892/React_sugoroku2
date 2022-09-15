
import { Grid, Button } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';
import Menu from './Menu';
import cat from './img/cat.png';
import dog from './img/dog.png';
import hamster from './img/hamster.png';
import hiyoko from './img/hiyoko.png';
import penguin from './img/penguin.png';
import Masu from './Masu';
// import PlayerStatus from './PlayerStatus';
const {PlayerStatus} = require('./PlayerStatus');


function Player(name,point,icon){
    this.name= name;
    this.point = point;
    this.icon = icon;
}
export default class Game extends React.Component {

    constructor(props) {
        super(props);
     
        this.playerList = new Array();
        this.playerList.push(new Player("nakahashi",0,cat));
        this.playerList.push(new Player("horie",0,dog));
        this.playerList.push(new Player("sakai",0,hamster));
        this.playerList.push(new Player("hukusima",0,hiyoko));
        this.playerList.push(new Player("matsumoto",0,penguin));
        this.state={
           playerList: this.playerList
        }

    }

    setPlayerName(playerIndex,name){
        this.playerList[playerIndex].name = name;
        this.setState({
            playerList: this.playerList
        })
    };

    render() {
        return (
            <>
            
            <Button onClick={() => this.setPlayerName(0,"tomorrow")}> 状態変更</Button>
                <Grid container>
                    <Grid item xs={2}>
                       <Menu playerList={this.state.playerList}></Menu>
                    </Grid>
                    <Grid item xs>
                        <div style={{ "textAlign": "center","backgroundColor":"#F3F1FA" ,"height":"100vh"}}>
                            <Masu top={100} left={100}> </Masu>
                            <Masu top={150} left={400}></Masu>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}