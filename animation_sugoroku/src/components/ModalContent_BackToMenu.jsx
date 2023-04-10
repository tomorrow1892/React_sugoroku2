import React from "react";
import styled from "styled-components";
import { Button, Card } from "@mui/material";
import { Modal, Dialog, Box, IconButton } from "@mui/material";
import bgm from './sound/dizzy.mp3';
import audio_on_img from './img/audio_on.png';
import audio_off_img from './img/audio_off.png';
import { pc, sp, tab } from '../media';

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const GoalModal = (props) => {
    const [audioconfig, setAudioConfig] = React.useState(true);
    return (
        <ModalStyle>
            <Card className="modal">
                <div className="modal_contents">

                    <div>{/* マスタイトル */}
                        ゲームを中止して、はじめの画面に戻りますか？
                      
                    </div>
                    <div className="options">
                        <button className="btn yellow" onClick={() => { window.location.href = "https://es4.eedept.kobe-u.ac.jp/miraisugoroku/" }}>ゲームをやめる</button>
                        <button className="btn" onClick={props.handleClose}>ゲームを再開する</button>
                    </div>

                </div>
            </Card>
        </ModalStyle>

    );
}


export default GoalModal

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
       ${pc` font-size: 30px; `}
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
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        padding: 1.6rem 3rem;
        border: 3px solid black;
        border-radius: 5px;
        background: white;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
        ${pc` width :800px;height: 90vh `}
        ${tab` width :800px; height: 90vh`}
        ${sp` width :100wh; height: 100vh`}
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
        font-size: 18px;
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

    .yellow{
        background-color:yellow;
    }
`;