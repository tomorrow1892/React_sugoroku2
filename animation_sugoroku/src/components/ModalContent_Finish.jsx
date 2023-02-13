
import { areArraysEqual } from "@mui/base";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const FinishModal = (props) => {



  //ポイントが高い順にプレイヤーリストをソートしたコピーを返す．
  const rankSort = (playerList) => {
    let playerList_sort = Array.from(playerList);
    playerList_sort.sort((a, b) => {
      if (a.point > b.point) return -1;
      if (a.point < b.point) return 1;
      return 0;
    })
    return playerList_sort;
  }

  //順位付けに使う
  let samePointCount = 0;
  let rankedPoint = 10000000;//
  return (
    <>
      <div className="content">{/* マスタイトル */}
        ゲーム終了!
      </div>
      <ResultTable>
        <table>
          {rankSort(props.playerList).map((player, index) => {
            if (player.point == rankedPoint) samePointCount++;//前の人とポイントが同じ場合，同順位となるようカウントに+1
            else samePointCount = 0;//前の人とポイントが違う場合，カウントをリセット
            rankedPoint = player.point;
            return (
              <tr>
                <th>{index + 1 - samePointCount}位</th>
                <td>{player.name}</td>
                <td>{player.point}ポイント</td>
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

      <button className="close" onClick={() => { window.location.href = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku/" }}>メニューに戻る</button>{/*//propsに渡されたonCloseメソッドを実行.モーダルを閉じてイベントをリクエストする．*/}
    </>
  );
}

export default FinishModal

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