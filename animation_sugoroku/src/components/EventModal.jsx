
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { Modal, Card } from "@mui/material";

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
    }
  }
  // return (
  //   <>
  //     <Modal
  //       open={props.isOpen}
  //       onclose={() => { props.onClose() }}
  //       aria-labelledby="simple-modal-title"
  //     aria-describedby="simple-modal-description"
  //       sx={{top: '50%',
  //       left: '20%',
  //       right: 'auto',
  //       bottom: 'auto',
  //       marginRight: '-50%',
  //       "width":"60%",
  //       "height":"5%"
  //       }}
  //     >
  //       <Card sx={{"borderRadius":"2%"}}>
  //       <br></br>
  //       <br></br>
  //       <br></br>
  //       <br></br>
  //       <div className="content">{/* マスタイトル */}
  //         {(props.modalContent != null) && props.modalContent.title}
  //       </div>
  //       <div>{/* マスの詳細 */}
  //         {(props.modalContent != null) && props.modalContent.description}
  //       </div>
  //       <div>
  //         {(props.modalContent != null) && (props.modalContent.squareEventId != null) && (getEventfromEventId(props.modalContent.squareEventId))}
  //       </div>
  //       <div className="close" onClick={() => { props.onClose() }}>閉じる</div>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
  //       </Card>

  //     </Modal>
  //   </>
  // )

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
              
              {/* マスタイトル */}
              {(props.modalContent != null) &&
                <div className="content" style={{textAlign: "center"}}>
                  {props.modalContent.title}
                </div>}
              
              {/* マスイベント内容(1進むなど) */}
              {(props.modalContent != null) &&
                <Card sx={{
                  backgroundColor:(props.modalContent.squareEffect>0) ? "#DDAAAA":"#AAAADD",
                  
                }}>
                  {getEventfromEventId(props.modalContent.squareEventId)}
                </Card>}
                {/* 画像 */}
              {(props.modalContent != null) &&
                <img
                  style={{ "width": "100%" }}
                  src={props.modalContent.picture} />
              }
              {/* マスの詳細 */}
              {(props.modalContent != null) &&
                <div>
                  {props.modalContent.description}
                </div>}

              <div className="close" onClick={() => { props.onClose() }}>閉じる</div>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
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
  padding: 10%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius:5%;
  border:2mm ridge #ffff00;

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