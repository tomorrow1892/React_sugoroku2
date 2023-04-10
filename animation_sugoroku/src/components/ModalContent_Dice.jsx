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
        <ModalStyle_Dice>
            <Card className="contents">
                <Grid container direction="row" spacing={1}
                    justifyContent="center"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={12} >
                        <p className="message">{props.turnPlayer.name}さんのターン!</p>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <Dice requestDiceRoll={props.requestDiceRoll}
                            handleClose={props.switchIsModalOpen}
                            setIsBoardButtonVisible={setIsBoardButtonVisible}
                        />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                        <div style={{ "display": "flex", "flexFlow": "column" }}>

                            {isBoardButtonVisible && <> <button className="btn square" onClick={() => props.handleClose()}>
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
                                !isBoardButtonVisible && <> <button disabled className="btn square" >
                                    <Typography fontFamily="'Zen Maru Gothic', sans-serif">全体を見る</Typography>
                                </button>
                                    <button disabled className="btn yellow" visibility={isBoardButtonVisible ? "visible" : "hidden"}
                                    ><Typography fontFamily="'Zen Maru Gothic', sans-serif">ゲームを途中でやめる</Typography> </button></>
                            }
                        </div>
                    </Grid>
                    {(props.playerList != null) &&
                        props.playerList.map((player,index) => {
                            return(
                                <Grid item xs={12} sm={6} md={4} key={index}> 
                                <Player player={player}></Player>
                            </Grid>
                            )
                            
                        })
                    }

                </Grid>
            </Card>
        </ModalStyle_Dice >

    );
}


export default DiceModal

const ModalStyle_Dice = styled.div`

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
