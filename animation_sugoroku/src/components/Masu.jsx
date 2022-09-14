
import { Grid, Button, Card, ListItem, CardHeader, Avatar,Box } from "@mui/material";
import React from "react";




export default class Masu extends React.Component {

    constructor(props) {
        super(props);

    }
    render() {
        return (
            <>
            <Box sx={{bgcolor:"#FFFFFF",border: 3,borderRadius:2,width: 100,height:100,position:"relative",top:this.props.top,left:this.props.left}} >
                <Box ><div style={{"font-size":"100%"}}>いのししと触れ合う</div></Box>
                <Box sx={{borderRadius:2, bgcolor:"#FF0033"}}>2マス進む</Box>
            </Box>
            </>
        )
    }
}