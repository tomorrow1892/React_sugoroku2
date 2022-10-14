
import { Grid, Button, Drawer, Paper } from "@mui/material";
import React from "react";
import Dice2 from './Dice2';
import PlayerList from './PlayerList';
import cat from './img/cat.png';
import dog from './img/dog.png';
import hamster from './img/hamster.png';
import hiyoko from './img/hiyoko.png';
import penguin from './img/penguin.png';
import zo from './img/zo.png';
import map from './img/map.jpg';
import Board from "./Board";
import EventModal from "./EventModal";
import GoalModal from "./GoalModal";
import { CSSTransition } from "react-transition-group";
import styled, { ThemeConsumer } from "styled-components";





//環境変数
//const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";
//ローカルでテストする時は以下コメントを外す
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

        //state
        this.state = this.getState();//すごろくゲームに関するstateを取得
        this.state["isEventModalVisible"] = false;//イベント処理時のモーダルの表示フラグのstate
        this.state["isGoalModalVisible"] = false;
        this.state["onModalClosedMethod"] = null;//モーダルを閉じたときの処理
        this.state["modalContent"] = null;//モーダルの中身
        //子コンポーネントに渡す関数をバインド
        this.setState = this.setState.bind(this);
        this.requestDiceRoll = this.requestDiceRoll.bind(this);
        this.setModalContent = this.setModalContent.bind(this);
        this.switchIsVisible = this.switchIsVisible.bind(this);
        this.setModalClosedMethod = this.setModalClosedMethod.bind(this);
        this.setEventModalClosedMethod = this.setEventModalClosedMethod.bind(this);

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
        return {
            playerList: playerList,//プレイヤーのリスト
            masuList: masuList,//マスのリスト
            nPlayers: sugorokuInfo.nplayers,//プレイヤーの人数
            turnPlayer: sugorokuInfo.nowPlayer//ターンプレイヤー
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
        let xhr = new XMLHttpRequest();
        let URI = BACKEND_HOST + "/api/diceRoll?sugorokuId=" + this.props.sid + "&suzi=" + suzi;
        xhr.open("GET", URI, false);
        xhr.send();
        let response = JSON.parse(xhr.responseText);//responseはサイコロを振ったターンプレイヤーのステータス
        console.log(response);
        //サイコロを振って移動するマス数(ゴール時の移動マス数はサイコロの目通りでないため出目とイコールではない)
        let moveCount = response.position - this.state.playerList[response.order - 1].position;
        this.setModalContent(this.state.masuList[response.position - 1]);//プレイヤーの現在位置のマスをモーダルにセット
        this.setEventModalClosedMethod();//イベントモーダルが閉じたときの処理をセット

        //移動する数だけ1マスずつコマを動かす．移動終了後にコールバック関数が処理される．
        this.stepMove(response.order, moveCount, ()=>{
            if (response.isGoaled) {
                console.log("goal!");
                this.requestdoEvent();
            }
            else {
                this.setState({ isEventModalVisible: true });//モーダルの表示フラグをtrueにする
            }
        });
    }

    //イベントを処理する．(EventModalコンポーネントで使用)
    requestdoEvent() {
        let xhr = new XMLHttpRequest();
        let URI = BACKEND_HOST + "/api/doEvent?sugorokuId=" + this.props.sid;
        xhr.open("GET", URI, false);
        xhr.send();
        let response = JSON.parse(xhr.responseText);//イベント処理後のターンプレイヤーのステータス
        let newState = this.getState();//最新のすごろく情報
        //イベントで移動するマス数
        let moveCount = response.position - this.state.playerList[response.order - 1].position;
        //移動する数だけ1マスずつコマを動かす．移動終了後にコールバック関数が処理される．
        this.stepMove(response.order, moveCount, ()=>{
            this.setState(newState);
            if (response.isGoaled) {//ゴールした場合
                console.log("goal!");
                let goalCount = this.checkGoalCount(newState.playerList);
                this.setModalContent({
                    "title": "ゴール!",
                    "description": `${goalCount}位でゴールしたので，${(6 - goalCount) * 100}ポイントゲット!`,
                    "squareEventId": null
                });
                this.setGoalModalClosedMethod(newState.playerList);//モーダルを閉じるときの処理をセット
                setTimeout(() => this.setState({ isEventModalVisible: true }), 500);//モーダルを表示
            }
            else {//ゴールでない場合，サイコロを有効にして次の人に番が回る
                setTimeout(() => this.diceRef.current.switchDiceButtonDisabled(false), 500);//サイコロボタンを有効にする．setStateが非同期なため，少し遅延を入れている
            }
        });
    }

    //コマを1マスずつ進ませる．
    //orderはターンプレイヤーの順番,moveCountは移動マス数,moveFinishedFuncは進み終えた後に実行するコールバック処理
    stepMove(order, moveCount, moveFinishedFunc) {
        console.log("moveCount:"+moveCount);
        if (moveCount > 0) {
            let playerList_tmp = this.state.playerList;
            playerList_tmp[order - 1].position++;
            this.setState({ playerList: playerList_tmp });
            setTimeout(() => {
                this.stepMove(order, moveCount - 1,moveFinishedFunc);
            }, 500);
        }
        else if(moveCount < 0){
            let playerList_tmp = this.state.playerList;
            playerList_tmp[order - 1].position--;
            this.setState({ playerList: playerList_tmp });
            setTimeout(() => {
                this.stepMove(order, moveCount + 1,moveFinishedFunc);
            }, 500);
        }
        else {
            moveFinishedFunc();
        }
    }
    //ゴールした人数を確認する.引数にはplayerListを持つオブジェクトが入る
    checkGoalCount(playerList) {
        let goalCount = 0;
        playerList.forEach(player => {
            if (player.isGoaled) goalCount++;
        });
        return goalCount;
    }



    /***モーダル関連のメソッド****/
    //EventModalコンポーネントの表示フラグを変更する(EventModalコンポーネントで使用)
    switchIsVisible(isVisible) { this.setState({ isEventModalVisible: isVisible }); }
    //マス情報をモーダルの中身にセットする
    setModalContent(masuObj) { this.setState({ "modalContent": masuObj }); }


    //それ以外のモーダルを閉じるときの処理
    onModalClosed() {
        this.switchIsVisible(false);
    }
    //イベント時に表示されるモーダルを閉じるときの処理をセット．閉じたときにイベントをリクエストする．
    setEventModalClosedMethod() {
        this.setState({
            onModalClosedMethod: () => {
                this.switchIsVisible(false);
                setTimeout(() => this.requestdoEvent(), 500);
            }
        })
    }
    //イベント処理後にゴールした場合のモーダルを閉じるときの処理をセット．閉じたときにサイコロボタンを有効にする．
    setGoalModalClosedMethod(playerList) {
        console.log("ゴール人数(stateの方):" + this.checkGoalCount(this.state.playerList))
        console.log("ゴール人数:" + this.checkGoalCount(playerList))
        console.log("プレイヤー人数:" + this.state.nPlayers);
        if (this.checkGoalCount(playerList) == this.state.nPlayers) {//全員がゴールした場合
            this.setState({
                onModalClosedMethod: () => {
                    this.switchIsVisible(false);
                    setTimeout(() => { this.setState({ isGoalModalVisible: true }) }, 500);//モーダルの表示フラグをtrueにする
                }
            })
        }
        else {
            this.setState({
                onModalClosedMethod: () => {
                    this.switchIsVisible(false);
                    this.diceRef.current.switchDiceButtonDisabled(false);

                }
            })
        }

    }
    //それ以外のモーダルを閉じるときの処理をセット．ただ閉じるだけ
    setModalClosedMethod() {
        this.setState({ onModalClosedMethod: () => this.switchIsVisible(false) })
    }

    render() {
        return (
            <div>
                {/*サイドメニュー */}
                <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px" } }}>
                    <div style={{ "textAlign": "center", "height": "300px" }}>
                        <Dice2 ref={this.diceRef} sugorokuId={this.props.sid} requestDiceRoll={this.requestDiceRoll}></Dice2>
                    </div>
                    <div style={{ "textAlign": "center"}}>
                        {(this.state.turnPlayer!=null)&& this.state.turnPlayer.name}さんの番です．
                    </div>
                    <div style={{ "height": "100px" }}>
                        <PlayerList playerList={this.state.playerList}></PlayerList>
                    </div>
                    {/* イベントやマスクリックで出てくるモーダル．サイドメニューより前面に出すためにDrawerの子にしている */}
                    <EventModal
                        isOpen={this.state.isEventModalVisible}
                        modalContent={this.state.modalContent}
                        onClose={this.state.onModalClosedMethod}
                    />
                    {/* 全員がゴールしたときに出てくるモーダル */}
                    <GoalModal
                        isOpen={this.state.isGoalModalVisible}
                        playerList={this.state.playerList}
                    />
                </Drawer>
                {/* 盤面 */}
                <div style={{
                    "backgroundSize": "cover", "backgroundImage": `url(${map})`,
                    "backgroundAttachment": "fixed",
                    "height": "200%", "width": "150%", "position": "absolute", "left": "0px", "top": "0px", "textAlign": "center", "zIndex": 10
                }}>
                    <div style={{ "position": "absolute", "left": "300px", "top": "0px" }}>
                        <Board masuList={this.state.masuList} playerList={this.state.playerList}
                            switchIsVisible={this.switchIsVisible}
                            setModalContent={this.setModalContent}
                            setModalClosedMethod={this.setModalClosedMethod}
                        ></Board>
                    </div>
                </div>
            </div>
        )
    }
}

