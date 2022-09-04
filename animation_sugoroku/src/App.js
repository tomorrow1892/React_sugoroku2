import logo from './logo.svg';
import './App.css';
import Icon from './components/Icon';
import Dice from './components/Dice';
import ZdogTest from './components/ZdogTest';

function App() {

  return (
    <div>
      <Dice></Dice>
      <Icon></Icon>
    </div>
  )
 /* return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  ); */
}

export default App;
