import React from "react";
import styled from "styled-components";
import { Button, Card, Typography } from "@mui/material";
import { Modal, Dialog, Box, IconButton } from "@mui/material";
import Dice from "./Dice";
import { pc, sp, tab } from '../media';
import Player from "./Player";

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const DiceModal = (props) => {
    const [isBoardButtonVisible, setIsBoardButtonVisible] = React.useState(true);
    
    return (
        <ModalStyle>
            <Card className="modal">
                <div className="modal_contents">
                    <p className="message">{props.turnPlayer.name}さんの番です!</p>
                    <div className="options">
                        <Dice requestDiceRoll={props.requestDiceRoll} 
                        handleClose={props.switchIsModalOpen}
                        setIsBoardButtonVisible={setIsBoardButtonVisible}
                        />
                        <div>
                        <Player player={props.turnPlayer}></Player>
                        {isBoardButtonVisible && <button className="btn" onClick={() => props.handleClose()}>
                           <Typography fontFamily="'Zen Maru Gothic', sans-serif">ばんめんを見る</Typography> 
                            </button>}
                        </div>
                        
                    </div>
                </div>

            </Card>
        </ModalStyle>

    );
}


export default DiceModal

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
       ${sp` font-size: 20px; `}
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
        ${pc` width :1000px;height: 90vh `}
        ${tab` width :800px; height: 90vh`}
        ${sp` width :500px; height: 60vh`}
        
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        
        border: 3px solid black;
        border-radius: 10px;
        background: white;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .message {
        ${pc` font-size: 3.0rem; `}
        ${sp` font-size: 2.1rem; `}
        margin-bottom: 1.6rem;
        margin-top: 0;
    }
    .btn {
        color:inherit;
        font-family:inherit;
        font-size: 20px;
        background: cyan;
        width:100px;
        height:100px;
        
        border: 3px solid black;
        box-shadow: 0 0 0 black;
        transition: all 0.2s;
    }
    
    .btn:last-child {
        margin: 0;
    }
    
    .btn:hover {
        box-shadow: 0.2rem 0.2rem 0 black;
        transform: translate(-0.2rem, -0.2rem);
    }
    
    .btn:active {
        box-shadow: 0 0 0 black;
        transform: translate(0, 0);
    }
    
    .options {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    
`;
