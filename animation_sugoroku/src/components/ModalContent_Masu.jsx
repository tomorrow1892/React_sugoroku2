
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Modal, Card, Box, Button } from "@mui/material";
import styles from './css/masu.css';
import diceImgWhite from './img/dice.png';
import diceImgRed from './img/dice_red.png';
import diceImgBlue from './img/dice_blue.png';
import { pc, sp, tab, xs, sm, md, lg, xl } from '../media';
import { textAlign } from "@mui/system";

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
        <ModalStyle>
            <Card className="contents">
                <div className="modal_contents" style={{ position: "absolute", left: "50%", top: "50%", transform: "translateY(-50%) translateX(-50%)" }}>
                    <MasuStyle>
                        {(props.masuInfo != null) &&
                            <div>
                                <Card className="masu" >

                                    <Box className="masu-header" sx={{ display: 'flex', justifyContent: "center" }}>
                                        {
                                            (props.masuInfo != null) &&
                                            <img src={props.masuInfo.picture} className="masu-img" />
                                        }
                                    </Box>
                                    <Box className="masu-body">
                                        <ul className="list-group ">
                                            <li className="masu-title list-group-item">
                                                <p className="align-items-center">
                                                    {/* マスタイトル */}
                                                    {(props.masuInfo != null) &&
                                                        <>{props.masuInfo.title}</>
                                                    }
                                                </p>
                                            </li>
                                            <li className="masu-contents list-group-item ">
                                                <p className="masu-description">
                                                    {/* マスの詳細 */}
                                                    {(props.masuInfo != null) &&
                                                        <>
                                                            {props.masuInfo.description}
                                                        </>}
                                                </p>
                                                <p className="masu-creator">
                                                    {/* マスの詳細 */}
                                                    {(props.masuInfo != null) &&
                                                        <>
                                                            作者: {props.masuInfo.nickName}
                                                        </>}
                                                </p>
                                            </li>
                                        </ul>
                                    </Box>
                                    <Box className="masu-event">
                                        {
                                            (props.masuInfo.squareEffect > 0) ?
                                                <img src={diceImgBlue}></img> :
                                                <img src={diceImgRed}></img>
                                        }
                                        { }
                                        <p className="font-wght700">{getEventfromEventId(props.masuInfo.squareEventId)}</p>

                                    </Box>
                                </Card>
                                <button className="btn" variant="contained" onClick={props.handleClose}>閉じる</button>
                            </div>

                        }

                    </MasuStyle>

                </div>


            </Card>
        </ModalStyle>
    );
}


export default EventModal


const MasuStyle = styled.div`
.masu{
    ${xs` width: 18rem; height: 22rem;`}
    ${sm` width: 18rem; height: 22rem;`}
    ${md` width: 20rem; height: 24rem;`}
    ${lg` width: 25rem; height: 30rem;`}
  
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
`;

const ModalStyle = styled.div`

    @keyframes slide {
        from {
        background-position: 0 0;
        }
    
        to {
        background-position: -120px 60px;
        }
    }
    .contents {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        ${pc` width :800px;height: 90vh `}
        ${tab` width :800px; height: 90vh`}
        ${sp` width :100wh; height: 100vh`}
        ${pc` font-size: 30px; `}
       ${sp` font-size: 20px; `}
        font-family: 'Zen Maru Gothic', sans-serif;
        overflow:auto;
        border: 3px solid black;
        border-radius: 10px;
        background: white;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .message {
       ${pc` font-size: 3.0rem;`}
        ${tab` font-size: 2.0rem;`}
        ${sp` font-size: 2.0rem;`}
        
        margin-top: 30px;
    }
    .btn {
        color:inherit;
        font-family:inherit;
        font-size: 20px;
        background: cyan;
        ${pc` width:200px;`}
        ${tab` width:150px;`}
        ${sp` width:150px;`}
        margin-top: 1.6rem;
        border: 3px solid black;
        box-shadow: 0 0 0 black;
        transition: all 0.2s;
    }
    
    .btn:last-child {
        margin: 0;
    }
    
    .btn:hover {
        box-shadow: 0.2rem 0.2rem 0 rgb(156, 156, 156);
    }
    
    .btn:active {
        box-shadow: 0.2rem 0.2rem 0 rgb(156, 156, 156);
    }
    .square{
        width:200px;
        height:200px;
        ${pc` width:200px; height:200px;`}
        ${tab` width:150px; height:150px;`}
        ${sp` width:150px; height:150px;`}
    }
    .yellow{
        background-color:yellow;
    }
    .options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`;