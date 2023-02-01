
import { Grid, Button, Drawer, Paper } from "@mui/material";
import React from "react";

import Dice from './Dice';
import Board from "./Board";
import PlayerList from './PlayerList';
import { Modal, Dialog, Box, IconButton } from "@mui/material";
import cat from './img/cat.png';
import dog from './img/dog.png';
import hamster from './img/hamster.png';
import hiyoko from './img/hiyoko.png';
import penguin from './img/penguin.png';
import zo from './img/zo.png';
import map from './img/map.jpg';
import sky from './img/sky.jpg';
import mizutama from "./img/mizutamahaikei-illust2.png";
import sound from './sound/move.mp3';
import bgm from './sound/dizzy.mp3';
import sound_success from './sound/success.mp3';
import ModalContent_Masu from "./ModalContent_Masu";
import ModalContent_Goal from "./ModalContent_Goal";
import ModalContent_Finish from "./ModalContent_Finish";






//環境変数
const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";
//ローカルでテストする時は以下コメントを外す
// const BACKEND_HOST = "http://localhost:2289";

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
        this.state["isModalOpen"] = false;
        this.state["modalContent"] = null;//モーダルの中身

        //子コンポーネントに渡す関数をバインド
        this.requestDiceRoll = this.requestDiceRoll.bind(this);
        this.setModalContent = this.setModalContent.bind(this);
        this.switchIsModalOpen = this.switchIsModalOpen.bind(this);
        //ref
        this.diceRef = React.createRef();
    }

    componentDidMount() {
        this.setModalContent(<Box>
                <a>ゲームスタート</a>
                <button onClick={() => {
                    const bgm_music = new Audio(bgm);
                    bgm_music.play();
                    this.switchIsModalOpen(false);
                    }}>ゲームスタート</button>
        </Box>);
        this.switchIsModalOpen(true);
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
        //サイコロを振って移動するマス数(ゴール時の移動マス数はサイコロの目通りでないため出目とイコールではない)
        let moveCount = response.position - this.state.playerList[response.order - 1].position;
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
                            "title": `${goalCount} 位`,
                            "description": `${(6 - goalCount) * 100}ポイントゲット!`,
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
                                this.diceRef.current.switchDiceButtonDisabled(false);
                            }
                        }
                        } />
                )
                audio_success.play();
                setTimeout(() => this.setState({ isModalOpen: true }), 500);//モーダルを表示
            }
            else {//ゴールでない場合，サイコロを有効にして次の人に番が回る
                setTimeout(() => this.diceRef.current.switchDiceButtonDisabled(false), 500);//サイコロボタンを有効にする．setStateが非同期なため，少し遅延を入れている
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
            setTimeout(() => {
                audio_move.play();
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



    /***モーダル関連のメソッド****/
    //モーダルの表示フラグを変更する
    switchIsModalOpen(isOpen) { this.setState({ isModalOpen: isOpen }); }
    //マス情報をモーダルの中身にセットする
    setModalContent(content) { this.setState({"modalContent": content }); }


    render() {
        return (

            <div>
                {/*サイドメニュー */}
                <Drawer variant="permanent" anchor="left" sx={{ '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "300px", background: "linear-gradient(to bottom, white, 75%, cyan)" } }}>
                    <div style={{ "textAlign": "center", "height": "300px" }}>
                        <Dice ref={this.diceRef} sugorokuId={this.props.sid} requestDiceRoll={this.requestDiceRoll}></Dice>
                    </div>
                    <Button style={{ "width": "70%", "margin": "0 auto 20px auto" }} ref={this.diceBtnRef} variant="contained" color="error" onClick={() => {
                        this.setModalContent(<>
                            <div>{/* マスタイトル */}
                                ゲームを中止して、メインメニューに戻りますか？<br />
                                （中止したゲームは再開できません）
                            </div>
                            <button className="close" onClick={() => { window.location.href = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku/" }}>メニューに戻る</button>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
                        </>)
                        this.switchIsModalOpen(true);
                    }}>メニューに戻る</Button>
                    <div style={{ "textAlign": "center" }}>
                        {(this.state.turnPlayer != null) && this.state.turnPlayer.name}さんの番です．
                    </div>
                    <div style={{ "height": "100px" }}>
                        <PlayerList playerList={this.state.playerList} nowPlayer={this.state.turnPlayer}></PlayerList>
                    </div>
                    {/* イベントやマスクリックで出てくるモーダル．サイドメニューより前面に出すためにDrawerの子にしている */} <Modal
                        sx={{ border: 0 }}
                        open={this.state.isModalOpen}
                        onClose={() => { console.log("test") }}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <>{this.state.modalContent != null && this.state.modalContent}</>
                    </Modal>
                </Drawer>
                {/* 盤面 */}
                <div style={{
                    "backgroundSize": "cover", "backgroundImage": `url(${mizutama})`,
                    "backgroundAttachment": "fixed",
                    "height": "200%", "width": "150%", "position": "absolute", "left": "0px", "top": "0px", "textAlign": "center", "zIndex": 10,
                    "backgroundColor": "rgba(255, 255, 255, 0.45)", "backgroundBlendMode": "lighten"
                }}>
                    <div style={{ "position": "absolute", "left": "300px", "top": "0px" }}>
                        <Board masuList={this.state.masuList} playerList={this.state.playerList}
                            switchIsModalOpen={this.switchIsModalOpen}
                            setModalContent={this.setModalContent}
                        ></Board>
                    </div>
                </div>
            </div>
        )
    }
}

