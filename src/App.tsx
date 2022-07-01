import WorldComponent from './components/World/WorldComponent';
import { World } from './models/World/World';

function App() {

  return (
    <>
      <WorldComponent world={new World(20)} size={480}/>
      {/* <WorldComponent world={new World(30)} size={500}/> */}
    </>
  );
}

export default App;
