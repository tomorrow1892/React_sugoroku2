import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Button } from '@mui/material';
import Dice from './Dice';

const style = {
    border: '1px solid gray',
    backgroundColor: 'white',
};
let container = null;

export default class Canvas extends Component {
    constructor() {
        super();
        this.state = { drawing: false };

    }

    getContext() {
        return this.refs.canvas.getContext('2d');
    }

    startDrawing(x, y) {
        this.setState({ drawing: true });
        const ctx = this.getContext();
        ctx.moveTo(x, y);
    }

    draw(x, y) {
        if (!this.state.drawing) {
            return;
        }
        const ctx = this.getContext();
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    endDrawing() {
        this.setState({ drawing: false });
    }

    
    drawDice() {
        if(!container){
            console.log("qqqq");
            container = document.querySelector('canvas');
        const root = createRoot(container);
        root.render(<Dice></Dice>);
        }


    }

    render() {
        return (
            <>
                <canvas
                    className="zdog-canvas"
                    ref="canvas"
                    width="500px"
                    height="500px"
                onMouseDown={e => this.drawDice()}
                 
                    // onMouseDown={e => this.startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                    onMouseUp={() => this.endDrawing()}
                    onMouseLeave={() => this.endDrawing()}
                    onMouseMove={e => this.draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY)}
                    style={style}
                />
                {/* <Button onClick={(e)=>this.drawDice()}>さいころ表示</Button> */}
            </>

        );
    }
}
