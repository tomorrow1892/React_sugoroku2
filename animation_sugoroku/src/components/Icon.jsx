
import React from 'react';
import anime from '../lib/anime.js';
import {Avatar} from '@mui/material';


export default class Icon extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            positionX:this.props.x,
            positionY:this.props.y
        }
    }

    async moveComa(count) {
        // let myPromise = Promise.resolve();
        let index = 0;
        console.log("count:" + count);
        while (index < count) {
            // console.log("index:"+index);
            // myPromise = myPromise.then(moveComa).then(()=>{return new Promise((resolve,reject)=>{index++})});
            await this.toNext();
            index++;
            console.log(index);
        }
    }

    toNext() {
        return new Promise((resolve, reject) => {
            anime({
                targets: this.coma,
                translateX: this.state.positionX + 200,
                duration: 500,
                easing: 'easeInOutQuad',
                complete:()=>{
                    this.state.positionX += 200;
            console.log("yes");
            resolve(1);
                }
            })
            
        });
    }

    render() {
        return (
            <>
          
          <Avatar ref={(e) => { this.coma = e; }} sx={{boxShadow:3, border: 2,borderColor:"#9933DD", width: 50, height: 50, bgcolor: 'background.paper' ,position: "absolute", top:this.state.positionY, left: this.state.positionX,zIndex:100} }>
            <img src={this.props.iconImg} alt="コマ"  style={{ width: 40}} />
            </Avatar>
                <button onClick={(e) => {this.moveComa(3)}}>移動</button>
            </>
        )
    }
}