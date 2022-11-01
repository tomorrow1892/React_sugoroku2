
import { areArraysEqual } from "@mui/base";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const CancelModal = (props) => {


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
                            <div>{/* マスタイトル */}
                                ゲームを中止して、メインメニューに戻りますか？<br />
                                （中止したゲームは再開できません） 
                            </div>
                            <button className="close" onClick={() => {window.location.href="https://es4.eedept.kobe-u.ac.jp/miraisugoroku/"}}>メニューに戻る</button>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
                        </ModalStyle>
                    </CSSTransition>
                </div>
                <CSSTransition
                    onClick={() => { props.onClose() }}
                    classNames="overlay"
                    in={props.isOpen}
                    timeout={700}
                    unmountOnExit>
                    <OverlayStyle />
                </CSSTransition>
            </TransitionStyle>
        </>
    );
}

export default CancelModal


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
    padding-bottom: 20px
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