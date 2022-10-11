
import { Grid, Button } from "@mui/material";
import React from "react";
import Icon from "./Icon";
import Masu from "./Masu";
import MasuStart from "./MasuStart";
import MasuGoal from "./MasuGoal";

//マスの配置場所は固定,Gameコンポーネントのdiv要素を基準とした絶対座標
const masuPositionList = [
    { left: 100, top: 50 },//スタートマス
    { left: 100, top: 200 },//1
    { left: 250, top: 210 },//2
    { left: 400, top: 220 },//3
    { left: 550, top: 230 },//4
    { left: 700, top: 240 },//5
    { left: 850, top: 250 },//6
    { left: 1000, top: 260 },//7
    { left: 1000, top: 400 },//8
    { left: 850, top: 410 },//9
    { left: 700, top: 420 },//10
    { left: 550, top: 430 },//11
    { left: 400, top: 440 },//12
    { left: 250, top: 450 },//13
    { left: 100, top: 460 },//14
    { left: 100, top: 600 },//15
    { left: 250, top: 610 },//16
    { left: 300, top: 620 },//17

]

//マスを生成して管理するコンポーネント
//マスやコマの座標を管理する．
export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.coma1Ref = React.createRef();
        this.coma2Ref = React.createRef();
        this.coma3Ref = React.createRef();
        this.coma4Ref = React.createRef();
        this.coma5Ref = React.createRef();
        this.coma6Ref = React.createRef();
    }

    //アニメ未実装
    // async moveComa(count, comaRef) {
    //     let index = 0;
    //     console.log("count:" + count);
    //     let comaNowPosition = this.props.nowPlayer.position;//コマの現在マス
    //     while (index < count) {
    //         const distX = masuPositionList[comaNowPosition + 1].left - masuPositionList[comaNowPosition].left;//一つ次のマスまでのX方向の距離
    //         const distY = masuPositionList[comaNowPosition + 1].top - masuPositionList[comaNowPosition].top;//一つ次のマスまでのY方向の距離
    //         console.log("distX:" + distX);
    //         //console.log("distY:"+distY);
    //         comaNowPosition += 1;
    //         await comaRef.current.toNext(distX, distY);
    //         index++;
    //     }
    // }

    render() {
        return (
            <div style={{"positon":"relative","top": "100px","left":"100px"}}>
                {this.props.playerList.map((player, index) => {
                    let comaRef;
                    switch (player.order) {
                        case 1: comaRef = this.coma1Ref; break;
                        case 2: comaRef = this.coma2Ref; break;
                        case 3: comaRef = this.coma3Ref; break;
                        case 4: comaRef = this.coma4Ref; break;
                        case 5: comaRef = this.coma5Ref; break;
                        case 6: comaRef = this.coma6Ref; break;
                        default: break;
                    }
                    return (<Icon ref={comaRef} key={player.order} iconImg={player.icon}
                        x={masuPositionList[player.position].left + index * 20} y={masuPositionList[player.position].top + 30}></Icon>)
                })}
                <MasuStart top={masuPositionList[0].top} left={masuPositionList[0].left}></MasuStart>
                {this.props.masuList.map((masu, index) => {
                    return (<Masu key={index + 1} masu={masu} top={masuPositionList[index + 1].top} left={masuPositionList[index + 1].left}
                        switchIsVisible = {this.props.switchIsVisible}
                        setModalContent = {this.props.setModalContent}
                        setModalClosedMethod = {this.props.setModalClosedMethod}
                    > </Masu>);
                })}
                <MasuGoal top={masuPositionList[this.props.masuList.length+1].top} left={masuPositionList[this.props.masuList.length+1].left}></MasuGoal>
            </div>

        )
    }
}