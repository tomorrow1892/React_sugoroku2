
import { Grid, Button, Card, ListItem, CardHeader, Avatar, Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import ModalContent_Masu from "./ModalContent_Masu"



export default class Masu extends React.Component {

    constructor(props) {
        super(props);

    }

    getEventfromEventId(eventId) {
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
            case 15: return "+100点"
            case 16: return "+200点"
            case 17: return "+300点"
            case 18: return "+400点"
            case 19: return "+500点"
            case 20: return "-100点"
            case 21: return "-200点"
            case 22: return "-300点"
            case 23: return "-400点"
            case 24: return "-500点"
        }
    }

    render() {
        // マスの色を指定
        let masuColor = 'black';
        if (this.props.masuInfo.squareEffect > 0) {
            masuColor = '#ADF5FF';
        } else if (this.props.masuInfo.squareEffect < 0) {
            masuColor = '#ED9798';
        }
        return (
            <>
            <MasuStyle>
            <Card className="masu" onClick={()=>{
            this.props.setModalContent(<ModalContent_Masu masuInfo={this.props.masuInfo} handleClose={()=>this.props.switchIsModalOpen(false)}/>)
            this.props.switchIsModalOpen(true);}}
                sx={{boxShadow:2, bgcolor: "#FFFFFF", border: 2, borderColor: "#0000DD", borderRadius: 2,cursor: "hand", cursor:"pointer",
                width: 120, height: 120, position: "absolute", top: this.props.top, left: this.props.left }} >
                    
                        <div style={{ "fontSize": "90%", "display":"table", "height": "60px", "textAlign":"center", "width":"100%", "marginTop":"10px" }}>
                            <div style={{ "display":"table-cell", "verticalAlign": "middle", "padding":"0", "margin":"0", "fontFamily": "'Zen Maru Gothic', sans-serif"}}>{this.props.masuInfo.title}</div>
                        </div>
                    
                    <Card sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", top: 8, position: "relative", borderRadius: 2, bgcolor: masuColor }}>
                        {this.getEventfromEventId(this.props.masuInfo.squareEventId)}
                    </Card>
                </Card>
            </MasuStyle>
                
            </>
        )
    }
}
const MasuStyle = styled.div`
{
    .masu:active{
        box-shadow:none;
        transform: translateY(3px);
    }
}
`;