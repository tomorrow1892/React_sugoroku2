
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
import GoalModal from "./GoalModal";




//環境変数
const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";
// const BACKEND_HOST = "http://localhost:8080";

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
        this.state["isEventModalVisible"]= false;//イベント処理時のモーダルの表示フラグのstate
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
            nPlayers: sugorokuInfo.nplayers
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
        let response = JSON.parse(xhr.responseText);//サイコロを振ったターンプレイヤーのステータス
        let newState = this.getState();
        this.setState(newState); //positionが更新されてコマが移動する
        
        this.setEventModalClosedMethod();//イベントモーダルが閉じたときの処理をセット
        if(response.isGoaled){
            console.log("goal!");
            this.requestdoEvent();
        }
        else{
            this.setModalContent(this.state.masuList[response.position-1]);//プレイヤーの現在位置のマスをモーダルにセット
            setTimeout(()=> {this.setState({isEventModalVisible:true})},500);//モーダルの表示フラグをtrueにする
        }

        
        return response;
    }

    //イベントを処理する．(EventModalコンポーネントで使用)
    requestdoEvent(){
        let xhr = new XMLHttpRequest();
        let URI = BACKEND_HOST + "/api/doEvent?sugorokuId=" + this.props.sid;
        xhr.open("GET", URI, false);
        xhr.send();
        let response = JSON.parse(xhr.responseText);//イベント処理後のターンプレイヤーのステータス
        let newState = this.getState();
        this.setState(newState); //positionが更新されてコマが移動する
        if(response.isGoaled){//ゴールした場合
            console.log("goal!");
            let goalCount = this.checkGoalCount(newState.playerList);
            this.setModalContent({
                "title":"ゴール!",
                "description":`${goalCount}位でゴールしたので，${(6-goalCount)*100}ポイントゲット!`,
                "squareEventId":null
            });
            this.setGoalModalClosedMethod(newState.playerList);//モーダルを閉じるときの処理をセット
            setTimeout(()=>this.setState({isEventModalVisible:true}),500);//モーダルを表示
        }
        else{
             setTimeout(()=> this.diceRef.current.switchDiceButtonDisabled(false),500);//サイコロボタンを有効にする．setStateが非同期なため，少し遅延を入れている
        }
        return response;
    }

    //ゴールした人数を確認する.引数にはplayerListを持つオブジェクトが入る
    checkGoalCount(playerList){
        let goalCount = 0;
        playerList.forEach(player => {
            if(player.isGoaled) goalCount++;
        });
        return goalCount;
    }


   
    /***モーダル関連のメソッド****/
    //EventModalコンポーネントの表示フラグを変更する(EventModalコンポーネントで使用)
    switchIsVisible(isVisible){this.setState({isEventModalVisible:isVisible});}
    //マス情報をモーダルの中身にセットする
    setModalContent(masuObj){this.setState({"modalContent": masuObj});}
    
    
    //それ以外のモーダルを閉じるときの処理
    onModalClosed(){
        this.switchIsVisible(false); 
    }
    //イベント時に表示されるモーダルを閉じるときの処理をセット．閉じたときにイベントをリクエストする．
    setEventModalClosedMethod(){
        this.setState({onModalClosedMethod:()=>{
            this.switchIsVisible(false); 
            setTimeout(() => this.requestdoEvent(), 500);
        }})
    }
    //イベント処理後にゴールした場合のモーダルを閉じるときの処理をセット．閉じたときにサイコロボタンを有効にする．
    setGoalModalClosedMethod(playerList){
        console.log("ゴール人数(stateの方):"+this.checkGoalCount(this.state.playerList))
        console.log("ゴール人数:"+this.checkGoalCount(playerList))
        console.log("プレイヤー人数:"+this.state.nPlayers);
        if(this.checkGoalCount(playerList) == this.state.nPlayers){//全員がゴールした場合
            console.log("aaaa");
            this.setState({onModalClosedMethod:()=>{
                this.switchIsVisible(false);
                setTimeout(()=> {this.setState({isGoalModalVisible:true})},500);//モーダルの表示フラグをtrueにする
            }})
        }
        else{
            console.log("iiii");
            this.setState({onModalClosedMethod:()=>{
                this.switchIsVisible(false); 
                this.diceRef.current.switchDiceButtonDisabled(false);
            }})
        }
        
    }
    //それ以外のモーダルを閉じるときの処理をセット．ただ閉じるだけ
    setModalClosedMethod(){
        this.setState({onModalClosedMethod:()=>this.switchIsVisible(false)})
    }

    render() {
        return (
            <>
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

                            
                            <Board  masuList={this.state.masuList} playerList={this.state.playerList}
                            switchIsVisible = {this.switchIsVisible}
                            setModalContent = {this.setModalContent}
                            setModalClosedMethod = {this.setModalClosedMethod}
                            ></Board>

                            <EventModal 
                            isOpen={this.state.isEventModalVisible} 
                            modalContent={this.state.modalContent}
                            onClose={this.state.onModalClosedMethod}
                            ></EventModal>

                            <GoalModal
                            isOpen = {this.state.isGoalModalVisible} 
                            playerList = {this.state.playerList}></GoalModal>
                            
                        </div>
                    </Grid>
                </Grid>
            </>
        )
    }
}



