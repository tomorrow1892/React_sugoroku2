
import { Grid, Button } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';
import cat from './img/cat.png';
import dog from './img/dog.png';
import hamster from './img/hamster.png';
import hiyoko from './img/hiyoko.png';
import penguin from './img/penguin.png';
import zo from './img/zo.png';
import Board from "./Board";
import EventModal from "./EventModal";



//環境変数
const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";

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
        this.state = this.getState();//すごろくゲームに関するstateを取得
        this.state["isEventModalVisible"]= false;//マスのモーダルの表示フラグのstate
        this.state["modalContent"] = null;//モーダルの中身
        //子コンポーネントに渡す関数をバインド
        this.requestDiceRoll = this.requestDiceRoll.bind(this);
        this.requestdoEvent = this.requestdoEvent.bind(this);
        this.switchIsVisible = this.switchIsVisible.bind(this);

        //ref
        this.diceRef = React.createRef();
    }

    //バックエンドからゲーム設定を受け取ってstateにセットする
    getState() {
        const sugorokuInfo = this.requestSugorokuInfo(this.props.sid);
        const playerList = new Array();//バックエンドから受け取ったplayerオブジェクトを新しいplayerオブジェクトに変換
        sugorokuInfo.players.forEach(player => {
            let iconImg;
            switch (player.icon) {//画像をセット
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
        const masuList = [...sugorokuInfo.squares];//バックエンドから受け取ったマスリストをそのまま入れる
        const nowPlayer = sugorokuInfo.nowPlayer;//ターンプレイヤー
        return {
            playerList: playerList,//プレイヤーのリスト
            masuList: masuList,//マスのリスト
            nowPlayer: nowPlayer,//ターンプレイヤー
        }
    }

    //すごろくの状態を取得する
    requestSugorokuInfo(sugorokuId) {
        var xhr = new XMLHttpRequest();
        var URI = BACKEND_HOST + "/api/sugorokuInfo?sugorokuId=" + sugorokuId;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);//nowPlayer,nplayers,players,squares
        console.log(response);
        return response;
    }

    //サイコロの出目をバックエンドに送信する．(Dice2コンポーネントで使用)
    requestDiceRoll(suzi) {
        var xhr = new XMLHttpRequest();
        var URI = BACKEND_HOST + "/api/diceRoll?sugorokuId=" + this.props.sid + "&suzi=" + suzi;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);//サイコロを振ったターンプレイヤーのステータス
        this.setState(this.getState()); //positionが更新されてコマが移動する
        this.setState({"modalContent": this.state.masuList[response.position-1]});//プレイヤーの位置のマス情報をモーダルの中身にセット(-1はインデックス調整)
        setTimeout(()=> this.setState({isEventModalVisible:true}),500);//モーダルの表示フラグをtrueにする
        
        return response;
    }

    //イベントを処理する．(EventModalコンポーネントで使用)
    requestdoEvent(){
        var xhr = new XMLHttpRequest();
        var URI = BACKEND_HOST + "/api/doEvent?sugorokuId=" + this.props.sid;
        xhr.open("GET", URI, false);
        xhr.send();
        var response = JSON.parse(xhr.responseText);//イベント処理後のターンプレイヤーのステータス
        this.setState(this.getState()); //positionが更新されてコマが移動する
        setTimeout(()=> this.diceRef.current.switchDiceButtonDisabled(false),500);//サイコロボタンを有効にする．setStateが非同期なため，少し遅延を入れている．

        return response;
    }

    //EventModalコンポーネントの表示フラグを変更する(EventModalコンポーネントで使用)
    switchIsVisible(isVisible){
        this.setState({isEventModalVisible:isVisible});
    }

    render() {
        return (
            <>
            {console.log(this.state.isEventModalVisible)}
                <Grid container>
                    <Grid item xs={2}>
                        <div style={{ "backgroundColor": "	#FFFFE0", "height": "100%" }}>
                            <div style={{ "textAlign": "center", "height": "25vh" }}>
                                <Dice2 ref={this.diceRef} sugorokuId={this.props.sid} requestDiceRoll={this.requestDiceRoll}></Dice2>
                               
                            </div>
                            <div style={{ "height": "75vh" }}>
                                <PlayerList playerList={this.state.playerList}></PlayerList>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs>
                        <div style={{ "position": "relative", "textAlign": "center", "backgroundColor": "#F3F1FA", "height": "100%" }}>
                            <Button onClick={() => this.requestdoEvent()}> 何らかのテストボタン</Button>
                            <EventModal switchIsVisible={this.switchIsVisible} requestdoEvent={this.requestdoEvent}
                            isOpen={this.state.isEventModalVisible} modalContent={this.state.modalContent}></EventModal>


                            <Board nowPlayer={this.state.nowPlayer} masuList={this.state.masuList} playerList={this.state.playerList}></Board>
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}