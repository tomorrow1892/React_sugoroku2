
import { Grid, Button, Card, ListItem, CardHeader, Avatar, breadcrumbsClasses } from "@mui/material";
import React from "react";
import breakImg from "./img/break.png";
import goalImg from "./img/goal.png";
import Player from "./Player";

//プレイヤー達のステータスを表示するコンポーネント
export default class PlayerList extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        let border = 'primary.main';
        console.log(this.props.nowPlayer);
        return (
            <>
            {this.props.playerList.map(player => {
                if (player.order == this.props.nowPlayer.order) {
                    border = 'error.main';
                } else {
                    border = 'primary.main';
                }
                return (
                    <div key={player.order}>
                        <Player player={player}/>
                    </div>
            )})}
            </>
        )
    }
}