
import React from 'react';
import anime from '../lib/anime.js';

import cat from './img/1.png';


export default class Icon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            positionX: 30
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
                <img src={cat} alt="コマ" ref={(e) => { this.coma = e; }} style={{ position: "absolute", top: 100, left: this.state.positionX, width: 50, height: 50}} />
                <button onClick={(e) => {this.moveComa(3)}}>移動</button>
            </>
        )
    }
}