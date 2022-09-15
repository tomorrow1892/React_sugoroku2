import logo from './logo.svg';
//import './App.css';
import Icon from './components/Icon';
import Dice from './components/Dice';
import ZdogTest from './components/ZdogTest';
import { Grid, Button } from "@mui/material";
import { blue } from '@mui/material/colors';
import { Link as Scroll } from 'react-scroll';
import Dice2 from './components/Dice2';
import Game from './components/Game';
import RequestTest from './components/RequestTest';
import Canvas from './components/Canvas'
function App() {

  return (
    <>
    {/* <Canvas></Canvas> */}
    {/* <ZdogTest></ZdogTest> */}
      <RequestTest></RequestTest>
      <Game></Game>
      
    </>

  )

}

export default App;
