import "./styles.css";

import React from "react";
import { render } from "react-dom";
import styled from "styled-components";

import "../img/1dice.jpeg";
import "../img/2dice.jpeg";
import "../img/3dice.jpeg";
import "../img/4dice.jpeg";
import "../img/5dice.jpeg";
import "../img/6dice.jpeg";

export default class DiceImage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      diceState: false
    };
    this.im = "../img/1dice.jpeg";
  }

  changeDice(e) {
    if (e.target.textContent === "サイコロを振る") {
      e.target.textContent = "ストップ";
      this.resultElem.style.display = "none";
      this.aniDiceElem.style.display = "block";
    } else if (e.target.textContent === "ストップ") {
      e.target.textContent = "サイコロを振る";
      let max = 6;
      let rand = Math.floor(Math.random() * max) + 1;
      // let index = 2;
      this.im = "../img/" + rand + "dice.jpeg";
      this.resultElem.src = require(this.im);
      this.resultElem.style.display = "";
      this.aniDiceElem.style.display = "none";
      console.log(this.resultElem);
      console.log(this.im);
    }
  }

  render() {
    return (
      <div>
        <img
          src={require(this.im)}
          alt="出目1"
          ref={(e) => (this.resultElem = e)}
        />
        <div
          className="aniDice"
          style={{ display: "none" }}
          ref={(e) => (this.aniDiceElem = e)}
        >
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
          <div className="item"></div>
        </div>
        <button type="button" onClick={(e) => this.changeDice(e)}>
          サイコロを振る
        </button>
      </div>
    );
  }
}