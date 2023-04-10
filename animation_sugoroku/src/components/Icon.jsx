
import React from 'react';
import { Avatar } from '@mui/material';
import dog from "./img/dog.png";
import cat from "./img/cat.png";
import hiyoko from "./img/hiyoko.png";
import hamster from "./img/hamster.png";
import zo from "./img/zo.png";
import penguin from "./img/penguin.png";
//プレイヤーアイコンのコンポーネント

export const Icon = (props) => {

    let iconSrc;
    switch (props.icon) {
        case "dog": iconSrc = dog; break;
        case "cat": iconSrc = cat; break;
        case "hiyoko": iconSrc = hiyoko; break;
        case "hamster": iconSrc = hamster; break;
        case "zo": iconSrc = zo; break;
        case "penguin": iconSrc = penguin; break;
        default: iconSrc = cat; break;
    }

    return (
        <>
            <Avatar
                sx={{
                    boxShadow: 3, border: 2, borderColor: "#9933DD", width: 50, height: 50,
                    bgcolor: 'background.paper', position: "absolute", top: props.y, left: props.x, zIndex: 10
                }}>
                <img src={iconSrc} alt="コマ" style={{ width: 40 }} />
            </Avatar>
        </>
    )
}
export default Icon;