import React from "react";
import styled from "styled-components";
import { Button, Card, Typography, Grid } from "@mui/material";
import { Modal, Dialog, Box, IconButton } from "@mui/material";
import Dice from "./Dice";
import { pc, sp, tab } from '../media';
import ModalContent_BackToMenu from './ModalContent_BackToMenu';
import ModalContent_Dice from './ModalContent_Dice';
import Player from "./Player";

//マスに止まったときにでるイベントモーダル．関数コンポーネント.
export const DiceModal = (props) => {
    const [isBoardButtonVisible, setIsBoardButtonVisible] = React.useState(true);

    return (
        <ModalStyle>
            <Card className="modal">
                <div className="modal_contents">
                    <p className="message">{props.turnPlayer.name}さんのターン!</p>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={8}>
                            <Dice requestDiceRoll={props.requestDiceRoll}
                                handleClose={props.switchIsModalOpen}
                                setIsBoardButtonVisible={setIsBoardButtonVisible}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <div>
                                {/* <Player player={props.turnPlayer}></Player> */}
                                {isBoardButtonVisible &&<> <button className="btn square" onClick={() => props.handleClose()}>
                                    <Typography fontFamily="'Zen Maru Gothic', sans-serif">全体を見る</Typography>
                                </button>
                                <button className="btn yellow" 
                                    onClick={() => {
                                        props.setModalContent(<ModalContent_BackToMenu
                                            handleClose={() => {//イベントモーダルが閉じたときの処理をセット
                                                props.setModalContent(<ModalContent_Dice
                                                    turnPlayer={props.turnPlayer}
                                                    requestDiceRoll={props.requestDiceRoll}
                                                    setModalContent={props.setModalContent}
                                                    switchIsModalOpen={props.switchIsModalOpen}
                                                    handleClose={() => {//モーダルが閉じたときの処理をセット
                                                        props.switchIsModalOpen(false);
                                                        props.switchIsDiceButtonVisible(true);
                                                    }} />);
                                            }} />)
                                        props.switchIsModalOpen(true);
                                    }}><Typography fontFamily="'Zen Maru Gothic', sans-serif">ゲームを途中でやめる</Typography> </button></>}
                                    {
                                        !isBoardButtonVisible &&<> <button disabled className="btn square" >
                                        <Typography fontFamily="'Zen Maru Gothic', sans-serif">全体を見る</Typography>
                                    </button>
                                    <button disabled className="btn yellow" visibility={isBoardButtonVisible ? "visible" : "hidden"}
                                        ><Typography fontFamily="'Zen Maru Gothic', sans-serif">ゲームを途中でやめる</Typography> </button></>
                                    }
                            
                            </div>
                        </Grid>
                    </Grid>




                </div>




            </Card>
        </ModalStyle >

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
        ${pc` width :800px;height: 90vh `}
        ${tab` width :800px; height: 90vh`}
        ${sp` width :100wh; height: 100vh`}
        
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        
        border: 3px solid black;
        border-radius: 10px;
        background: white;
        box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.2);
    }
    .message {
       font-size: 3.0rem;
        margin-bottom: 1.6rem;
        margin-top: 0;
    }
    .btn {
        color:inherit;
        font-family:inherit;
        font-size: 20px;
        background: cyan;
        width:200px;
        height:60px;
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
