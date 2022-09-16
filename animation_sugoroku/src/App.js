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
import { Route,Routes,useParams } from 'react-router-dom';

function App() {
  const {sid} = useParams();
  console.log("sugorokuId:"+sid);
  return (
    <>
      {/* <RequestTest></RequestTest> */}
  
      <Game sid={sid}></Game> {/*Gameコンポーネントにsidを渡す*/}
    

    </>

  )

}

export default App;