// import { Grid, Button } from "@mui/material";
// import React from "react";
// import Dice2 from './Dice2';
// import PlayerList from './PlayerList';
// import cat from './img/cat.png';
// import dog from './img/dog.png';
// import hamster from './img/hamster.png';
// import hiyoko from './img/hiyoko.png';
// import penguin from './img/penguin.png';
// import zo from './img/zo.png';
// import Board from "./Board";
// import EventModal from "./EventModal";
// import MasuModal from "./MasuModal";



// //環境変数
// const BACKEND_HOST = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku";

// //プレイヤーのステータスを持つオブジェクト
// function Player(playerId, sugorokuId, icon, name, order, point, position, isGoaled, isBreak) {
//     this.playerId = playerId;
//     this.sugorokuId = sugorokuId;
//     this.icon = icon;
//     this.name = name;
//     this.order = order;
//     this.point = point;
//     this.position = position;
//     this.isGoaled = isGoaled;
//     this.isBreak = isBreak;

// }

// export default class Game extends React.Component {

//     constructor(props) {
//         super(props);
//         //内部変数
//         this.goalCount = 0;

//         //state
//         this.state = this.getState();//すごろくゲームに関するstateを取得
//         this.state["isEventModalVisible"]= false;//イベント処理時のモーダルの表示フラグのstate
//         this.state["isMasuModalVisible"]= false;//マスのモーダルの表示フラグのstate
//         this.state["modalContent"] = null;//モーダルの中身
//         //子コンポーネントに渡す関数をバインド
//         this.requestDiceRoll = this.requestDiceRoll.bind(this);
//         this.requestdoEvent = this.requestdoEvent.bind(this);
//         this.switchIsEventVisible = this.switchIsEventVisible.bind(this);
//         this.switchIsMasuVisible = this.switchIsMasuVisible.bind(this);
//         this.setModalContent = this.setModalContent.bind(this);

//         //ref
//         this.diceRef = React.createRef();
//     }

//     //バックエンドからゲーム設定を受け取ってstateにセットする
//     getState() {
//         const sugorokuInfo = this.requestSugorokuInfo(this.props.sid);
//         const playerList = new Array();//バックエンドから受け取ったplayerオブジェクトを新しいplayerオブジェクトに変換
//         sugorokuInfo.players.forEach(player => {
//             let iconImg;
//             switch (player.icon) {//画像をセット
//                 case "dog": iconImg = dog; break;
//                 case "cat": iconImg = cat; break;
//                 case "hiyoko": iconImg = hiyoko; break;
//                 case "hamster": iconImg = hamster; break;
//                 case "zo": iconImg = zo; break;
//                 case "penguin": iconImg = penguin; break;
//                 default: break;
//             }
//             //オブジェクトを生成してリストに入れる
//             playerList.push(new Player(player.playerId, player.sugorokuId,
//                 iconImg, player.name, player.order, player.points, player.position, player.isGoaled, player.isBreak));
//         })
//         const masuList = [...sugorokuInfo.squares];//バックエンドから受け取ったマスリストをそのまま入れる
//         const nowPlayer = sugorokuInfo.nowPlayer;//ターンプレイヤー
//         return {
//             playerList: playerList,//プレイヤーのリスト
//             masuList: masuList,//マスのリスト
//             nowPlayer: nowPlayer,//ターンプレイヤー
//         }
//     }

//     //すごろくの状態を取得する
//     requestSugorokuInfo(sugorokuId) {
//         var xhr = new XMLHttpRequest();
//         var URI = BACKEND_HOST + "/api/sugorokuInfo?sugorokuId=" + sugorokuId;
//         xhr.open("GET", URI, false);
//         xhr.send();
//         var response = JSON.parse(xhr.responseText);//nowPlayer,nplayers,players,squares
//         console.log(response);
//         return response;
//     }

