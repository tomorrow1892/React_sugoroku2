
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Modal, Card, Box,Button } from "@mui/material";
import styles from './css/masu.css';
import diceImgWhite from './img/dice.png';
import diceImgRed from './img/dice_red.png';
import diceImgBlue from './img/dice_blue.png';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const EventModal = (props) => {

  const getEventfromEventId = (eventId) => {
    switch (eventId) {
      case 0: return ""; 
      case 1: return "1マス進む"; 
      case 2: return "2マス進む"; 
      case 3: return "3マス進む"; 
      case 4: return "4マス進む"; 
      case 5: return "5マス進む"; 
      case 6: return "6マス進む"; 
      case 7: return "1マス戻る"; 
      case 8: return "2マス戻る"; 
      case 9: return "3マス戻る"; 
      case 10: return "4マス戻る"; 
      case 11: return "5マス戻る"; 
      case 12: return "6マス戻る"; 
      case 13: return "1回休み"; 
      case 15: return "+100点"
      case 16: return "+200点"
      case 17: return "+300点"
      case 18: return "+400点"
      case 19: return "+500点"
      case 20: return "-100点"
      case 21: return "-200点"
      case 22: return "-300点"
      case 23: return "-400点"
      case 24: return "-500点"
  }
  }


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
                <Card className="masu" >

                  <Box className="masu-header" sx={{ display: 'flex', justifyContent: "center" }}>
                    {
                      (props.modalContent != null) &&
                      <img src={props.modalContent.picture} className="masu-img" />
                    }
                  </Box>
                  <Box className="masu-body">
                    <ul className="list-group ">
                      <li className="masu-title list-group-item">
                        <p className="align-items-center">
                          {/* マスタイトル */}
                          {(props.modalContent != null) &&
                            <>{props.modalContent.title}</>
                          }
                        </p>
                      </li>
                      <li className="masu-description list-group-item ">
                        <p className="card-text">
                          {/* マスの詳細 */}
                          {(props.modalContent != null) &&
                            <>
                              {props.modalContent.description}
                            </>}
                        </p>
                      </li>
                    </ul>
                  </Box>
                  <Box className="masu-event">
                    {
                      (props.modalContent.squareEffect > 0) ?
                        <img src={diceImgBlue}></img> :
                        <img src={diceImgRed}></img>
                    }
                    {}
                    <p className="font-wght700">{getEventfromEventId(props.modalContent.squareEventId)}</p>
                    
                  </Box>
                </Card>}
              </MasuStyle>


              <Button className="close" variant="contained" sx={{"display": "flex","justifyContent": "center"}} onClick={() => { props.onClose() }}>閉じる</Button>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
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


export default EventModal

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
    width:500px;
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
   //background-color: #ffffff;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
  margin: 1em;
  // border-radius:5%;
  // border:2mm ridge #ffff00;

  // .content{
  //   font-size: 40px;
  //   font-weight: bold;
  // }
  
  .close{
    cursor: pointer;
    margin: 30px 0 0;
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