import { render } from '@testing-library/react';
import React from 'react';
//import anime from '../lib/anime';
import Zdog from 'zdog';

export default class ZdogTest extends React.Component {

    constructor(props) {
        super(props);
        this.illo = new Zdog.Illustration ({
            element: '.zdog-canvas'
        });
        this.ell = new Zdog.Ellipse({
            addTo: this.illo,
            diameter: 80,
            stroke: 20,
            color: "#E62"
        })


    }

    rend() {
        this.illo.updateRenderGraph();
    }

    render() {
        return (
            <>
            {/* <canvas className="zdog-canvas"></canvas> */}
            <button onClick={(e)=>{ this.rend(); }}>描画</button>
            </>
        )
    }
}