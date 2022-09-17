import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import css from "styled-jsx/css";


const styleOverlay = {
    position: "fixed",
    top: "0",
    bottom: "0",
    right: "0",
    left: "0",
    background: "rgba(0, 0, 0, 0.5)"
}
const styleWrapper = {
    "position": "absolute",
    "left": "50%",
    "right": "50%",
    "width": "200px",
    "height": "200px",
    "borderRadius": "8px",
    "padding": "10px",
    "background": "#fff",
    "zIndex": "10",
    "transform": "translateX(-50%)"
};



export default class MasuEvent extends React.Component {
    constructor(props){
        super(props);

    }


    render() {
        {console.log(this.props.isVisible)}
        <AnimatePresence>
            {this.props.isVisible && (
                <motion.div
                    key="modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div style={styleOverlay}className={`overlay`} onClick={this.props.onClose} />
                    <div style={styleWrapper}className={`wrapper`}>aaa</div>
                </motion.div>
            )}
        </AnimatePresence >
    }
}
