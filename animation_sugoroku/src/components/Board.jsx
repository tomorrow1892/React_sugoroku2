
import { Grid, Button } from "@mui/material";
import { React, createRef, useRef, useEffect } from "react";
import Icon from "./Icon";
import Masu from "./Masu";
import MasuStart from "./MasuStart";
import MasuGoal from "./MasuGoal";
import LeaderLine from "leader-line-new";
import { blue } from "@mui/material/colors";

//マスの配置場所は固定,Gameコンポーネントのdiv要素を基準とした絶対座標
const masuPositionList = [
    { left: 100, top: 50 },//スタートマス
    { left: 100, top: 200 },//1
    { left: 250, top: 200 },//2
    { left: 400, top: 200 },//3
    { left: 550, top: 200 },//4
    { left: 700, top: 200 },//5
    { left: 850, top: 200 },//6
    { left: 1000, top: 200 },//7
    { left: 1000, top: 400 },//8
    { left: 850, top: 400 },//9
    { left: 700, top: 400 },//10
    { left: 550, top: 400 },//11
    { left: 400, top: 400 },//12
    { left: 250, top: 400 },//13
    { left: 100, top: 400 },//14
    { left: 100, top: 600 },//15
    { left: 250, top: 600 },//16
    { left: 400, top: 600 },//17
    { left: 550, top: 600 },//18
    { left: 700, top: 600 },//19
    { left: 850, top: 600 },//20
    { left: 1000, top: 600 },//21
    { left: 1000, top: 800 },//22
    { left: 850, top: 800 },//23
    { left: 700, top: 800 },//24
    { left: 550, top: 800 },//25
    { left: 400, top: 800 },//26
    { left: 250, top: 800 },//27
    { left: 100, top: 800 },//28
    { left: 100, top: 1000 },//29
    { left: 250, top: 1000 },//30
    { left: 400, top: 1000 },//31
    { left: 550, top: 1000 },//32
    { left: 700, top: 1000 },//33
]


//マスを生成して管理するコンポーネント
//マスやコマの座標を管理する．
export const Board = (props) => {

    const masuListRefs = [];
    const masuListRef1 = useRef();
    const masuListRef2 = useRef();
    const coma1Ref = useRef();
    const coma2Ref = useRef();
    const coma3Ref = useRef();
    const coma4Ref = useRef();
    const coma5Ref = useRef();
    const coma6Ref = useRef();




    masuPositionList.forEach((_, i) => {
        masuListRefs[i] = useRef();
    })
    
    useEffect(() => {
        const lineOptions = {
            // color: window.getComputedStyle(document.getElementById("bibliography")).color,
            //startPlug: "disc",
            //endPlug: "behind"
            // size: 2,
            // startSocket: "left",
            // endSocket: "right"
        };
        //各マス同士を矢印で繋ぐ
        props.masuList.forEach((_, index) => {
            if (masuListRefs[index].current != null && masuListRefs[index + 1].current != null) new LeaderLine(masuListRefs[index].current, masuListRefs[index + 1].current, lineOptions);
        })
        //ゴール手前とゴールマスをつなぐ
        new LeaderLine(masuListRefs[props.masuList.length].current, masuListRefs[props.masuList.length+1].current, lineOptions);

    }, [])


    return (
        <div style={{ "positon": "relative", "top": "100px", "left": "100px" }}>
            {props.playerList.map((player, index) => {
                let comaRef;
                switch (player.order) {
                    case 1: comaRef = coma1Ref; break;
                    case 2: comaRef = coma2Ref; break;
                    case 3: comaRef = coma3Ref; break;
                    case 4: comaRef = coma4Ref; break;
                    case 5: comaRef = coma5Ref; break;
                    case 6: comaRef = coma6Ref; break;
                    default: break;
                }
                return (<Icon ref={comaRef} key={player.order} iconImg={player.icon}
                    x={masuPositionList[player.position].left + Math.floor(index / 2) * 30 + (index % 2) * 10} y={masuPositionList[player.position].top + (index % 2) * 35 + 30}></Icon>)
            })}
            <div ref={masuListRefs[0]} id="start" style={{ position: "absolute", top: masuPositionList[0].top, left: masuPositionList[0].left, width: "120px", height: "120px" }}>
                <MasuStart id="start" top={0} left={0}></MasuStart>
            </div>

            {props.masuList.map((masu, index) => {
                return (
                    <div ref={masuListRefs[index + 1]} key={index + 1}
                        style={{ position: "absolute", top: masuPositionList[index + 1].top, left: masuPositionList[index + 1].left, width: "120px", height: "120px" }}>
                        <Masu masu={masu} top={0} left={0}
                            switchIsVisible={props.switchIsVisible}
                            setModalContent={props.setModalContent}
                            setModalClosedMethod={props.setModalClosedMethod}
                        > </Masu>
                    </div>
                );
            })}
            <div id="goal" ref={masuListRefs[props.masuList.length+1]} style={{ position: "absolute", top: masuPositionList[props.masuList.length + 1].top, left: masuPositionList[props.masuList.length + 1].left, width: "120px", height: "120px" }}>
                <MasuGoal top={0} left={0}></MasuGoal>
            </div>

        </div>
    )
}

export default Board