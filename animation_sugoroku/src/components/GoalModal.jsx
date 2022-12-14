
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Modal, Card, Box,Button } from "@mui/material";
import styles from './css/masu.css';
import diceImgWhite from './img/dice.png';
import diceImgRed from './img/dice_red.png';
import diceImgBlue from './img/dice_blue.png';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {

  return (
    <>
      <TransitionStyle>
        <div className="modal-wrapper">
          <CSSTransition
            classNames="modal"
            in={props.isOpen}
            timeout={700}
            unmountOnExit>
            <ModalStyle>
              <MasuStyle>
                {(props.modalContent != null)&&
                  <ModalBase>
                    <div className="title_text">ゴール!</div>
                    <div className="rank_text">{props.modalContent.title}</div>
                    <div className="score_text">{props.modalContent.description}</div>
                  </ModalBase>
                }
              </MasuStyle>

              <Button className="close" variant="contained" sx={{"display": "flex","justifyContent": "center"}} onClick={() => { props.onClose() }}>閉じる</Button>
            </ModalStyle>
          </CSSTransition>
        </div>
        <CSSTransition
          classNames="overlay"
          onClick={() => { props.onClose() }}
          in={props.isOpen}
          timeout={700}
          unmountOnExit>
          <OverlayStyle />
        </CSSTransition>
      </TransitionStyle>
    </>
  );
}


export default GoalModal

// transitionのスタイル
const TransitionStyle = styled.div`
  .open{
    cursor: pointer;
    font-size: 40px;  
    font-weight: bold;
  }
  
  .modal-wrapper{
    position: fixed;
    top: 50%;
    left: 50%;
    width:200px;
    transform: translate(-50%, -50%);
    z-index:10000;
    
    .modal-enter {
      opacity: 0;
      transform: scale(0.9);
    }
 
    .modal-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 0.3s, transform 0.3s;
    }
 
    .modal-exit {
      opacity: 1;
    }
 
    .modal-exit-active {
      opacity: 0;
      transition: opacity 0.3s, transform 0.3s;
      transform: scale(0.9);
    }
  }
  
  .overlay-enter {
    opacity: 0;
  }
 
  .overlay-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 0.3s, transform 0.3s;
  }
 
  .overlay-exit {
    opacity: 1;
  }
 
  .overlay-exit-active {
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
  }
`;

// モーダルのスタイル
const ModalStyle = styled.div`
  // padding: 5%;
  // background-color: #ffffff;
  // display: flex;
  // flex-direction: column;
  // justify-content: center;
  // align-items: center;
  // border-radius:5%;
  // border:2mm ridge #ffff00;

  // .content{
  //   font-size: 40px;
  //   font-weight: bold;
  // }
  
  .close{
    cursor: pointer;
    margin-top: 80px;
    margin-left:auto;
    margin-right:auto;
    width: 120px;
    height: 50px;
    font-size: x-large;
    background-color: cyan;
    color: blue;
  }
`

// オーバーレイのスタイル
const OverlayStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255, 0.5);
`;

const MasuStyle = styled.div`
.masu{
  width: 25rem;
  height: 30rem;
  position: relative;
  
  
}
.masu .masu-header{
  height:50%;
  background-color: #c1ff7953;
}
  .masu-header .masu-img{
      
      max-height: 100%;
      max-width: 100%;
  }

.masu .masu-body{
  height:50%;
  width: 100%;
}
  .masu-body ul{
      height: 100%;
  }
  .masu-body .masu-title{
      height: 40%;
      width: auto;
      text-align: center;
      
  }
      .masu-title p{
          height: 100%;
          font-size: 1.2rem;
          overflow: auto;
          font-family: 'Zen Maru Gothic', sans-serif;
      }

  .masu-body .masu-description{
      height: 60%;
      width: 100%;
  }
      .masu-description p{
          font-size: 0.8rem;
          height: 100%;
          width: 100%;
          overflow: auto;
      }

.masu .masu-event{
  position: absolute;
  width:25%;
  right: 0%; 
  top: 40%;
}

  .masu-event img{
      position: absolute;
      box-sizing:content-box;
      top: 50%;
      left: 50%;
      transform:translateX(-50%) translateY(-50%);
      width: 100%;
  }
  .masu-event p{
      position: absolute;
      width: 100%;
      text-align: center;
      top: 50%;
      left: 50%;
      transform:translateX(-50%) translateY(-50%);
      white-space: normal;
  
  }
`

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