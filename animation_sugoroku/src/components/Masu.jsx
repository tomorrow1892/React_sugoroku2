
import { Grid, Button, Card, ListItem, CardHeader, Avatar,Box } from "@mui/material";
import React from "react";




export default class Masu extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <>
            <Card sx={{bgcolor:"#FFFFFF",border: 3,borderRadius:2,width: 100,height:100,position:"absolute",top:this.props.top,left:this.props.left}} >
                <Card><div style={{"fontSize":"100%"}}>{this.props.masu.title}</div></Card>
                <Card sx={{borderRadius:2, bgcolor:"#FF0033"}}>2マス進む</Card>
            </Card>
            </>
        )
    }
}