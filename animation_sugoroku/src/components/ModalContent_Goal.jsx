
import styled from "styled-components";
import { pc, sp, tab ,xs,sm,md,lg,xl } from '../media';
import { Modal, Card, Box, Button } from "@mui/material";
//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {

  return (
    <ModalStyle>
      <Card className="contents" style={{ display: 'flex', justifyContent: "center" }}>
        {(props.goalInfo != null) &&
          <>
            <ModalBase>
              <div className="title_text">{props.goalInfo.goalCount}着でゴール!</div>
              {/* <div className="rank_text">{props.goalInfo.goalCount}着</div> */}
              <div className="score_text"><span style={{ "color": "red" }}>{props.goalInfo.getPoint}</span>ポイントゲット!</div>

            </ModalBase>
            <BtnStyle>
              <button className="btn" onClick={props.handleClose}>閉じる
              </button>
            </BtnStyle>
          </>
        }
      </Card>
    </ModalStyle>

  );
}


export default GoalModal

const ModalBase = styled.div`
width: 200px;
height: 200px;
background: linear-gradient(135deg, rgba(240, 248, 255, 1) 40%, rgba(0, 201, 253, 1));
transform: translateY(-50%) rotate(45deg) ;
border: 3px solid blue;
top: 50%;
   


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
  
  position: absolute;
    bottom: 0px;
    left:50%;
    transform: translateX(-50%);
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
        margin-bottom: 1.6rem;
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
