
import { Grid, Button, Card, ListItem, CardHeader, Avatar,Box } from "@mui/material";
import React from "react";



//スタートマスのコンポーネント
export default class Masu extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <>
            <Card sx={{bgcolor:"#FFFFFF",border: 2,borderColor:"#0000DD" ,borderRadius:2,width: 120,height:120,position:"absolute",top:this.props.top,left:this.props.left}} >
                <Card><div style={{"fontSize":"100%"}}>スタート!</div></Card>
            </Card>
            </>
        )
    }
}