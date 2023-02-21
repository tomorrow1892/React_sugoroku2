
import "./css/dice.css";
import React from "react";
import { Button,Card, Typography } from "@mui/material";
import dice1Img from "./img/1dice.jpeg";
import dice2Img from "./img/2dice.jpeg";
import dice3Img from "./img/3dice.jpeg";
import dice4Img from "./img/4dice.jpeg";
import dice5Img from "./img/5dice.jpeg";
import dice6Img from "./img/6dice.jpeg";

export default class DiceImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceState: false
    };
    this.dice2dRef = React.createRef();
    this.dice3dRef = React.createRef();
    this.diceBtnRef = React.createRef();
    this.diceContentsRef = React.createRef();
  }

  componentDidMount() {
  this.diceContentsRef.current.addEventListener("click",(e)=>{
    this.changeDice();
  },{"once":true});
}

  //サイコロを振る→数秒後に自動で止まる場合
  changeDice() {
    const dicebtn = this.diceBtnRef.current;
    const dice2d = this.dice2dRef.current;
    const dice3d = this.dice3dRef.current;

    dice2d.style.display = "none";
    dice3d.style.display = "block";
    this.switchDiceButtonDisabled(true);//イベント処理後までボタンを無効にする
    let max = 6;
    let rand = Math.floor(Math.random() * max) + 1;
    switch (rand) {
      case 1: dice2d.src = dice1Img; break;
      case 2: dice2d.src = dice2Img; break;
      case 3: dice2d.src = dice3Img; break;
      case 4: dice2d.src = dice4Img; break;
      case 5: dice2d.src = dice5Img; break;
      case 6: dice2d.src = dice6Img; break;
    }
    //１秒後にサイコロが止まり，1秒後にモーダルが閉じ，0.5秒後にコマが動き出す．
    setTimeout(() => {
      dice2d.style.display = "block";
      dice3d.style.display = "none";
      setTimeout(()=>{
        this.props.handleClose();
        setTimeout(()=>{
          this.props.requestDiceRoll(rand);//バックエンドのサイコロ処理APIを呼び出す
        },500)
      },1000)
    }, 1000);

  }


  switchDiceButtonDisabled(isDisabled) {
    // this.diceBtnRef.current.disabled = isDisabled;
    if (isDisabled) {
      this.diceBtnRef.current.style.display = "none";
    } else {
      this.diceBtnRef.current.style.display = "block";
    }
  }

  render() {
    return (
      <>
        <div className="diceContent" >
          <div className="inner" ref={this.diceContentsRef}>
            <img
              id="dice2d"
              src={dice1Img}
              alt="出目1"
              ref={this.dice2dRef}
              className="diceImage"
            />
            <div className="dice3d" style={{ "display": "none" }} ref={this.dice3dRef}>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
              <div className="item"></div>
            </div>
            <Button id="diceBtn" ref={this.diceBtnRef} 
            sx={{backgroundColor:"white",borderColor:"blue"}} >
              <Typography fontFamily="'Zen Maru Gothic', sans-serif">サイコロを振る</Typography>
            </Button>
          </div>

        </div>
      </>

    );
  }
}