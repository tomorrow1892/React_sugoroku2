
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
        this.comaRef = React.createRef();
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

    //指定した値だけコマを移動
    toNext(x,y) {
        return new Promise((resolve, reject) => {
            // console.log(this.state.positionX);
            anime({
                targets: this.coma,
                translateX:  0,
                duration: 500,
                easing: 'easeInOutQuad',
                complete:()=>{
           
                    this.setState(state=>({
                        positionX: state.positionX+x,
                        positionY: state.positionY+y
                    }));
            console.log(this.state.positionX);
            resolve(1);
                }
            })
            
        });
    }

    render() {
        return (
            <>
     
            <Avatar ref={(e) => { this.coma = e; }} 
            sx={{boxShadow:3, border: 2,borderColor:"#9933DD", width: 50, height: 50,
             bgcolor: 'background.paper' ,position: "absolute", top:this.props.y, left: this.props.x,zIndex:100} }>
            <img src={this.props.iconImg} alt="コマ"  style={{ width: 40}} />
            </Avatar>
                
            </>
        )
    }
}