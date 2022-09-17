
import { CSSTransition } from "react-transition-group";
import { useState } from "react";
import styled from "styled-components";

export const ModalTest = (props) => {
    

    return (
        <>
            <TransitionStyle>
                <div className="open" onClick={() => props.switchIsVisible(true)}>開く</div>
                <div className="modal-wrapper">
                    <CSSTransition
                        classNames="modal"
                        in={props.isOpen}
                        timeout={700}
                        unmountOnExit>
                        <ModalStyle>
                            <div className="content">
                                モーダルです。
                            </div>
                            <div className="close" onClick={() => props.switchIsVisible(false)}>閉じる</div>
                        </ModalStyle>
                    </CSSTransition>
                </div>
                <CSSTransition
                    classNames="overlay"
                    onClick={() => switchIsOpen(false)}
                    in={props.isOpen}
                    timeout={700}
                    unmountOnExit>
                    <OverlayStyle />
                </CSSTransition>
            </TransitionStyle>
        </>
    );
}

export default ModalTest

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