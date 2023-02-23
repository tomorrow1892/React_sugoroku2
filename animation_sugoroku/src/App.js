
import Game from './components/Game';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSearchParams} from 'react-router-dom';

function App() {
  const [searchParams] = useSearchParams();
  const sugorokuId = searchParams.get("sid");
  console.log("sugorokuId:"+sugorokuId);
  return (
    <>
      <Game sid={sugorokuId}></Game> {/*Gameコンポーネントにsidを渡す*/}    
    </>
  )

}

export default App;
