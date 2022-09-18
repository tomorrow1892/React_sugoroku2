
import "./css/dice.css";
import React from "react";
import { Button } from "@mui/material";
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
  }

  changeDice() {
    const dicebtn = this.diceBtnRef.current;
    const dice2d = this.dice2dRef.current;
    const dice3d = this.dice3dRef.current;
    if (dicebtn.textContent === "サイコロを振る") {
      dicebtn.textContent = "ストップ";
      dice2d.style.display = "none";
      dice3d.style.display = "block";
      return -1;
    } else if (dicebtn.textContent === "ストップ") {
      dicebtn.textContent = "サイコロを振る";
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
      dice2d.style.display = "block";
      dice3d.style.display = "none";
      this.props.requestDiceRoll(this.props.sugorokuId, rand);//バックエンドのサイコロ処理APIを呼び出す
    }
  }

  render() {
    return (
      <>
        <div className="diceContent" >
          <div className="inner">
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
            <Button id="diceBtn" ref={this.diceBtnRef} variant="contained" color="success" onClick={() => this.changeDice()}>
              サイコロを振る
            </Button>
          </div>

        </div>
      </>

    );
  }
}