//     //サイコロの出目をバックエンドに送信する．(Dice2コンポーネントで使用)
//     requestDiceRoll(suzi) {
//         var xhr = new XMLHttpRequest();
//         var URI = BACKEND_HOST + "/api/diceRoll?sugorokuId=" + this.props.sid + "&suzi=" + suzi;
//         xhr.open("GET", URI, false);
//         xhr.send();
//         var response = JSON.parse(xhr.responseText);//サイコロを振ったターンプレイヤーのステータス
//         this.setState(this.getState()); //positionが更新されてコマが移動する
//         this.setModalContent(this.state.masuList[response.position-1]);//プレイヤーの現在位置のマスをモーダルにセット
//         this.setState({"isCalledFromDoEvent": true});
//         setTimeout(()=> this.setState({isEventModalVisible:true}),500);//モーダルの表示フラグをtrueにする

        
//         return response;
//     }

//     //イベントを処理する．(EventModalコンポーネントで使用)
//     requestdoEvent(){
//         var xhr = new XMLHttpRequest();
//         var URI = BACKEND_HOST + "/api/doEvent?sugorokuId=" + this.props.sid;
//         xhr.open("GET", URI, false);
//         xhr.send();
//         var response = JSON.parse(xhr.responseText);//イベント処理後のターンプレイヤーのステータス
//         this.setState(this.getState()); //positionが更新されてコマが移動する
//         setTimeout(()=> this.diceRef.current.switchDiceButtonDisabled(false),500);//サイコロボタンを有効にする．setStateが非同期なため，少し遅延を入れている．

//         return response;
//     }

//     //ゴールした人数を確認し，人数が増えたらtrue，そのままならfalseを返す
//     checkGoalCount(sugorokuInfo){
//         let goalCount_new = 0;
//         let goalCount_old = this.goalCount;
//         sugorokuInfo.players.forEach(player => {
//             if(player.isGoaled) goalCount_new++;
//         });
//         this.goalCount = goalCount_new;//新しいゴール人数に更新
//         if(goalCount_new == goalCount_old+1){//誰かがゴールした場合
//             return true;
//         }
//     }

//     /***モーダル関連のメソッド****/
//     //EventModalコンポーネントの表示フラグを変更する(EventModalコンポーネントで使用)
//     switchIsEventVisible(isVisible){this.setState({isEventModalVisible:isVisible});}
//     //MasuModalコンポーネントの表示フラグを変更する(MasuModalコンポーネントで使用)
//     switchIsMasuVisible(isVisible){this.setState({isMasuModalVisible:isVisible});}
//     //マス情報をモーダルの中身にセットする
//     setModalContent(masuObj){this.setState({"modalContent": masuObj});}

//     render() {
//         return (
//             <>
//             {console.log(this.state.isEventModalVisible)}
//                 <Grid container>
//                     <Grid item xs={2}>
//                         <div style={{ "backgroundColor": "	#FFFFE0", "height": "100%" }}>
//                             <div style={{ "textAlign": "center", "height": "25vh" }}>
//                                 <Dice2 ref={this.diceRef} sugorokuId={this.props.sid} requestDiceRoll={this.requestDiceRoll}></Dice2>
                               
//                             </div>
//                             <div style={{ "height": "75vh" }}>
//                                 <PlayerList playerList={this.state.playerList}></PlayerList>
//                             </div>
//                         </div>
//                     </Grid>
//                     <Grid item xs>
//                         <div style={{ "position": "relative", "textAlign": "center", "backgroundColor": "#F3F1FA", "height": "100%" }}>
//                             <Button onClick={() => this.requestdoEvent()}> 何らかのテストボタン</Button>
//                             <EventModal switchIsVisible={this.switchIsEventVisible} requestdoEvent={this.requestdoEvent}
//                             isOpen={this.state.isEventModalVisible} 
//                             modalContent={this.state.modalContent}
//                             ></EventModal>
                            
//                             <Board  masuList={this.state.masuList} playerList={this.state.playerList}
//                             switchIsMasuVisible = {this.switchIsMasuVisible}
//                             setModalContent = {this.setModalContent}
//                             ></Board>
//                         </div>
//                     </Grid>
//                 </Grid>
//             </>
//         )
//     }
// }