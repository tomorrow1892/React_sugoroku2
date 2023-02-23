
import styled from "styled-components";
//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {

  return (
    <>
        {(props.goalInfo != null) &&
          <ModalBase>
            <div className="title_text">{props.goalInfo.goalCount}着でゴール!</div>
            {/* <div className="rank_text">{props.goalInfo.goalCount}着</div> */}
            <div className="score_text"><span style={{ "color": "red" }}>{props.goalInfo.getPoint}</span>ポイントゲット!</div>
            <BtnStyle>
          <button className="btn" onClick={props.handleClose}>閉じる
          </button>
        </BtnStyle>
          </ModalBase>
        }


      


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
    top: 50px;
    left:-10px;
    font-family: 'Zen Maru Gothic', sans-serif;
    font-size: 2rem;
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
    font-size:1.0rem;
    font-family: 'Zen Maru Gothic', sans-serif;
  }
  .btn {
    color:inherit;
    font-family:inherit;
    font-size: 20px;
    background: cyan;
    border: 3px solid black;
    margin-right: 2.6rem;
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
.options {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

`;
const BtnStyle = styled.div`
.btn {
  transform: rotate(-45deg);
  position: absolute;
    top: 200px;
    left:180px;
    color:inherit;
    font-family:inherit;
    font-size: 20px;
    border: 3px solid black;
    border-radius:10px;
    margin-right: 2.6rem;
    box-shadow: 0 0 0 black;
    transition: all 0.2s;
    background: cyan;
    width:100px;
    height:50px;
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
`