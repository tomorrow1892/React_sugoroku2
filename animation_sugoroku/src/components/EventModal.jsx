
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import styled from "styled-components";
import { Card } from "@mui/material";


export const EventModal = (props) => {
    
  const getEventfromEventId = (eventId)=>{
    switch (eventId) {
      case 0: return ""; break;
      case 1: return "1マス進む"; break;
      case 2: return "2マス進む"; break;
      case 3: return "3マス進む"; break;
      case 4: return "4マス進む"; break;
      case 5: return "5マス進む"; break;
      case 6: return "6マス進む"; break;
      case 7: return "1マス戻る"; break;
      case 8: return "2マス戻る"; break;
      case 9: return "3マス戻る"; break;
      case 10: return "4マス戻る"; break;
      case 11: return "5マス戻る"; break;
      case 12: return "6マス戻る"; break;
      case 13: return "1回休み"; break;
    }
  }

    return (
        <>
        {console.log(props.modalContent)}
            <TransitionStyle>
                <div className="open" onClick={() => props.switchIsVisible(true)}>開く</div>
                <div className="modal-wrapper">
                    <CSSTransition
                        classNames="modal"
                        in={props.isOpen}
                        timeout={700}
                        unmountOnExit>
                        <ModalStyle>
                            <div  className="content">{/* マスタイトル */}
                                {(props.modalContent!=null) &&  props.modalContent.title}
                            </div>
                            <div>{/* マスの詳細 */}
                            {(props.modalContent!=null) &&  props.modalContent.description}
                            </div>
                            <div>
                            {(props.modalContent!=null) &&  (getEventfromEventId(props.modalContent.squareEventId))}
                           
                            </div>
                            <div className="close" onClick={() => {props.switchIsVisible(false);setTimeout(()=>props.requestdoEvent(),500)}}>閉じる</div>
                        </ModalStyle>
                    </CSSTransition>
                </div>
                <CSSTransition
                    classNames="overlay"
                    onClick={() => {props.switchIsVisible(false);setTimeout(()=>props.requestdoEvent(),500)}}
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index:1000;
    
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
  padding: 100px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius:10%;

  
  .content{
    font-size: 40px;
    font-weight: bold;
  }
  
  .close{
    cursor: pointer;
    margin: 50px 0 0;
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
  background-color: rgba(0, 0, 0, 0.5);
`;