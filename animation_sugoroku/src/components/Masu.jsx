
import { Grid, Button, Card, ListItem, CardHeader, Avatar, Box } from "@mui/material";
import React from "react";




export default class Masu extends React.Component {

    constructor(props) {
        super(props);

    }

    getEventfromEventId(eventId) {
        switch (eventId) {
            case 0: return ""; break;
            case 1: return "1マス進む"; break;
            case 2: return "2マス進む"; break;
            case 3: return "3マス進む"; break;
            case 4: return "4マス進む"; break;
            case 5: return "5マス進む"; break;
            case 6: return "6マス進む"; break;
            case 7: return "1マス戻る"; break;
            case 8: return "2マス戻る"; break;
            case 9: return "3マス戻る"; break;
            case 10: return "4マス戻る"; break;
            case 11: return "5マス戻る"; break;
            case 12: return "6マス戻る"; break;
            case 13: return "1回休み"; break;
        }
    }

    render() {
        return (
            <>
                <Card sx={{ bgcolor: "#FFFFFF", border: 2, borderColor: "#0000DD", borderRadius: 2, width: 100, height: 100, position: "absolute", top: this.props.top, left: this.props.left }} >
                    <Card><div style={{ "fontSize": "100%" }}>{this.props.masu.title}</div></Card>
                    <Card sx={{ width: "80%", marginLeft: "auto", marginRight: "auto", top: 8, position: "relative", borderRadius: 2, bgcolor: "#FF8888" }}>
                        {this.getEventfromEventId(this.props.masu.squareEventId)}
                    </Card>
                </Card>
            </>
        )
    }
}