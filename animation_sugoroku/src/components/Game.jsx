
import { Grid, Button, Drawer, Paper, Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Board from "./Board";
import PlayerList from './PlayerList';
import { Modal, Box, } from "@mui/material";
import { pc, sp, tab } from '../media';
import mizutama from "./img/mizutamahaikei-illust2.png";
import sound from './sound/move.mp3';
import sound_success from './sound/success.mp3';
import ModalContent_Masu from "./ModalContent_Masu";
import ModalContent_Goal from "./ModalContent_Goal";
import ModalContent_Finish from "./ModalContent_Finish";
import ModalContent_GameStart from "./ModalContent_GameStart";
import ModalContent_BackToMenu from "./ModalContent_BackToMenu";
import ModalContent_Dice from "./ModalContent_Dice";

import sound_good from './sound/good_action.mp3';
import sound_bad from './sound/bad_action.mp3';




//環境変数
const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";
//ローカルでテストする時は以下コメントを外す
// const BACKEND_HOST = "http://localhost:2289";

//プレイヤーのステータスを持つオブジェクト
function Player(playerId, sugorokuId, icon, name, order, points, position, isGoaled, isBreak) {
    this.playerId = playerId;
    this.sugorokuId = sugorokuId;
    this.icon = icon;
    this.name = name;
    this.order = order;
    this.points = points;
    this.position = position;
    this.isGoaled = isGoaled;
    this.isBreak = isBreak;
}



export default class Game extends React.Component {

    constructor(props) {
        super(props);


        //state
        this.state = this.getState();//すごろくゲームに関するstateを取得
        this.state["isModalOpen"] = false;//モーダルの表示状態
        this.state["modalContent"] = null;//モーダルの中身
        this.state["isDiceButtonVisible"] = false;//メニューバーのサイコロを振るボタンの表示状態

        //子コンポーネントに渡す関数をバインド
        this.requestDiceRoll = this.requestDiceRoll.bind(this);
        this.setModalContent = this.setModalContent.bind(this);
        this.switchIsModalOpen = this.switchIsModalOpen.bind(this);
        this.switchIsDiceButtonVisible = this.switchIsDiceButtonVisible.bind(this);


    }

    componentDidMount() {
        this.setModalContent(<ModalContent_GameStart handleClose={() => {
            this.switchIsModalOpen(false);
            this.setModalContent(<ModalContent_Dice
                turnPlayer={this.state.turnPlayer}
                requestDiceRoll={this.requestDiceRoll}
                switchIsModalOpen={this.switchIsModalOpen}
                setModalContent={this.setModalContent}
                switchIsDiceButtonVisible={this.switchIsDiceButtonVisible}
                handleClose={() => {//モーダルが閉じたときの処理をセット
                    this.switchIsModalOpen(false);
                    this.setState({ isDiceButtonVisible: true });
                }} />);
            setTimeout(() => { //ゲーム終了モーダルを表示する
                this.setState({ isModalOpen: true })
            }, 500);
        }} />);
        this.switchIsModalOpen(true);
    }


    //バックエンドからゲーム設定を受け取ってstateにセットする
    getState() {
        const sugorokuInfo = this.requestSugorokuInfo(this.props.sid);
        const playerList = new Array();//バックエンドから受け取ったplayerオブジェクトを新しいplayerオブジェクトに変換
        sugorokuInfo.players.forEach(player => {
            //オブジェクトを生成してリストに入れる
            playerList.push(new Player(player.playerId, player.sugorokuId,
                player.icon, player.name, player.order, player.points, player.position, player.isGoaled, player.isBreak));
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
        //サイコロを振って移動するマス数(ゴール時の移動マス数はサイコロの目通りでないため出目とイコールではない)
        let moveCount = response.position - this.state.playerList[response.order - 1].position;
        let sound_action
        if (response.position < this.state.masuList.length+1 && this.state.masuList[response.position - 1].squareEffect >= 0) {
            sound_action = new Audio(sound_good);
        } else {
            sound_action = new Audio(sound_bad);
        }
        this.setModalContent(
            <ModalContent_Masu
                masuInfo={this.state.masuList[response.position - 1]}//プレイヤーの現在位置をセット
                handleClose={() => {//イベントモーダルが閉じたときの処理をセット
                    this.switchIsModalOpen(false);
                    setTimeout(() => this.requestdoEvent(), 500);
                }} />
        )
        //移動する数だけ1マスずつコマを動かす．移動終了後に第三引数のコールバック関数が処理される．
        this.stepMove(response.order, moveCount, () => {
            if (response.isGoaled) {
                console.log("goal!");
                this.requestdoEvent();
            }
            else {
                this.setState({ isModalOpen: true });//モーダルの表示フラグをtrueにする
                sound_action.play();
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
        this.stepMove(response.order, moveCount, () => {
            this.setState(newState);
            if (response.isGoaled) {//ゴールした場合
                const audio_success = new Audio(sound_success);
                console.log("goal!");
                let goalCount = this.checkGoalCount(newState.playerList);
                this.setModalContent(
                    <ModalContent_Goal
                        goalInfo={{
                            "goalCount":goalCount,
                            "getPoint": (6 - goalCount) * 100,
                            "squareEventId": null
                        }}
                        handleClose={() => {
                            if (this.checkGoalCount(newState.playerList) == this.state.nPlayers) {//全員がゴールした場合
                                this.setState({ isModalOpen: false });//ゴールモーダルを消す
                                this.setModalContent(<ModalContent_Finish
                                    playerList={this.state.playerList}
                                />)
                                setTimeout(() => { //ゲーム終了モーダルを表示する
                                    this.setState({ isModalOpen: true })
                                }, 500);
                            }
                            else {
                                this.setState({ isModalOpen: false });
                                this.setModalContent(<ModalContent_Dice
                                    turnPlayer={this.state.turnPlayer}
                                    requestDiceRoll={this.requestDiceRoll}
                                    setModalContent={this.setModalContent}
                                    switchIsModalOpen={this.switchIsModalOpen}
                                    switchIsDiceButtonVisible={this.switchIsDiceButtonVisible}
                                    handleClose={() => {//モーダルが閉じたときの処理をセット
                                        this.switchIsModalOpen(false);
                                        this.setState({ isDiceButtonVisible: true });
                                    }} />);
                                setTimeout(() => { //ターンが変わってサイコロを表示する
                                    this.setState({ isModalOpen: true })
                                }, 500);
                            }
                        }
                        } />
                )
                audio_success.play();
                setTimeout(() => this.setState({ isModalOpen: true }), 500);//モーダルを表示

            }
            else {//ゴールでない場合，サイコロを有効にして次の人に番が回る
                setTimeout(
                    () => {
                        this.setModalContent(<ModalContent_Dice
                            turnPlayer={this.state.turnPlayer}
                            requestDiceRoll={this.requestDiceRoll}
                            setModalContent={this.setModalContent}
                            switchIsModalOpen={this.switchIsModalOpen}
                            switchIsDiceButtonVisible={this.switchIsDiceButtonVisible}
                            handleClose={() => {//モーダルが閉じたときの処理をセット
                                this.switchIsModalOpen(false);
                                this.setState({ isDiceButtonVisible: true });
                            }} />);
                        this.setState({ isModalOpen: true })
                    }, 500);//モーダルを表示
            }
        });
    }

    //コマを1マスずつ進ませる．
    //orderはターンプレイヤーの順番,moveCountは移動マス数,moveFinishedFuncは進み終えた後に実行するコールバック処理
    stepMove(order, moveCount, moveFinishedFunc) {
        const audio_move = new Audio(sound);
        console.log("moveCount:" + moveCount);
        if (moveCount > 0) {
            let playerList_tmp = this.state.playerList;
            playerList_tmp[order - 1].position++;
            this.setState({ playerList: playerList_tmp });
            audio_move.play();
            setTimeout(() => {
                this.stepMove(order, moveCount - 1, moveFinishedFunc);

            }, 500);
        }
        else if (moveCount < 0) {
            let playerList_tmp = this.state.playerList;
            playerList_tmp[order - 1].position--;
            this.setState({ playerList: playerList_tmp });
            audio_move.play();
            setTimeout(() => {
                this.stepMove(order, moveCount + 1, moveFinishedFunc);
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



    //さいころメニューに戻るボタンの表示切替
    switchIsDiceButtonVisible(isVisible) { this.setState({ isDiceButtonVisible: isVisible }) }
    /***モーダル関連のメソッド****/
    //モーダルの表示フラグを変更する
    switchIsModalOpen(isOpen) { this.setState({ isModalOpen: isOpen }); }
    //マス情報をモーダルの中身にセットする
    setModalContent(content) { this.setState({ "modalContent": content }); }


    render() {
        return (
            <div>
                {/*サイドメニュー */}
                <Drawer  variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px", background: "linear-gradient(to bottom, white, 75%, cyan)"  } }}>
                    <Grid container alignItems="center" justifyContent="center" direction="column">
                        <Box sx={{
                            height: "200px", width: "200px", display: "flex", justifyContent: "center", alignItems: "center"
                        }}>
                            {this.state.isDiceButtonVisible &&
                                <BtnStyle>
                                    <button className="btn pink" onClick={() => {
                                        this.setState({ isDiceButtonVisible: false });
                                        this.setModalContent(<ModalContent_Dice
                                            turnPlayer={this.state.turnPlayer}
                                            requestDiceRoll={this.requestDiceRoll}
                                            switchIsModalOpen={this.switchIsModalOpen}
                                            setModalContent={this.setModalContent}
                                            switchIsDiceButtonVisible={this.switchIsDiceButtonVisible}
                                            handleClose={() => {//モーダルが閉じたときの処理をセット
                                                this.switchIsModalOpen(false);
                                                this.setState({ isDiceButtonVisible: true });
                                            }} />);
                                        this.setState({ isModalOpen: true });
                                    }}>
                                        <Typography fontFamily="'Zen Maru Gothic', sans-serif">サイコロを振る</Typography>
                                    </button>
                                </BtnStyle>

                            }
                        </Box>

                        <div style={{ "height": "100px" }}>
                            <PlayerList playerList={this.state.playerList} nowPlayer={this.state.turnPlayer}></PlayerList>
                        </div>
                    </Grid>

                </Drawer>
                {/* 盤面 */}
                <div style={{
                    "backgroundSize": "cover", "backgroundImage": `url(${mizutama})`,
                    "backgroundAttachment": "fixed",
                    "height": "200%", "width": "150%", "position": "absolute", "left": "0px", "top": "0px", "textAlign": "center",
                    "backgroundColor": "rgba(255, 255, 255, 0.45)", "backgroundBlendMode": "lighten"
                }}>
                    <div style={{ "position": "absolute", "left": "300px", "top": "0px" }}>
                        <Board masuList={this.state.masuList} playerList={this.state.playerList}
                            switchIsModalOpen={this.switchIsModalOpen}
                            setModalContent={this.setModalContent}
                            isDiceButtonVisible={this.state.isDiceButtonVisible}
                        ></Board>
                    </div>
                </div>
                {/* モーダル */}
                <Modal
                    sx={{
                        border: 0, textAlign: "center", verticalAlign: "middle", display: "flex",
                        backgroundColor: "rgba(255,255,255, 0.1)",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    open={this.state.isModalOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <>{this.state.modalContent != null && this.state.modalContent}</>
                </Modal>
            </div >
        )
    }

}
const BtnStyle = styled.div`
.btn {
    color:inherit;
    font-family:inherit;
    font-size: 20px;
    border: 3px solid black;
    margin-right: 2.6rem;
    box-shadow: 0 0 0 black;
    transition: all 0.2s;
    width:150px;
    height:150px;
}

.btn:last-child {
    margin: 0;
}

.btn:hover {
    box-shadow: 0.2rem 0.2rem 0 rgb(156, 156, 156);
}

.btn:active {
    box-shadow: 0.2rem 0.2rem 0 rgb(156, 156, 156);
}
.pink{
    background: rgb(255, 149, 149);
}
`
