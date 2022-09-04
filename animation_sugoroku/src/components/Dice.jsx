
import React from "react";
import { Illustration, Group, Anchor, Rect, TAU, Ellipse } from "zdog";
import anime from "../lib/anime";

// const { Illustration, Group, Anchor, Rect, TAU, Ellipse } = Zdog;




export default class Dice extends React.Component {

    constructor(props) {
        super(props);
        const element = document.querySelector('canvas');
        this.illustration = new Illustration({
            element,
        });

        // anchor point used for the rotation
        this.dice = new Anchor({
            addTo: this.illustration,
        });

        // group describing the faces through rounded rectangles
        this.faces = new Group({
            addTo: this.dice,
        });
        // due to the considerable stroke, it is possible to fake the dice using four faces only
        this.face = new Rect({
            addTo: this.faces,
            stroke: 50,
            width: 50,
            height: 50,
            color: 'hsl(5, 80%, 55%)',
            translate: {
                z: -25,
            },
        });

        // rotate the faces around the center
        this.face.copy({
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: 25,
            },
        });

        this.face.copy({
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: -25,
            },
        });

        this.face.copy({
            translate: {
                z: 25,
            },
        });

        // include the dots repeating as many shapes/groups as possible
        // ! when copying an element be sure to reset the rotation/translation of the copied shape
        this.one = new Ellipse({
            addTo: this.dice,
            diameter: 15,
            stroke: false,
            fill: true,
            color: 'hsl(0, 0%, 100%)',
            translate: {
                z: 50,
            },
        });

        this.two = new Group({
            addTo: this.dice,
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: 50,
            },
        });

        this.one.copy({
            addTo: this.two,
            translate: {
                y: 20,
            },
        });

        this.one.copy({
            addTo: this.two,
            translate: {
                y: -20,
            },
        });

        this.three = new Group({
            addTo: this.dice,
            rotate: {
                y: TAU / 4,
            },
            translate: {
                x: 50,
            },
        });

        this.one.copy({
            addTo: this.three,
            translate: {
                z: 0,
            },
        });

        this.one.copy({
            addTo: this.three,
            translate: {
                x: 20,
                y: -20,
                z: 0,
            },
        });

        this.one.copy({
            addTo: this.three,
            translate: {
                x: -20,
                y: 20,
                z: 0,
            },
        });

        this.four = new Group({
            addTo: this.dice,
            rotate: {
                y: TAU / 4,
            },
            translate: {
                x: -50,
            },
        });

        this.two.copyGraph({
            addTo: this.four,
            rotate: {
                x: 0,
            },
            translate: {
                x: 20,
                y: 0,
            },
        });

        this.two.copyGraph({
            addTo: this.four,
            rotate: {
                x: 0,
            },
            translate: {
                x: -20,
                y: 0,
            },
        });

        this.five = new Group({
            addTo: this.dice,
            rotate: {
                x: TAU / 4,
            },
            translate: {
                y: -50,
            },
        });

        this.four.copyGraph({
            addTo: this.five,
            rotate: {
                y: 0,
            },
            translate: {
                x: 0,
            },
        });

        this.one.copy({
            addTo: this.five,
            translate: {
                z: 0,
            },
        });

        this.six = new Group({
            addTo: this.dice,
            translate: {
                z: -50,
            },
        });

        this.two.copyGraph({
            addTo: this.six,
            rotate: {
                x: 0,
                z: TAU / 4,
            },
            translate: {
                x: 0,
                y: 0,
            },
        });

        this.four.copyGraph({
            addTo: this.six,
            rotate: {
                y: 0,
            },
            translate: {
                x: 0,
            },
        });




        // object animated through anime.js
        this.rotation = {
            x: 0,
            y: 0,
            z: 0,
        };

        // array describing the rotation necessary to highlight the difference faces
        this.rotate = [
            {},
            {
                x: TAU / 4,
            },
            {
                y: TAU / 4,
            },
            {
                y: (TAU * 3) / 4,
            },
            {
                x: (TAU * 3) / 4,
            },
            {
                x: TAU / 2,
            },
        ];

        // show the static illustration
        this.illustration.updateRenderGraph();
    }


    // utility function returning a positive integer up to a maximum value
    randomInt(max = 10) {return Math.floor(Math.random() * max); };
    // utility function returning a random item from an array
    // eslint-disable-next-line no-unused-expressions
    randomItem(arr) { return arr[this.randomInt(arr.length)]; };



    rollDice({ x = TAU, y = TAU }) {
        // animate the object toward the input values
        anime({
            targets: this.rotation,
            // ! increment the input rotation with a random number of additional rotations
            x: x + TAU * this.randomInt(),
            y: y + TAU * this.randomInt(),
            z: TAU * this.randomInt(),
            duration: 1500,
            // while the object is being updated update the rotation of the dice
            // ! remember to update the graphic with the updateRenderGraph() method
            update() {
                this.dice.rotate.x = rotation.x;
                this.dice.rotate.y = rotation.y;
                this.dice.rotate.z = rotation.z;
                this.illustration.updateRenderGraph();
            },
        });
    }


    render() {
        return (
            <>
                <canvas width="400" height="400"></canvas>

                <button onClick={(e) => {console.log(this.dice);this.rollDice(this.randomItem(this.rotate)); }}>Roll</button>
            </>
        );
    }
}