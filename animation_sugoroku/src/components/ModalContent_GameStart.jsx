import React from "react";
import styled from "styled-components";
import { Button, Card } from "@mui/material";
import { Modal, Dialog, Box, IconButton } from "@mui/material";
import bgm from './sound/bgm.mp3';
import audio_on_img from './img/audio_on.png';
import audio_off_img from './img/audio_off.png';
import { pc, sp, tab } from '../media';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {
    const [audioconfig, setAudioConfig] = React.useState(true);
    return (
        <ModalStyle>
            <Card className="contents">
                <div className="modal_contents">
                    <p className="message">ゲームスタート!</p>
                    <div>音楽を流す？</div>
                    <AudioConfig>
                        <div className="audio_config_area" id="makeImg">
                            <input type="radio" id="audio_on" checked={audioconfig} onChange={() => setAudioConfig(true)} />
                            <label htmlFor="audio_on">
                                <div><img src={audio_on_img} width="50%"></img></div>
                                ON
                            </label>
                            <input type="radio" id="audio_off" checked={!audioconfig} onChange={() => setAudioConfig(false)} />
                            <label htmlFor="audio_off">
                                <div><img src={audio_off_img} width="50%"></img></div>
                                OFF
                            </label>
                        </div>
                    </AudioConfig>
                    <div style={{color:"red"}}>スマートフォンやタブレットは横向きで遊んでね</div>
                    <div>
                        <button className="btn" onClick={() => {
                            if (audioconfig) {
                                const bgm_music = new Audio(bgm);
                                bgm_music.play();
                                bgm_music.loop = true;
                            }

                            props.handleClose();
                        }}>ゲームを始める
                        </button>

                    </div>


                </div>

            </Card>
        </ModalStyle>

    );
}


export default GoalModal

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
        display: flex;
        justify-content: center;
        align-items: center;
        ${pc` width :80vw; height:80vh `}
        ${tab` width :80vw; height:80vh`}
        ${sp` width :80vw; height: 80vh`}
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
        
        
    }
    .btn {
        color:inherit;
        font-family:inherit;
        font-size: 20px;
        background: cyan;
        ${pc` width:200px;`}
        ${tab` width:200px;`}
        ${sp` width:200px;`}
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

const AudioConfig = styled.div`
/* === ボタンを表示するエリア ============================== */
    .audio_config_area {
    position       : relative;            /* 親要素が基点       */
    margin         : auto;                /* 中央寄せ           */
    width          : 120px;               /* ボタンの横幅       */
    height         : 80px;                /* ボタンの高さ       */
    }
    
    /* === ラジオボタン ======================================== */
    .audio_config_area input[type="radio"] {
    display        : none;            /* チェックボックス非表示 */
    }
    
    /* === ラジオボタンのラベル（標準） ======================== */
    .audio_config_area label {
    display        : block;               /* ボックス要素に変更 */
    position       : absolute;            /* 親要素からの相対位置*/
    
    font-size      : 15pt;                /* 文字サイズ         */
    font-weight    : bold;                /* 太字               */
    border: 3px solid black;
        border-radius: 5px;
    }
    
    /* === ON側のラジオボタンのラベル（標準） ================== */
    .audio_config_area #audio_on + label {
    right          : 50%;                 /* 右端を中央に変更   */
    border-radius  : 6px 0 0 6px;         /* 角丸(左側の上下)   */
    background     : #eee;                /* 背景               */
    color          : #666;                /* 文字色             */
    border-right   : none;                /* 枠線の右側を消す   */
    }
    
    /* === ON側のラジオボタンのラベル（ONのとき） ============== */
    .audio_config_area #audio_on:checked +label {
                                            /* 背景グラデーション */
    background     : #92D050;
    color          : #fff;                /* 文字色             */
    text-shadow    : 1px 1px 1px #333;    /* 文字に影を付ける   */
    }
    
    /* === OFF側のラジオボタンのラベル（標準） ================ */
    .audio_config_area #audio_off + label {
    left           : 50%;                 /* 左端を中央に変更   */
    border-radius  : 0 6px 6px 0;         /* 角丸(右側の上下)   */
    background     : #eee;                /* 背景               */
    color          : #666;                /* 文字色             */
    border-left    : none;                /* 枠線の左側を消す   */
    }
    
    /* === OFF側のラジオボタンのラベル（OFFのとき） ============= */
    .audio_config_area #audio_off:checked +label {
                                            
    background-color : #aaa;              /* 背景色 */
    color          : #fff;                /* 文字色             */
    text-shadow    : 1px 1px 1px #333;    /* 文字に影を付ける   */
    }
`;
