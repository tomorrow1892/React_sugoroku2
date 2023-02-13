
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Modal, Card, Box, Button } from "@mui/material";
import styles from './css/masu.css';
import diceImgWhite from './img/dice.png';
import diceImgRed from './img/dice_red.png';
import diceImgBlue from './img/dice_blue.png';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {

  return (
    <>

        {(props.goalInfo != null) &&
          <ModalBase>
            <div className="title_text">ゴール!</div>
            <div className="rank_text">{props.goalInfo.title}</div>
            <div className="score_text">{props.goalInfo.description}</div>
          </ModalBase>
        }


      <Button className="close" variant="contained" sx={{ "display": "flex", "justifyContent": "center" }} onClick={props.handleClose}>閉じる
      </Button>
    </>
  );
}


export default GoalModal

const ModalBase = styled.div`
width: 200px;
height: 200px;
background: linear-gradient(135deg, rgba(240, 248, 255, 1) 40%, rgba(0, 201, 253, 1));
transform: rotate(45deg);
border: 3px solid blue;

position: relative;
  .title_text {
    transform: rotate(-45deg);
    text-align: center;
    position: absolute;
    top: 30px;
    left:10px;
    font-family: 'Zen Maru Gothic', sans-serif;
    font-size: x-large;
  }

  .rank_text {
    transform: rotate(-45deg);
    text-align: center;
    position: absolute;
    top: 70px;
    left:72px;
    font-family: 'Zen Maru Gothic', sans-serif;
    font-size: large;
  }
  
  .score_text {
    transform: rotate(-45deg);
    text-align: center;
    position: absolute;
    top: 105px;
    left:45px;
    // font-family: 'Zen Maru Gothic', sans-serif;
  }
`;