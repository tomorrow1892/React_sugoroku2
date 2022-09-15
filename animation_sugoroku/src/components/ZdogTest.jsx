import { render } from '@testing-library/react';
import React from 'react';
//import anime from '../lib/anime';
import Zdog from 'zdog';
import {Illustration,Shape} from 'react-zdog';

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
            <Illustration zoom={8}>
            <Shape stroke={20} color="lightblue" rotate={{ x: Math.PI }} />
          </Illustration>
        )
    }
}