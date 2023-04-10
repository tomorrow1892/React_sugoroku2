
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSearchParams} from 'react-router-dom';
import background from "./components/img/mizutamahaikei-illust2.png";

function App() {
  const [searchParams] = useSearchParams();
  const sugorokuId = searchParams.get("sid");
  return (
    <div >
      <Game sid={sugorokuId}></Game> {/*Gameコンポーネントにsidを渡す*/}    
    </div>
  )

}

export default App;
