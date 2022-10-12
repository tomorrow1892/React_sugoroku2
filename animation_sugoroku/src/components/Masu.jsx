
import { Grid, Button, Card, ListItem, CardHeader, Avatar, Box } from "@mui/material";
import React from "react";
import styled from "styled-components";




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
            case 15: return "+100ポイント"
            case 16: return "+200ポイント"
            case 17: return "+300ポイント"
            case 18: return "+400ポイント"
            case 19: return "+500ポイント"
            case 20: return "-100ポイント"
            case 21: return "-200ポイント"
            case 22: return "-300ポイント"
            case 23: return "-400ポイント"
            case 24: return "-500ポイント"
        }
    }

    render() {
        return (
            <>
            <MasuStyle>
            <Card className="masu" onClick={()=>{
            this.props.setModalContent(this.props.masu);
            this.props.setModalClosedMethod();
            this.props.switchIsVisible(true);}}
                sx={{boxShadow:2, bgcolor: "#FFFFFF", border: 2, borderColor: "#0000DD", borderRadius: 2, 
                width: 100, height: 100, position: "absolute", top: this.props.top, left: this.props.left }} >
                    <Card><div style={{ "fontSize": "100%" }}>{this.props.masu.title}</div></Card>
                    <Card sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", top: 8, position: "relative", borderRadius: 2, bgcolor: "#FF8888" }}>
                        {this.getEventfromEventId(this.props.masu.squareEventId)}
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