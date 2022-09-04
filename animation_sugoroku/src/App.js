import logo from './logo.svg';
//import './App.css';
import Icon from './components/Icon';
import Dice from './components/Dice';
import ZdogTest from './components/ZdogTest';
import { Grid, Button } from "@mui/material";
import { blue } from '@mui/material/colors';
import { Link as Scroll } from 'react-scroll';
function App() {

  return (
    <>
      {/* <div>
        <Dice></Dice>
        <Icon></Icon>
      </div> */}
      <Grid container>
        <Grid item xs={2}>
          <div style={{"backgroundColor":"cyan","height":"100vh"}}>
          <Button variant="outlined">Material-UI ボタン</Button>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div style={{"positon":"absolute","top":"1000px"}}>
            ああああ
          </div>
        </Grid>
      </Grid>

    </>

  )

}

export default App;
