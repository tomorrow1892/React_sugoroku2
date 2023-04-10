
import { areArraysEqual } from "@mui/base";
import { Card } from "@mui/material";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";
import { pc, sp, tab } from '../media';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const FinishModal = (props) => {
  //ポイントが高い順にプレイヤーリストをソートしたコピーを返す．
  const rankSort = (playerList) => {
    let playerList_sort = Array.from(playerList);
    playerList_sort.sort((a, b) => {
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      return 0;
    })
    return playerList_sort;
  }

  //順位付けに使う
  let samePointCount = 0;
  let rankedPoint = 10000000;//
  return (
    <ModalStyle>
      <Card className="modal">
        <div className="modal_contents">
        <div className="content message">{/* マスタイトル */}
          ゲーム終了!
        </div>
        <ResultTable>
          <table>
            {rankSort(props.playerList).map((player, index) => {
              if (player.points == rankedPoint) samePointCount++;//前の人とポイントが同じ場合，同順位となるようカウントに+1
              else samePointCount = 0;//前の人とポイントが違う場合，カウントをリセット
              rankedPoint = player.point;
              return (
                <tr>
                  <th>{index + 1 - samePointCount}位</th>
                  <td>{player.name}</td>
                  <td>{player.points}ポイント</td>
                </tr>
              );
            })
            }
          </table>
        </ResultTable>

        { // rankSort(props.playerList).map((player, index) => {
          //         if (player.point == rankedPoint) samePointCount++;//前の人とポイントが同じ場合，同順位となるようカウントに+1
          //         else samePointCount = 0;//前の人とポイントが違う場合，カウントをリセット
          //         rankedPoint = player.point;
          //         return (<div key={index}>{index + 1 - samePointCount}位:    {player.name}</div>);
          //     })
        }

        <button className="btn" onClick={() => { window.location.href = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku/" }}>始めの画面に戻る</button>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
        </div>
        
      </Card>

    </ModalStyle>
  );
}

export default FinishModal

const ModalStyle = styled.div`
.modal_flame{
    width :80vw;
    height : 80vh;
    margin: 2em auto;
    padding:2em;/*内側余白*/
    border-radius: 30px 60px/60px 30px;
    border: solid 8px #ccc7be;
        position: relative;
    }
    .modal_contents{
       ${pc` font-size: 20px; `}
       ${sp` font-size: 10px; `}
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
        -webkit- transform: translateY(-50%) translateX(-50%);
            font-family: 'Zen Maru Gothic', sans-serif;
        }
    @keyframes slide {
        from {
        background-position: 0 0;
        }
    
        to {
        background-position: -120px 60px;
        }
    }
    
    .modal {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        ${pc` width :800px;height: 90vh `}
        ${tab` width :800px; height: 90vh`}
        ${sp` width :100wh; height: 100vh`}
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 1.6rem 3rem;
        border: 3px solid black;
        border-radius: 5px;
        background: white;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .message {
        ${pc` font-size: 3.1rem; `}
        ${sp` font-size: 2.1rem; `}
        margin-bottom: 1.6rem;
        margin-top: 0;
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
        width:200px;
        height:100px;
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
const ResultTable = styled.div`
table {
  border-collapse: collapse;  /* セルの線を重ねる */
}

th,td {
  padding: 5px 10px;          /* 余白指定 */
}

th {
  background-color: #2196F3;  /* 背景色指定 */
  color:  #fff;               /* 文字色指定 */
  font-weight:  normal;       /* 文字の太さ指定 */
  position:  relative;        /* 位置指定 */
  z-index: 10;                /* 重なり調整 */
}

td {
  background-color:  #c0c9ff; /* 背景色指定 */
  padding-left: 25px;         /* 余白指定 */
}

th::after {
  content:'';                 /* 空の要素を作る */
  position:  absolute;        /* 位置指定 */
  height: 24px;               /* 高さ指定 */
  width: 24px;                /* 幅指定 */
  background-color: #2196F3;  /* 背景色指定 */
  transform:  rotate(45deg);  /* 要素を回転 */
  top: 5px;                   /* 位置指定 */
  right: -12px;               /* 位置指定 */
  z-index:  -1;               /* 重なり調整 */
}

tr {
  border-bottom:  solid #fff; /* 線指定 */
}
`;

