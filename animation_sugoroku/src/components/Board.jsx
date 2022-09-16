
import { Grid, Button } from "@mui/material";
import React from "react";
import Masu from "./Masu";

//マスの配置場所は固定,Gameコンポーネントのdiv要素を基準とした絶対座標
const masuPositionList = [
    {left:100,top:100},
    {left:250,top:110},
    {left:400,top:120},
    {left:550,top:130},
    {left:700,top:140},
    {left:850,top:150},
    {left:1000,top:160}
]

//マスを生成して管理するコンポーネント
export default class Board extends React.Component {

    constructor(props) {
        super(props);
        console.log(this.props.masuList);
    }
    render() {
        return (
            <>
            {console.log("aaaa")}
            {this.props.masuList.map((masu,index) => {
                console.log(index);
                return (<Masu key={index} masu={masu} top={masuPositionList[index].top} left={masuPositionList[index].left}> </Masu>);
            })}
            {console.log("iiii")}

            </>

        )
    }
}