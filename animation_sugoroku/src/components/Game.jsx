
import { Grid, Button, iconButtonClasses } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';
import Menu from './Menu';
import cat from './img/cat.png';
import dog from './img/dog.png';
import hamster from './img/hamster.png';
import hiyoko from './img/hiyoko.png';
import penguin from './img/penguin.png';
import zo from './img/zo.png';
import Masu from './Masu';
import Board from "./Board";



// import PlayerStatus from './PlayerStatus';
const { PlayerStatus } = require('./PlayerStatus');

//環境変数
const BACKEND_HOST = "http://localhost:2289";

//プレイヤーのステータスを持つオブジェクト
function Player(playerId, sugorokuId, icon, name, order, point, position, isGoaled, isBreak) {
    this.playerId = playerId;
    this.sugorokuId = sugorokuId;
    this.icon = icon;
    this.name = name;
    this.order = order;
    this.point = point;
    this.position = position;
    this.isGoaled = isGoaled;
    this.isBreak = isBreak;

}




export default class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = this.getState();


    }

    //バックエンドからゲーム設定を受け取ってstateにセットする
    getState() {
        const sugorokuInfo = this.requestSugorokuInfo(this.props.sid);
        //プレイヤー設定
        const playerList = new Array();
        sugorokuInfo.players.forEach(player => {
            let iconImg;
            switch (player.icon) {
                case "dog": iconImg = dog; break;
                case "cat": iconImg = cat; break;
                case "hiyoko": iconImg = hiyoko; break;
                case "hamster": iconImg = hamster; break;
                case "zo": iconImg = zo; break;
                case "penguin": iconImg = penguin; break;
                default: break;
            }
            //オブジェクトを生成してリストに入れる
            playerList.push(new Player(player.playerId, player.sugorokuId,
                iconImg, player.name, player.order, player.points, player.position, player.isGoaled, player.isBreak));
        })

        const masuList = [...sugorokuInfo.squares];
        const nowPlayer = sugorokuInfo.nowPlayer;
        console.log(sugorokuInfo);

        return {
            playerList: playerList,
            masuList: masuList,
            nowPlayer: nowPlayer
        }
    }

    //すごろくの初期状態を取得する
    requestSugorokuInfo(sugorokuId) {
        var xhr = new XMLHttpRequest();
        var URI = BACKEND_HOST + "/api/sugorokuInfo?sugorokuId=" + sugorokuId;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);
        return response;
    }


    requestDiceRoll(sugorokuId, suzi) {
        var xhr = new XMLHttpRequest();
        var URI = BACKEND_HOST + "/api/diceRoll?sugorokuId=" + sugorokuId + "&suzi=" + suzi;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);
        var sugorokuInfo = this.getState();
        this.setState(sugorokuInfo);
        return response;
    }


    render() {
        return (
            <>
                <Grid container>
                    <Grid item xs={2}>
                        <div style={{ "backgroundColor": "	#FFFFE0", "height": "100%" }}>
                            <div style={{ "textAlign": "center", "height": "25vh" }}>
                                <Dice2></Dice2>
                            </div>
                            <div style={{ "height": "75vh" }}>
                                <PlayerList playerList={this.state.playerList}></PlayerList>
                            </div>

                        </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{ "position": "relative", "textAlign": "center", "backgroundColor": "#F3F1FA", "height": "100%" }}>
                            <Button onClick={() => this.requestDiceRoll(this.props.sid, 1)}> 何らかのテストボタン</Button>
                            <Board nowPlayer={this.state.nowPlayer} masuList={this.state.masuList} playerList={this.state.playerList}></Board>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}